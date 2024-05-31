const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());
const db = require("./src/database");
const User = db.User;
const Review = db.Review;



require('./src/routes/user.routes.js')(express, app);
require('./src/routes/review.routes.js')(express, app);
// const userController = require('./src/controller/user.controller');
// userController(express, app);

describe('Model-User', () => {

    test('Create a new user', async () => {

        //declare new user
        const newUser = {
            EMAIL: 'Jablanica@gmail.com',
            USERNAME: 'jab',
            PASSWORD: 'jabpass',
            JOIN_DATE: new Date()
        }
            
        await User.sync();

        //add user to db
        const createdUser = await User.create(newUser);

        //get newly added user
        const user = await User.findOne({
            where:{
                EMAIL : newUser.EMAIL,
            }
        })
        //check if newly added user is correct
        expect(user).not.toBeNull();

        //delete the newly added user from db
        user.destroy()

    });

    test('Create duplicate user', async () => {
        let sqlError = false;
        //declare new user
        const newUser = {
            EMAIL: 'Jablanica@gmail.com',
            USERNAME: 'jab',
            PASSWORD: 'jabpass',
            JOIN_DATE: new Date()
        }

            
        await User.sync();

        //add user to db
        const createdUser = await User.create(newUser);

        // add user again to db
        try {
            await User.create(newUser);
                fail('Expected a duplicate user error, but none occurred.');
            } catch (error) {
            // Check if  error is thrown duplicate entry
            sqlError = true;
        }
        
        //delete the newly added user from db
        const user = await User.findOne({
            where:{
                EMAIL : newUser.EMAIL,
            }
        })
        user.destroy();

        expect(sqlError).toBe(true);

    });


    test('Sign in a newly added user', async () => {

        await User.sync();
        //declare new user
        const newUser = {
            EMAIL: 'Jablanica@gmail.com',
            USERNAME: 'jab',
            PASSWORD: 'jabpass',
            JOIN_DATE: new Date()
        }

        //add user to db
        const temp = await User.create(newUser);

        // login new user and expect code 200
        const response = await new Promise((resolve, reject) => {
        request(app)
            .post('/v1/users/login')
            .send({
            EMAIL: newUser.EMAIL,
            PASSWORD: newUser.PASSWORD
            })
            .expect(200) // expect successful login
            .end((err, res) => {
            if (err) return reject(err);
            resolve(res);
            });

        });

        //delete the newly added user from db
        const user = await User.findOne({
            where:{
                EMAIL : newUser.EMAIL,
            }
        })
        user.destroy()

    });

    test('Sign in user with wrong password', async () => {

        await User.sync();
        //declare new user
        const newUser = {
            EMAIL: 'Jablanica@gmail.com',
            USERNAME: 'jab',
            PASSWORD: 'jabpass',
            JOIN_DATE: new Date()
        }

        //add user to db
        const temp = await User.create(newUser);

        // login new user and expect code 200
        const response = await new Promise((resolve, reject) => {
        request(app)
            .post('/v1/users/login')
            .send({
            EMAIL: newUser.EMAIL,
            PASSWORD: "incorrrectPassword"
            })
            .expect(500) // expect unsuccessful login
            .end((err, res) => {
                resolve(res);
            });
        });

        //delete the newly added user from db
        const user = await User.findOne({
            where:{
                EMAIL : newUser.EMAIL,
            }
        })
        user.destroy()

    });

    test('Update user information', async () => {

        await User.sync();
        //declare new user
        const newUser = {
            EMAIL: 'Jablanica@gmail.com',
            USERNAME: 'jab',
            PASSWORD: 'jabpass',
            JOIN_DATE: new Date()
        }

        //add user to db
        const temp = await User.create(newUser);

        // update user information
        const response = await new Promise((resolve, reject) => {
        request(app)
            .post('/v1/users/update')
            .send({
                EMAIL: "updatedEmail@new.com",
                OLD_EMAIL : newUser.EMAIL,
                PASSWORD: "updatedPassword",
                USERNAME : "newUsername"
            })
            .expect(200) // expect successful login
            .end((err, res) => {
            if (err) return reject(err);
            resolve(res);
            });

        });

        //check if user has been updated
        expect(response.body.message).toBe("User updated successfully");

        //delete the newly added user from db
        const user = await User.findOne({
            where:{
                EMAIL : "updatedEmail@new.com",
            }
        })
        user.destroy()
    });

});


describe('Model-Review', () => {

    test('Add review', async () => {
        await User.sync();
        
        //declare new user
        const newUser = {
            EMAIL: 'Jablanica@gmail.com',
            USERNAME: 'jab',
            PASSWORD: 'jabpass',
            JOIN_DATE: new Date()
        }




        //add user to db
        const createdUser = await User.create(newUser);
        console.log(createdUser);

        
        //add review to db
        const createdReview = await Review.create({
            USER_ID: createdUser.ID,
            MOVIE_ID: 11,
            REVIEW_DESC: "Testing Desc",
            NO_STARS: 1,
            DATETIME: new Date(),
        });

        //check if review exists and matches new users ID
        const review = await Review.findOne({
            where:{
                USER_ID : createdUser.ID,
            }
        })

        //check if the added review matches
        expect(review.MOVIE_ID).toBe(11);
        expect(review.REVIEW_DESC).toBe("Testing Desc");
        expect(review.NO_STARS).toBe(1);

        //delete newly added review from db
        review.destroy();

        //delete the newly added user from db
        const user = await User.findOne({
            where:{
                EMAIL : newUser.EMAIL,
            }
        })
        user.destroy();

    });

});