
#  Game API Documentation

Welcome to the documentation for the  Game API! This API allows game developers to access and manage game-related data such as missions, bounties, leaderboards, and more. This documentation will guide you through the different API endpoints and their functionalities. You don't need to be a technical expert to understand this guide, so let's get started!

## Table of Contents

-   Introduction
-   API Endpoints
    -   Get Missions
    -   Get Bounties
    -   Get Leaderboards
    -   Get NFTs
    -   Get upcoming missions
    -   Create User
    -   User Login
    -  User Dashboard
    -  Get user Profile
    -   Search missions
    -   Add mission to user
    -   Complete mission
    -   Update leaderboard

## Introduction

The  Game API provides a set of endpoints that allow game developers to interact with game-related data. This API is built using Node.js and utilizes the Express framework. You don't need to worry about the technical details; you just need to understand how to use the provided endpoints.

To use the  Game API, you can send HTTP requests to the specified endpoints. The API will respond with the requested data or perform the requested action. The responses will be in JSON format, which is a common data format used in web APIs.

## API Endpoints

### Get Missions

Endpoint: `/api/missions` Method: GET

This endpoint allows you to retrieve a list of missions available in the game. Missions are challenges or tasks that players can undertake to progress in the game. When you send a GET request to this endpoint, the API will respond with a JSON array containing the mission data.

### Get Bounties

Endpoint: `/api/bounties` Method: GET

Bounties are special missions that offer higher rewards and are typically more challenging. This endpoint allows you to retrieve a list of bounties available in the game. When you send a GET request to this endpoint, the API will respond with a JSON array containing the bounty data.

### Get Leaderboards

Endpoint: `/api/leaderboards` Method: GET

Leaderboards track and display the top-performing players in the game based on various criteria, such as points or achievements. This endpoint allows you to retrieve the leaderboard data. When you send a GET request to this endpoint, the API will respond with a JSON array containing the leaderboard data, sorted in descending order.

### Get NFTs

Endpoint: `/api/nfts` Method: GET

NFTs (Non-Fungible Tokens) are unique digital assets that can be owned and traded. This endpoint allows you to retrieve a list of NFTs available in the game. When you send a GET request to this endpoint, the API will respond with a JSON array containing the NFT data.

### Get Upcoming Missions

Endpoint: `/api/upcoming-missions` Method: GET

Upcoming missions are missions that will be available in the game in the near future. This endpoint allows you to retrieve a list of upcoming missions. When you send a GET request to this endpoint, the API will respond with a JSON array containing the upcoming mission data.

### Create User

Endpoint: `/api/users` Method: POST

This endpoint allows players to create a new user account in the game. To create a user, you need to send a POST request to this endpoint with the required user data in the request body. The API will validate the user data and create a new user account. If successful, the API will respond with a success message and the user data.

### User Login

Endpoint: `/api/login` Method: POST

Once players have created a user account, they can use this endpoint to log in to the game. To log in, players need to send a POST request to this endpoint with their username and password in the request body. The API will validate the credentials and generate an authentication cookie. If the login is successful, the API will respond with a success message.

### User Dashboard

Endpoint: `/dashboard` Method: GET

The user dashboard is a web page that provides an overview of the player's progress, achievements, and other relevant information. This endpoint allows authenticated users to access their dashboard. When a user sends a GET request to this endpoint, the API will respond with the user's dashboard page.

### Get User Profile

Endpoint: `/api/users/:userId` Method: GET

This endpoint allows you to retrieve the profile of a specific user. You need to provide the user ID as a parameter in the URL. When you send a GET request to this endpoint, the API will respond with the user's profile data, including information such as username, name, age, gender, skills, hobbies, and more.

### Search Missions

Endpoint: `/api/search` Method: GET

Sometimes players want to find missions or upcoming missions related to specific keywords. This endpoint allows you to search for missions based on keywords. You need to provide the query as a parameter in the URL. When you send a GET request to this endpoint, the API will respond with a JSON array containing the search results.

### Add Mission to User

Endpoint: `/api/addmission` Method: POST

When a player wants to start a mission, you can use this endpoint to add the mission to the player's ongoing missions. You need to send a POST request to this endpoint with the mission ID and the player ID in the request body. The API will update the user's ongoing missions and respond with a success message.

### Complete Mission

Endpoint: `/api/completemission` Method: POST

When a player completes a mission, you can use this endpoint to mark the mission as completed for the player. You need to send a POST request to this endpoint with the mission ID and the player ID in the request body. The API will update the user's completed missions and respond with a success message.

### Update Leaderboard

Endpoint: `/api/leaderboards` Method: POST

If you want to update the leaderboard with new data, you can use this endpoint. You need to send a POST request to this endpoint with the leaderboard data in the request body. The API will append the new data to the existing leaderboard and respond with a success message.

----------

That concludes the overview of the  Game API and its endpoints. You can use these endpoints to build game features and provide a seamless gaming experience to your players. If you have any further questions or need assistance, please feel free to reach out. Happy gaming!