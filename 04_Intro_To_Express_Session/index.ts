import express from "express";
import session from "express-session";

import MongoStore from "connect-mongo";

const app = express();

// database
import "./db.js";

// middleware:
// to parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
    *) Cookie:
        -> Store in the browser
    *) Session:
        -> Store information about user that is moving throughout the client side
        -> Store in the Server side or express application
        -> can store larger amounts of data
        -> in cookie we can't store user credential or secret information
        -> in that case we can use session
        -> so session work on the server side and we will authenticate into the session with a secret key
*/

/*
    *) Session Store Implementation:
        -> this means to deciding what persistent memory are we going to store our sessions in.
        -> so by default 'express-session' will use the memory to store the session
        -> which is not a scalable solution
        -> so for that we need to setup an actual session store. for that we can use databases
        -> https://www.npmjs.com/package/express-session
        -> on the documentation they talk talk about the Compatible session stores with 'express-session'
        -> so right now we are using 'connect-mongo' session store that will use a mongodb database
            -> https://www.npmjs.com/package/connect-mongo
*/

// sessionStore will use as the database to store the session
const sessionStore = MongoStore.create({
  // database url to store the session information
  mongoUrl: "mongodb://localhost:27017/passport-user-auth-tut",
  // collection name to store session
  collectionName: "sessions",
});

// creating session middleware
app.use(
  session({
    // NOTE put it in env variable
    // when we will put secret key then if secret key is invalid the session is invalid to
    secret: "some secret",

    // should we resave the session if noting have changed
    resave: false,

    saveUninitialized: true,

    // here we are specifying where we want to store the session
    store: sessionStore,

    cookie: {
      // so here we are setting a expire date of cookie
      maxAge: 1000 * 60 * 60 * 24, // 1 days
    },
  })
);
/*
  -> So now whenever we will request to the server from the client it will fire up the session middleware and it will going to create a session Id which will going to store into the cookie into the client browser
*/

app.get("/", (req, res, next) => {
  /*
        -> so, now whenever client is requesting to '/' url then the session middleware will get initialized session and it will going to take that session Id and and set the cookie to that session id
        -> and then that cookie will get set to 'set-cookies' header and that will be on the response header that get response to the browser
        -> and browser will get receive it and then it will save that cookie into the browser
        -> and every time we will again request from the save client that cookies will be the part of request header
        -> by default cookie name will be 'connect.sid' which will contain the session id
    */

  /*
   *) After storing the session on browser and on the database
        -> so after storing the session on browser it will attach that sessionId on ever request
        -> it will going to take the value of that sessionId, and will going to search for that sessionId to the session store
        -> and if the session valid then we can get the information from the session ether to authenticate a user, or to get some data about the user
        -> so when ever server get the session id from client it will check to the session database it will grab that session document and it will going to get the information that we have set on to that session
   */

  /*
        -> so, for these tutorial we will use this session for the use authentication using passport js
    */
  // now even we can get the information about the session
  console.log(req.session);

  // logic to see the number of time same client user request the server

  let viewCount = (req.session as any).viewCount;
  // so here for the first time viewCount will be undefined
  // after that we will set the viewCount and increment it
  // and NOTE that this 'viewCount' will get store to the session

  if (viewCount) {
    // so here we are incrementing every time client will visit to our site
    console.log(viewCount);
    viewCount = viewCount + 1;
    (req.session as any).viewCount = viewCount;
  } else {
    (req.session as any).viewCount = 1;
  }
  // viewCount is the number of time that user visit the site

  res.send(`You have visited this page: ${viewCount} times`);
});

app.listen(8080, () => {
  console.log("Server running");
});
