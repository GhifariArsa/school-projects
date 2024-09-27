//for testing
import { paste } from '@testing-library/user-event/dist/paste';
import {nowShowingMovies} from '../Movies/movies'



const USERS_KEY = "users";
const CURRENT_USER_KEY = "current_user";
const REVIEWS_KEY = "reviews";
const TIMESTAMP_KEY = "timestamps";

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



// Initalising default reviews
const formattedDate = getCurrentDateFormatted();
const currentDate = new Date();


function getCurrentDateFormatted(){
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, '0');
  let month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  let year = String(currentDate.getFullYear()).slice(-2);
  let TempFormattedDate = `${day}-${month}-${year}`;
  return TempFormattedDate;
}

function getDateFormatted(dateString){
  let date = new Date(dateString);
  let day = String(date.getDate()).padStart(2, '0');
  let month = String(date.getMonth() + 1).padStart(2, '0'); 
  let year = String(date.getFullYear()).slice(-2);
  let TempFormattedDate = `${day}-${month}-${year}`;
  return TempFormattedDate;
}



// List of users -- Default USERS
const users = [ADMIN_USER, GHIFARI, KALANA, GANG];

let reviews = [];

let timestamps =[];

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
function getAvgRating(){
  //get reviews
  let storedReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY));

  //dict to hold movie and sum rating and no ratings
  let tempRatingsDict = {};

  for(const review of storedReviews){
    if(tempRatingsDict[review.movie.title]){
      let scoreSum = tempRatingsDict[review.movie.title].ratingSum;

      tempRatingsDict[review.movie.title].ratingSum = scoreSum + review.stars;
      tempRatingsDict[review.movie.title].ratingNum +=1;


    }else{
      //to store rating and numer of ratings
      let tempScores = {ratingSum:review.stars,ratingNum:1};
      tempRatingsDict[review.movie.title] = tempScores;
    }
  }


  let avgRatingDict = {};
  for(const key in tempRatingsDict){
    avgRatingDict[key] = tempRatingsDict[key].ratingSum / tempRatingsDict[key].ratingNum;
  }

  
  return avgRatingDict;
}

function getMoviesSortedByRating(movies){

  const avgRatingsDict = getAvgRating();

  for (let i = 0; i < movies.length; i++) {
    if(avgRatingsDict[movies[i].title]){
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

// Adding signed up user to local storage
function addUser(user) {
  //add date joined
  user.joinDate = new Date();
  let storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)); // Parse the stored data
  storedUsers.push(user); // Add the new user to the array

  // Store the updated array as a string
  localStorage.setItem(USERS_KEY, JSON.stringify(storedUsers));

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

//get user object
function getCurrentUserObject() {
  let tempEmail = localStorage.getItem(CURRENT_USER_KEY);
  let currentUser = getUserObjectFromEmail(tempEmail);
  return currentUser;

}

// Getting username from email
function getUsernameFromEmail(email) {
  const usersList = getUsers();
  let currentUsername;
  for (const user of usersList) {
    if (user.email === email) {
      currentUsername = user.username;
      return currentUsername;
    }
  }
  return null;
}

function getUserObjectFromEmail(email) {
  const usersList = getUsers();
  let currentUser;
  for (const user of usersList) {
    if (user.email === email) {
      currentUser = user;
    }
  }
  return currentUser;
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

function isDuplicateUser(email) {
  const usersList = getUsers();

  for (const user of usersList) {
    if (user.email === email) {
      return true;
    }
  }
  return false;
}

function addReview(review) {
  let storedReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY));
  // Add the new review to top of array (to keep the most recent reviews at the start)

  storedReviews.unshift(review);

  //add review time to timestamps (to keep track of spam reviews)
  addToTimeStamps(review.email, review.dateObject);

  // Store the updated array as a string
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(storedReviews));
}

function addToTimeStamps(userEmail,dateObj){
  //get stored timestamps
  let storedTimeStamps = JSON.parse(localStorage.getItem(TIMESTAMP_KEY));
  const tempVal = {email:userEmail,
                    timestamp:dateObj};

  storedTimeStamps.unshift(tempVal);

  //store back to local storage
  localStorage.setItem(TIMESTAMP_KEY, JSON.stringify(storedTimeStamps));

}

function getTimeStamps(){
    return JSON.parse(localStorage.getItem(TIMESTAMP_KEY));

}

