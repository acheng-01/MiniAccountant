# MiniAccountant
Link to live app: https://stark-mountain-89969.herokuapp.com/

## Overview
MiniAccountant is a RESTful web application designed to help users keep track of their monthly expenses.

![](https://github.com/acheng-01/MiniAccountant/blob/main/MiniAccountant-Sample.gif)

On the client side, ReactJS is used as the primary library for faster rendering, generated through Create-React-App. A few other
technologies used on the client side include:
- Redux (for app-wide state management)
- React Router v6 (for routing related actions)
- Axios (for fetch request handling)

On the server side, NodeJS is used with Express as its framework. The server side takes care of user authentication and database
transactions.

PostgreSQL is chosen for this app for practice with a relational database system as well as SQL, a widely used database coding
language. An npm package called Knex is used to bridge changes to the database with javascript code.

## Limitations
Currently, the user is only able to log into the app using Oauth services provided by Google and Facebook. Another restriction is
that users are only able to add an expense one at a time via navigation to a different page and back.

Future expansions of this app might include:
- Incorporating a more local method of authentication such as with JWTs (i.e. email and password).
- Making the dashboard display a more dynamic table from which the user can add, edit, and delete expenses without navigating
to another endpoint
- Adding a new endpoint functionality where users can view a line graph that compares their budgets to their expenses by the
month

## Usage
1. Log in to the app using either Google or Facebook.
2. Add a budget for the current month.
3. Add an expense for the current month.
4. Click on the pencil icon after each listed expense on the dashboard to edit the expense.
5. Click on the trash can icon after each listed expense on the dashboard to delete the expense.
6. Click on the paper/pencil icon on the right side of the page to edit the current month's budget.
7. Change the month and year under "View another month's budget" to view another budget and its associated expenses.
8. Log out on the upper right corner of the page (where the header is).

## Local Install and Run Guide
To run this app locally on your machine:
1. Fork this repository over and download it either with git or by zip.
2. Navigate to where the file is downloaded in terminal, then use command `npm i` while in the file directory to install
all server dependencies.
3. Navigate to the client directory (which is in the server directory) with `cd client`, then `npm i` again to install
all client-side dependencies.
4. In the server directory, you will need to create a `dev.js` file in the config folder. This is the file that will contain
all of your keys that are needed for all the APIs to work. Please see the prod.js file in the same folder on the variable
naming schemes. Each variable must be spelled in exactly the same way. It should look like:
```
module.exports = {
    googleClientID: "<your own Google client ID here>",
    googleClientSecret: "<your own Google client secret here>",
    ...
}
```
(`cookieKey` can be anything you set it to. `redirectDomain` should be the same localhost port you are using client-side.
By default it should be set to http://localhost:3000. For all the other keys, please see the asteriks below.)

5. **IMPORTANT STEP** Run `npm run migrate` to build the database. This is to be done **AFTER** postgreSQL is properly set up!
(See below for details.)
7. Run `npm run dev`. Your terminal should start listening for activity on PORT 8000. The web page should also start itself
on your default browser as http://localhost:3000. Of course, you are welcome to change the listening port. This can be done
in the `index.js` file in the root server directory.

* Instructions are assuming that npm and NodeJS (and git, optional) are already installed on your machine. If you do not have
these, please visit https://docs.npmjs.com/downloading-and-installing-node-js-and-npm for instructions to set up and download.

** You will need to have or set up an account with Google and Facebook for authentication to work. Here are a few links to help
you obtain all the keys needed:
- https://console.developers.google.com/ (Start a new project, make sure to configure Oauth consent and Oauth credentials to
get the client ID and client secret. When prompted by the credentials screen, set Javascript origin to `http://localhost:3000`
and redirect URL to `http://localhost:3000/auth/google/callback`. Finishing these steps should give you the `googleClientID`
and `googleClientSecret` to add to `dev.js`.)
- https://developers.facebook.com/ (Go to 'My Apps' and create a test app. Add Facebook Login as a product. Once this is done,
head to settings under Facebook Login to make sure the both web Oauth and client Oauth are enabled. For test apps, Facebook by
default allows localhost access, so no URL needs to be configured. Then head to regular basic settings of the entire project.
There you will find the App ID and App Secret, which will be `facebookClientID` and `facebookClientSecret` respectively.)

*** You must have postgreSQL installed and set up on your computer! (https://www.postgresql.org/download/) Since this is not
a virtual database, everything is locally stored. It is also highly recommended that you install a database management app such
as pgAdmin or DBeaver so that you can view and make sure data is being stored. Once this is done, you have to first create a
database called 'accountant'. After that, set the `DATABASE_URL` to `postgresql://<insert user name>@localhost/accountant`. The
user name is something you create upon setting up the database with command in terminal `psql createuser <user name>`.
