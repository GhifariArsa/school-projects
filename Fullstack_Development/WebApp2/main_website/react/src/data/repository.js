//for testing
import { paste } from "@testing-library/user-event/dist/paste";
import { nowShowingMovies } from "../Movies/movies";
import axios from "axios";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "current_user";
const REVIEWS_KEY = "reviews";
const TIMESTAMP_KEY = "timestamps";
const API_HOST = "http://localhost:4000";

// DEFAULT USERS
const ADMIN_USER = {
  username: "admin",
  email: "admin@admin.com",
  password: "password",
  joinDate: new Date(0),
};
const GHIFARI = {
  username: "ghifari",
  email: "ghifari@ghifari.com",
  password: "password",
  joinDate: new Date(),
};
const KALANA = {
  username: "KALANA",
  email: "kalana@kalana.com",
  password: "password",
  joinDate: new Date(),
};
const GANG = {
  username: "Gang",
  email: "gang@gang.com",
  password: "password",
  joinDate: new Date(),
};

async function fetchSessionsByMovieId(MovieId) {
  let sessions = [];
  let loading = true;
  let error = "";

  await axios
    .get(API_HOST + "/v1/sessions/" + MovieId)
    .then((response) => {
      sessions = response.data;
    })
    .catch((err) => {
      error = err;
    })
    .finally(() => {
      loading = false;
    });

  return { sessions, loading, error };
}
async function fetchReservationsByUserId(userID) {
    let reservationsRes = [];
    let loadingRes = true;
    let errorRes = "";

    await axios.get(API_HOST+"/v1/bookings/"+userID)
        .then((response) => {
            reservationsRes = response.data
        })
        .catch((err) => {
            errorRes = (err);
        })
        .finally(() => {
            loadingRes = (false);
        });

    return {reservationsRes,loadingRes,errorRes};
}
async function deleteReservationsById(id) {
    let response = [];
    let loadingRes = true;
    let errorRes = "";

    await axios.delete(API_HOST+"/v1/bookings/delete/"+id)
        .then((res) => {
            response = res.data
        })
        .catch((err) => {
            errorRes = (err);
        })
        .finally(() => {
            loadingRes = (false);
        });

    return {response,loadingRes,errorRes};
}
async function postReservation(userId, seshId, seatsBooked) {
  let response = "";
  let loading = true;
  let error = "";

  const payload = {
    USER_ID: userId,
    MOVIE_SESSION_ID: seshId,
    SEATS_BOOKED: seatsBooked,
  };

  await axios
    .post(API_HOST + "/v1/bookings/insert", payload)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      error = err;
    })
    .finally(() => {
      loading = false;
    });

  return { response, loading, error };
}

// Initalising default reviews
const formattedDate = getCurrentDateFormatted();
const currentDate = new Date();

function getCurrentDateFormatted() {
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, "0");
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let year = String(currentDate.getFullYear()).slice(-2);
  let TempFormattedDate = `${day}-${month}-${year}`;
  return TempFormattedDate;
}

function getDateFormatted(dateString) {
  let date = new Date(dateString);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = String(date.getFullYear()).slice(-2);
  let TempFormattedDate = `${day}-${month}-${year}`;
  return TempFormattedDate;
}

// List of users -- Default USERS
const users = [ADMIN_USER, GHIFARI, KALANA, GANG];

let reviews = [];

let timestamps = [];

// Initalising default admin account
function initUsers() {
  // Stop if data is already initialised.
  if (localStorage.getItem(USERS_KEY) !== null) return;

  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  //set timestamps
  localStorage.setItem(TIMESTAMP_KEY, JSON.stringify(timestamps));
}

//to update all ratings of movies based on all reviews
function getAvgRating() {
  //get reviews
  let storedReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY));

  //dict to hold movie and sum rating and no ratings
  let tempRatingsDict = {};

  for (const review of storedReviews) {
    if (tempRatingsDict[review.movie.title]) {
      let scoreSum = tempRatingsDict[review.movie.title].ratingSum;

      tempRatingsDict[review.movie.title].ratingSum = scoreSum + review.stars;
      tempRatingsDict[review.movie.title].ratingNum += 1;
    } else {
      //to store rating and numer of ratings
      let tempScores = { ratingSum: review.stars, ratingNum: 1 };
      tempRatingsDict[review.movie.title] = tempScores;
    }
  }

  let avgRatingDict = {};
  for (const key in tempRatingsDict) {
    avgRatingDict[key] =
      tempRatingsDict[key].ratingSum / tempRatingsDict[key].ratingNum;
  }

  return avgRatingDict;
}

function getMoviesSortedByRating(movies) {
  const avgRatingsDict = getAvgRating();

  for (let i = 0; i < movies.length; i++) {
    if (avgRatingsDict[movies[i].title]) {
      movies[i].avgRating = avgRatingsDict[movies[i].title];
    }

    movies.sort((a, b) => b.avgRating - a.avgRating);
  }
  return movies;
}

// Verifying if user
function verifyUser(email, password) {
  const usersList = getUsers();
  for (const user of usersList) {
    if (user.email === email && user.password === password) {
      setCurrentUser(email);
      return true;
    }
  }
}

function setUserObjectLocalStorage(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Adding signed up user to local storage
async function addUser(user) {
  //add date joined
  user.JOIN_DATE = new Date();

  const response = await axios.post(API_HOST + "/v1/users/create", user);

  return response.data;
}

async function loginUser(user) {
  const response = await axios.post(API_HOST + "/v1/users/login", user);

  return response.data;
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY));
}

// Setting current user
function setCurrentUser(email) {
  localStorage.setItem(CURRENT_USER_KEY, email);
}