function getReviews() {
  return JSON.parse(localStorage.getItem(REVIEWS_KEY));
}

function updateReview(newContent, oldReview) {
  //get reviews
  let storedReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY));

  let tempReview=-1;
  let matchIndex;
  //get oldReview from stored review and update details
  for (let i = 0; i < storedReviews.length; i++) {
    const review = storedReviews[i];
    
    //check for oldReview
    if(review.email===oldReview.email && review.dateObject === oldReview.dateObject){
      //get index
      matchIndex = i;
      tempReview = review;
      break;
    }
  }
  if(tempReview===-1){
    console.log("index not found!");
    return;
  }
  //remove old review
  storedReviews.splice(matchIndex,1);
  //update old review
  tempReview.review = newContent;
  tempReview.dateObject = new Date();
  tempReview.dateFormatted = getCurrentDateFormatted();

  //add updated review to top of storedReviews
  storedReviews.unshift(tempReview); 

  //store to local storage
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(storedReviews));

}

function deleteReview(oldReview) {
  //get reviews
  let storedReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY));
  let matchIndex=-1;

  //get oldReview from stored review and delete
  for (let i = 0; i < storedReviews.length; i++) {
    const review = storedReviews[i];
    
    //check for oldReview
    if(review.email===oldReview.email && review.dateObject === oldReview.dateObject){
      //get index
      matchIndex = i;

      //remove old review
      storedReviews.splice(matchIndex,1);
      
      //store new review list to local storage
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(storedReviews));

      break;
    }
  }
  if(matchIndex===-1){
    console.log("index not found!");
    return;
  }


}

function deleteUserReviews(email) {
  //get reviews
  let storedReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY));

  //keep track of indexes to remove
  let matchIndexes= [];

  //get indexes of users reviews
  for (let i = 0; i < storedReviews.length; i++) {
    const review = storedReviews[i];
    
    //check for reviews from user
    if(review.email===email){

      matchIndexes.push(i);
    }
  }

  // Create a new array that excludes reviews at specified indexes
  const updatedReviews = storedReviews.filter((review, index) => !matchIndexes.includes(index));


  //store new review list to local storage
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));

}


function deleteAccount(userEmail) {
  // Removing the current logged in user
  localStorage.removeItem(CURRENT_USER_KEY);

  //remove users reviews
  deleteUserReviews(userEmail);


  // Removing the current user from the users list
  let usersList = getUsers();
  usersList = usersList.filter((user) => user.email !== userEmail);
  localStorage.setItem(USERS_KEY, JSON.stringify(usersList));
}

function updateUser(oldEmail, newEmail, newUsername, newPassword) {
  const storedUsers = getUsers();

  const updatedUser = {
    username: newUsername,
    email: newEmail,
    password: newPassword,
  };

  const updatedUsers = storedUsers.map((user) => {
    if (user.email === oldEmail) {
      // Return a new object with updated values
      return { ...user, ...updatedUser};
    }
    // If no update is needed, return the original object
    return user;
  });

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
}

function validateUserForReviews(userEmail,numReviews,numMins){
  let storedTimeStamps = JSON.parse(localStorage.getItem(TIMESTAMP_KEY));

  //max number of 2 reviews within 10 mins
  const MAX_REVIEW_COUNT = numReviews;
  //minutes in milliseconds
  const MINS_IN_MS = numMins * 60 * 1000;
  //to keep track of reviews that are under 10 mins
  let count = 0;

  const nowDate = new Date();
  for(const timestamp of storedTimeStamps){

    if(timestamp.email === userEmail){
      const tempDate = new Date(timestamp.timestamp);
      //check how many reviews are made by user in the last 10 mins
      if(nowDate.getTime()-tempDate.getTime() <=MINS_IN_MS){
        count++;
        console.log(nowDate.getTime()-tempDate.getTime());
        //return if user has 2 or more reviews within the last 10 mins
        if(count >=MAX_REVIEW_COUNT){
          return false;
        }
      }
    }
  }

  return true;
}

export {
  initUsers,
  addUser,
  setCurrentUser,
  getCurrentUser,
  verifyUser,
  logout,
  getUsernameFromEmail,
  isValidEmail,
  isValidUsername,
  isValidPassword,
  isDuplicateUser,
  getUserObjectFromEmail,
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
};
