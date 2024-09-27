import {request, gql} from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4001/graphql";

// --- Owner ---------------------------------------------------------------------------------------
export async function getReviews() {
    // Simply query with no parameters.
    const query = gql`
    {
    all_reviews {
        ID
        USER_ID
        REVIEW_DESC
        NO_STARS
        }
    }
  `;

    const data = await request(GRAPH_QL_URL, query);
    return data.all_reviews;
}

export async function deleteReview(id) {
    const query = gql`
    mutation {
      delete_review(REVIEW_ID: ${id}) {
        USER_ID
        MOVIE_ID
        REVIEW_DESC
        NO_STARS
        DATETIME
      }
    }
  `;

    const data = await request(GRAPH_QL_URL, query);
    return data.delete_review;
}

export async function getMovieAnalytics() {
  const query = gql`
  {
  all_movies {
      ID
      TITLE
      VIEW_COUNT
      NUM_REVIEW
      AVG_RATING
      }
  }
`;

  const data = await request(GRAPH_QL_URL, query);
  return data.all_movies;
}

export async function getMovies() {
    const query = gql`
    {
    all_movies {
        ID
        TITLE
        RUNTIME
        RATING_CLASS
        COMING_SOON
        }
    }
  `;

    const data = await request(GRAPH_QL_URL, query);
    return data.all_movies;
}

export async function editMovie(movie) {
    const query = gql`
    mutation ($ID: Int, $TITLE: String, $RUNTIME: String, $RATING_CLASS: String, $COMING_SOON: Boolean) {
      update_movie(input: {
        ID: $ID,
        TITLE: $TITLE,
        RUNTIME: $RUNTIME,
        RATING_CLASS: $RATING_CLASS,
        COMING_SOON: $COMING_SOON
      }) {
        ID,
        TITLE,
        RUNTIME,
        RATING_CLASS,
        COMING_SOON
      }
    }
  `;

    const variables = movie;

    const data = await request(GRAPH_QL_URL, query, variables);

    return data.update_movie;
}

export async function getUsers() {
    const query = gql`
    {
    all_users {
        ID
        EMAIL
        USERNAME
        JOIN_DATE
        BLOCKED
        }
    }
  `;

    const data = await request(GRAPH_QL_URL, query);
    return data.all_users;
}

export async function blockUser(id) {
    const query = gql`
    mutation($USER_ID: Int) {
      block_user(USER_ID: $USER_ID) {
        EMAIL
        USERNAME
        JOIN_DATE
        BLOCKED
      }
    }
  `;

    const variables = {
        USER_ID: id
    };

    const data = await request(GRAPH_QL_URL, query, variables);
    return data.block_user;
}

export async function createMovie(movie) {
  const query = gql`
    mutation ($TITLE: String, $RUNTIME: String, $RATING_CLASS: String, $COMING_SOON: Boolean) {
      create_movie(input: {
        TITLE: $TITLE,
        RUNTIME: $RUNTIME,
        RATING_CLASS: $RATING_CLASS,
        COMING_SOON: $COMING_SOON
      }) {
        ID
        TITLE
        RUNTIME
        RATING_CLASS
        COMING_SOON
      }
    }
  `;

  const variables = movie;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.create_movie;
}


