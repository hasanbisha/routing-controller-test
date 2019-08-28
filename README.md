# routing-controller-test

:ROUTES:
  GET -/
  -> returns all posts which have the userId you submited with the jwt token
  << Requirements >>
  headers: {
    Authorization: -JWT TOKEN YOU RECEIVE FROM LOGIN OR SIGN UP-
  }
  
    GET -/post/-POST ID HERE-
  -> returns the post with the corresponding post id
  << Requirements >>
  headers: {
    Authorization: -JWT TOKEN YOU RECEIVE FROM LOGIN OR SIGN UP-
  }
  
      POST -/post
  -> used to add post
  << Requirements >>
  headers: {
    Authorization: -JWT TOKEN YOU RECEIVE FROM LOGIN OR SIGN UP-
    Content-Type: application/json
  }
  body: {
    title: 'title of your post',
    body: 'body of your post'
  }
  
        PUT -/post/post/-POST ID HERE-
  -> used to update certain post
  << Requirements >>
  headers: {
    Authorization: -JWT TOKEN YOU RECEIVE FROM LOGIN OR SIGN UP-
    Content-Type: application/json
  }
  body: {
    title: 'title of your post',
    body: 'body of your post'
  }
  
          DELETE -/post/post/-POST ID HERE-
  -> used to delete certain post
  << Requirements >>
  headers: {
    Authorization: -JWT TOKEN YOU RECEIVE FROM LOGIN OR SIGN UP-
    Content-Type: application/json
  }
  
        POST -/register
  -> used to add user, receive jwt token for this user
  << Requirements >>
  headers: {
    Authorization: -JWT TOKEN YOU RECEIVE FROM LOGIN OR SIGN UP-
    Content-Type: application/json
  }
  body: {
    "name": "name here",
    "email": "email here",
    "password": "password here"
  }
  
          POST -/login
  -> used to login, receive jwt token for this user
  << Requirements >>
  headers: {
    Authorization: -JWT TOKEN YOU RECEIVE FROM LOGIN OR SIGN UP-
    Content-Type: application/json
  }
  body: {
    "email": "email here",
    "password": "password here"
  }
  
//// USE POSTMAN FOR EASY TESTING
//// AUTHENTICATION, ROUTE PROTECTION, VALIDATION IS BUILT IN
