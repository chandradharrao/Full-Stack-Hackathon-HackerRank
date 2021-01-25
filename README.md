# Full-Stack-Hackathon-HackerRank
## The Office Cafe

This is a full stack web app that aims to solve food ordering hassles at large offices. The app has built in authentication that uses the secure JWT standard. Users can also toggle the "remember me" option to sign in automatically even after restarting the browser. Upon creation of a new account, the user is greeted with a success page that gives them a unique registration id. All the data is stored on the database simultaneously. Once the user is authenticated, they can choose their favourite items from the menu and view the total cost too. Then the user can checkout. At this point a checkout page with the option to choose from 3 different modes of payment and the take-away time is made available.

#### Authors: [Chandradhar Rao](https://github.com/chandradharrao), [Dhruval PB](https://github.com/Dhruval360)

## Tech stack:
* Front End : ReactJS
* Backend : MongoDB, ExpressJS, NodeJS


**Target audience:** Companies and other organizations 

## Features:
1. User Authentication (with encryption) 
2. User Profile
3. Menu 
4. Remember me feature
5. Cart 

## Heroku deployment:
Check out our app in action at [The Office Cafe](https://office-cafeteria-app.herokuapp.com/)

## File Structure:

1. The main folder contains the backend express server that has all the REST APIs.
2. The Cient folder contains the React frontend 

## Clone the repository:

```bash
$ git clone https://github.com/...
```

## Installing dependencies:

```bash
$ yarn install
$ yarn client-install
```

The first command installs the backend server side dependencies. The next command installs the react client dependencies

The same can be achieved using


```bash
$ npm install
$ npm client-install
```

## Run the app:

Run the app by using **npm dev** or **yarn dev** after installing all the dependencies. Then go to http://localhost:3000/ to view the app.

#### Note: A JWT key and MongoDB URI are required for the app to function and they can be placed in a file named ".env" in the project folder.