//returns user email which is stored in local storage
function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

// get user object
function getCurrentUserObject() {
  const response = localStorage.getItem(CURRENT_USER_KEY);

  // Parse the JSON string into a JavaScript object
  const parsedResponse = JSON.parse(response);
  return parsedResponse;
}

// Getting username from email
async function getUsernameFromEmail(email) {
  const response = await axios.post(API_HOST + "/v1/users/username", email);

  return response.data;
}

async function getUserObject(email) {
  const emailObject = { EMAIL: email };
  const response = await axios.post(
    API_HOST + "/v1/users/username",
    emailObject
  );

  return response.data;
}

export async function incrementMovieView(id) {
  const response = await axios.get(API_HOST + `/v1/movies/increment/${id}`);

  return response;
}

function logout() {
  return localStorage.removeItem(CURRENT_USER_KEY);
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function isValidUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return usernameRegex.test(username);
}

function isValidPassword(password) {
  /*
    At least 8 characters in length.
    Contains at least one lowercase letter.
    Contains at least one uppercase letter.
    Contains at least one digit (number).
    */
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return strongPasswordRegex.test(password);
}

async function addReview(review) {
  const response = await axios.post(API_HOST + "/v1/reviews/post", review);

  return response.data;
}

function addToTimeStamps(userEmail, dateObj) {
  //get stored timestamps
  let storedTimeStamps = JSON.parse(localStorage.getItem(TIMESTAMP_KEY));
  const tempVal = { email: userEmail, timestamp: dateObj };

  storedTimeStamps.unshift(tempVal);

  //store back to local storage
  localStorage.setItem(TIMESTAMP_KEY, JSON.stringify(storedTimeStamps));
}

function getTimeStamps() {
  return JSON.parse(localStorage.getItem(TIMESTAMP_KEY));
}

function getReviews() {
  return JSON.parse(localStorage.getItem(REVIEWS_KEY));
}

async function updateReview(newContent, reviewId) {
  const response = await axios.post(API_HOST + "/v1/reviews/update/" + reviewId, newContent);

  return response.data;  
}

async function deleteReview(reviewID) {
  const response = await axios.delete(API_HOST + "/v1/reviews/delete/" + reviewID);

  return response.data;
}

function deleteUserReviews(email) {
  //get reviews
  let storedReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY));

  //keep track of indexes to remove
  let matchIndexes = [];

  //get indexes of users reviews
  for (let i = 0; i < storedReviews.length; i++) {
    const review = storedReviews[i];

    //check for reviews from user
    if (review.email === email) {
      matchIndexes.push(i);
    }
  }

  // Create a new array that excludes reviews at specified indexes
  const updatedReviews = storedReviews.filter(
    (review, index) => !matchIndexes.includes(index)
  );

  //store new review list to local storage
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));
}

async function deleteAccount(userEmail) {
  // Removing the current logged in user
  localStorage.removeItem(CURRENT_USER_KEY);
  console.log(userEmail);
  const response = axios.post(API_HOST + "/v1/users/delete", {
    EMAIL: userEmail,
  });
  console.log(response);

  //remove users reviews
  deleteUserReviews(userEmail);
}

async function updateUser(oldEmail, newEmail, newUsername, newPassword) {
  const apiURL = API_HOST + "/v1/users/update";
  console.log(oldEmail, newEmail, newUsername, newPassword);
  const updatedUser = {
    OLD_EMAIL: oldEmail,
    USERNAME: newUsername,
    EMAIL: newEmail,
    PASSWORD: newPassword,
  };
  const response = await axios.post(apiURL, updatedUser);
  return response.data;
}

function validateUserForReviews(userEmail, numReviews, numMins) {
  let storedTimeStamps = JSON.parse(localStorage.getItem(TIMESTAMP_KEY));

  //max number of 2 reviews within 10 mins
  const MAX_REVIEW_COUNT = numReviews;
  //minutes in milliseconds
  const MINS_IN_MS = numMins * 60 * 1000;
  //to keep track of reviews that are under 10 mins
  let count = 0;

  const nowDate = new Date();
  for (const timestamp of storedTimeStamps) {
    if (timestamp.email === userEmail) {
      const tempDate = new Date(timestamp.timestamp);
      //check how many reviews are made by user in the last 10 mins
      if (nowDate.getTime() - tempDate.getTime() <= MINS_IN_MS) {
        count++;
        console.log(nowDate.getTime() - tempDate.getTime());
        //return if user has 2 or more reviews within the last 10 mins
        if (count >= MAX_REVIEW_COUNT) {
          return false;
        }
      }
    }
  }

  return true;
}

async function fetchMovieReviewsById(ID) {
  const response = await axios.get(API_HOST + "/v1/reviews/" + ID);

  return response.data;
}

async function getUsernameFromId(ID) {
  const response = await axios.get(API_HOST + "/v1/users/id/" + ID);

  return response.data;
}

export {
  addUser,
  loginUser,
  initUsers,
  setCurrentUser,
  getCurrentUser,
  verifyUser,
  logout,
  getUsernameFromEmail,
  isValidEmail,
  isValidUsername,
  isValidPassword,
  addReview,
  getReviews,
  deleteAccount,
  updateUser,
  getCurrentUserObject,
  getCurrentDateFormatted,
  updateReview,
  deleteReview,
  getAvgRating,
  getMoviesSortedByRating,
  getDateFormatted,
  getTimeStamps,
  validateUserForReviews,
  getUserObject,
  setUserObjectLocalStorage,
  fetchSessionsByMovieId,
  postReservation,
  fetchMovieReviewsById,
  getUsernameFromId,    
  fetchReservationsByUserId,
  deleteReservationsById,
};
