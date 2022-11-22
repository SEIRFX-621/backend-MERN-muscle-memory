# Setup

This project is built off of your starter templates for MERN stack that you used for project 3.

## install node packages

```
npm i
```

this should install the following packages

```
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.7.2",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.0"
```

feel free to install any additional packages you may want to include.

## Mongodb

ensure that you have mongodb running locally or that you have a working mongo atlas URI added to your .env file.

your .env file should look something like this

```
PORT=5000
MONGO_CONNECTION_STRING=<mongo connection string>/doodle-history-app
JWT_SECRET=<some random string>
```

This collection will be used for the doodle-history-app, feel free to name your database whatever you please, but i've named mine 'doodle-history-app'. 

## Postman

inside of this backend project is a postman collection with your signup and login routes already created with a postman environment file setup for these endpoints. Please see the postman login route to see how we are saving authentication tokens in your postman environment. (this is so you do not have to copy and paste your jwt from your login route to other postman request)

