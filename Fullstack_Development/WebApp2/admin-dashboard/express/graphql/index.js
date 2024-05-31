const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = {};

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.
    
  # NOTE: The owner and pet are pseudo-joined; whilst they are related, how they are related is an implementation detail
  # that is NOT exposed in the GraphQL schema. This can be seen with the Pet type which has no field linking it to
  # an owner. That said an owner has many pets and this is exposed within the GraphQL schema by association.
  # Behind the scenes the database pet table has an additional field called email which is a FK to owner.
 type REVIEW {
  ID: Int!,
  USER_ID: Int,
  MOVIE_ID: Int,
  REVIEW_DESC: String,
  NO_STARS: Int,
  DATETIME: String,
  USER: USER
}

type USER {
  ID: Int!,
  EMAIL: String,
  USERNAME: String,
  JOIN_DATE: String,
  BLOCKED: Int
}

type Movie {
  ID: Int!
  TITLE: String!
  POSTER: String!
  RUNTIME: String!
  RATING_CLASS: String!
  HOVER_BG: String!
  HOVER_TXT: String!
  SLIDE_SHOW: Boolean!
  AVG_RATING: Float
  COMING_SOON: Boolean
  VIEW_COUNT: Int!
  NUM_REVIEW: Int!
}

input MovieInput {
    ID: Int
  TITLE: String
  RUNTIME: String
  RATING_CLASS: String
  COMING_SOON: Boolean
}

type Query {
  all_reviews: [REVIEW]
  review(review_id: Int): REVIEW
  user(user_id: Int): USER
  movie(id: Int!): Movie
  all_movies: [Movie]
  all_users: [USER]
}

type Mutation {
    delete_review(REVIEW_ID: Int): REVIEW
    update_movie(input: MovieInput!): Movie
    block_user(USER_ID: Int): USER
    create_movie(input: MovieInput!): Movie
}

`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // REVIEW
  all_reviews: async () => {
    const reviews = await db.Review.findAll();
    return reviews;
  },
  review: async (args) => {
    return await db.Review.findByPk(args.review_id);
  },
  user: async (args) => {
    return await db.User.findByPk(args.user_id);
  },
  REVIEW: {
    USER: async (review) => {
      if (review.USER_ID) {
        return await db.User.findByPk(review.USER_ID);
      }
      return null;
    },
  },

  // MOVIES
  all_movies: async () => {
    const movies = await db.Movie.findAll();
    return movies;
  },
  delete_review: async (args) => {
    const review = await db.Review.findByPk(args.REVIEW_ID);

    review.REVIEW_DESC = "[**** This review has been deleted by the admin ***]";
    await review.save();
    return review;
  },

  update_movie: async (args) => {
    const { input } = args;
    const {
      ID,
      TITLE,
      RUNTIME,
      RATING_CLASS,
      COMING_SOON,
    } = input;

    // Find the movie by ID
    const movie = await db.Movie.findByPk(ID);

    if (!movie) {
      throw new Error("Movie not found");
    }

    // Update the movie's fields
    if (TITLE !== undefined) {
      movie.TITLE = TITLE;
    }
    if (RUNTIME !== undefined) {
      movie.RUNTIME = RUNTIME;
    }
    if (RATING_CLASS !== undefined) {
      movie.RATING_CLASS = RATING_CLASS;
    }
    if (COMING_SOON !== undefined) {
      movie.COMING_SOON = COMING_SOON;
    }

    await movie.save();
    return movie;
  },

  // Users
  all_users: async (args) => {
    const users = await db.User.findAll();
    return users;
  },
  block_user: async (args) => {
    const { USER_ID } = args;

    const user = await db.User.findByPk(USER_ID);

    if (!user) {
      throw new Error("User not found");
    }

    // Toggle the blocked status
    user.BLOCKED = user.BLOCKED === 1 ? 0 : 1;

    await user.save();
    return user;
  },
  create_movie: async (args) => {
    const { input } = args;
    const {
      TITLE,
      RUNTIME,
      RATING_CLASS,
      COMING_SOON,
    } = input;
  
    const newMovie = await db.Movie.create({
      TITLE,
      POSTER: "default-image.png",
      RUNTIME,
      RATING_CLASS,
      HOVER_BG: "",
      HOVER_TXT: "",
      SLIDE_SHOW: 0,
      COMING_SOON,
      AVG_RATING: 0,
      NUM_REVIEW: 0,
    });
  
    return newMovie;
  },  
};

module.exports = graphql;
