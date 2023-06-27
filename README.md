# leaderboardsystem
 

## Description

The My API Server is a backend server built with Node.js and Express.js. It provides various API endpoints for retrieving and manipulating data related to missions, bounties, leaderboards, and user information. The server uses JSON files to store the data.

## Installation

To set up and run the My API Server, follow these steps:

1.  Make sure you have Node.js installed on your machine.
2.  Download or clone the code for the My API Server.
3.  Open a terminal and navigate to the project directory.
4.  Install the required dependencies by running the following command:
    
    Copy code
    
    `npm install` 
    
5.  Start the server by running the following command:
    
    sqlCopy code
    
    `npm start` 
    
    The server will be running on `http://localhost:3000`.

## API Endpoints

### GET /api/missions

Returns a JSON array of missions.

### GET /api/bounties

Returns a JSON array of bounties.

### GET /api/leaderboards

Returns a JSON array of users sorted by points in descending order.

### GET /api/upcoming-missions

Returns a JSON array of upcoming missions.

### POST /api/users

Creates a new user based on the provided data in the request body. Returns the created user object if successful.

### POST /api/login

Authenticates the user with the provided username and password. Sets an authentication cookie if successful.

### GET /dashboard

Renders the dashboard page with the user's data. Requires an authenticated user.

### GET /api/users/:userId

Returns the user profile information for the specified user ID.

### GET /

Serves the login page.

### GET /index

Serves the index page.

## File Structure

The server code follows the following file structure:

-   `index.js`: The main entry point for the server application.
-   `views`: Contains the HTML views for the login and index pages.
    -   `login.html`: The login page HTML template.
    -   `index.html`: The index page HTML template.
-   `missions.json`: JSON file containing missions data.
-   `bounties.json`: JSON file containing bounties data.
-   `users.json`: JSON file containing user data.
-   `upcomingMissions.json`: JSON file containing upcoming missions data.

## Dependencies

The My API Server relies on the following dependencies:

-   express: A fast and minimalist web framework for Node.js.
-   cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
-   body-parser: Middleware for parsing request bodies.
-   fs: File system module for reading JSON files.
-   path: Module for handling file paths.
-   uuid: Library for generating unique IDs.
-   bcryptjs: Library for hashing and comparing passwords.
-   cookie-parser: Middleware for parsing cookies.

## Usage

You can use the My API Server to fetch and manipulate data related to missions, bounties, leaderboards, and user information. Use the provided API endpoints to interact with the server and retrieve the required data.

Make sure to authenticate users using the `/api/login` endpoint and set the authentication cookie (`authenticated` and `userId`) in subsequent requests to access protected routes like `/dashboard`.

To customize the server behavior or extend its functionality, you can modify the existing endpoints or add new ones to suit your requirements.

Note: This documentation assumes basic familiarity with Node.js, Express.js, and RESTful APIs.


> Written with [StackEdit](https://stackedit.io/).