
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

## Unity API calls

1.  Retrieve Missions:

csharpCopy code

`IEnumerator RetrieveMissions()
{
    UnityWebRequest www = UnityWebRequest.Get("http://api.example.com/api/missions");
    yield return www.SendWebRequest();

    if (www.result == UnityWebRequest.Result.Success)
    {
        string response = www.downloadHandler.text;
        // Process the response data
    }
    else
    {
        Debug.Log("Error retrieving missions: " + www.error);
    }
}` 

2.  Retrieve Bounties:

csharpCopy code

`IEnumerator RetrieveBounties()
{
    UnityWebRequest www = UnityWebRequest.Get("http://api.example.com/api/bounties");
    yield return www.SendWebRequest();

    if (www.result == UnityWebRequest.Result.Success)
    {
        string response = www.downloadHandler.text;
        // Process the response data
    }
    else
    {
        Debug.Log("Error retrieving bounties: " + www.error);
    }
}` 

3.  Retrieve Leaderboards:

csharpCopy code

`IEnumerator RetrieveLeaderboards()
{
    UnityWebRequest www = UnityWebRequest.Get("http://api.example.com/api/leaderboards");
    yield return www.SendWebRequest();

    if (www.result == UnityWebRequest.Result.Success)
    {
        string response = www.downloadHandler.text;
        // Process the response data
    }
    else
    {
        Debug.Log("Error retrieving leaderboards: " + www.error);
    }
}` 

4.  Retrieve NFTs:

csharpCopy code

`IEnumerator RetrieveNFTs()
{
    UnityWebRequest www = UnityWebRequest.Get("http://api.example.com/api/nfts");
    yield return www.SendWebRequest();

    if (www.result == UnityWebRequest.Result.Success)
    {
        string response = www.downloadHandler.text;
        // Process the response data
    }
    else
    {
        Debug.Log("Error retrieving NFTs: " + www.error);
    }
}` 

5.  Retrieve Upcoming Missions:

csharpCopy code

`IEnumerator RetrieveUpcomingMissions()
{
    UnityWebRequest www = UnityWebRequest.Get("http://api.example.com/api/upcoming-missions");
    yield return www.SendWebRequest();

    if (www.result == UnityWebRequest.Result.Success)
    {
        string response = www.downloadHandler.text;
        // Process the response data
    }
    else
    {
        Debug.Log("Error retrieving upcoming missions: " + www.error);
    }
}` 

Please note that you need to replace "[http://api.example.com](http://api.example.com/)" with the actual base URL of your server. Also, make sure to handle the response data according to your requirements within the respective `if (www.result == UnityWebRequest.Result.Success)` block.

## /api/users

Endpoint: /api/users
Method: POST
Parameters:

lootlockerId (required): The LootLocker ID of the user.
Description:
This API endpoint is used to retrieve user data based on their LootLocker ID. It allows you to fetch information about a specific user in your application.

Request Example:

csharp
Copy code
IEnumerator RetrieveUserData(string lootlockerId)
{
    string url = "http://api.example.com/api/users";
    
    WWWForm form = new WWWForm();
    form.AddField("lootlockerId", lootlockerId);

    UnityWebRequest www = UnityWebRequest.Post(url, form);
    yield return www.SendWebRequest();

    if (www.result == UnityWebRequest.Result.Success)
    {
        string response = www.downloadHandler.text;
        // Process the response data
    }
    else
    {
        Debug.Log("Error retrieving user data: " + www.error);
    }
}
Response:
The response will contain the user data in a JSON format. The specific structure and fields of the response will depend on your application's user system. You can parse the JSON response to extract the required information.

Example Response:

json
Copy code
{
    "userId": "123456789",
    "username": "JohnDoe",
    "level": 10,
    "coins": 500,
    "inventory": [
        {
            "itemId": "987654321",
            "itemName": "Sword",
            "itemType": "Weapon"
        },
        {
            "itemId": "456789123",
            "itemName": "Shield",
            "itemType": "Armor"
        }
    ],
    "achievements": [
        {
            "achievementId": "789123456",
            "achievementName": "Master of the Sword",
            "progress": 50,
            "totalProgress": 100
        }
    ]
}
Error Handling:
If there is an error in retrieving the user data, the API will return an appropriate error response. Make sure to handle the error cases properly and provide appropriate feedback to the user or take necessary actions in your application.

Please note that you need to replace "http://api.example.com" with the actual base URL of your server. Additionally, customize the request and response handling according to your application's requirements.


# Setting up


Sure! Here are the instructions to set up the server and a list of endpoints that connect to an HTML page:

Install Node.js:

Go to the official Node.js website (https://nodejs.org).
Download the appropriate installer for your operating system.
Run the installer and follow the installation instructions.
Create a new directory for your server project.

Open a terminal or command prompt and navigate to the directory you created.

Initialize a new Node.js project:

```
npm init
Follow the prompts to initialize the project and create a package.json file.
```
Install the required dependencies by running the following command:

```
npm install express cors body-parser fs path ejs bcryptjs cookie-parser axios
Create a new file named server.js in your project directory.
```

Copy and paste the provided code into the server.js file.

Create the required JSON files:

Create an empty users.json file.
Create missions.json, bounties.json, leaderboards.json, nfts.json, and upcomingMissions.json files with appropriate data.
Customize the HTML files:

Create the following HTML files in the views directory:
login.html
index.html
missions.html
nft.html
leaderboard.html
Customize these HTML files with your desired content.
Start the server:

Copy code
node server.js
The server should now be running on http://localhost:3000. You can access the HTML pages and interact with the API endpoints.

List of API Endpoints:

GET /api/missions: Retrieves the missions from missions.json.
GET /api/bounties: Retrieves the bounties from bounties.json.
GET /api/leaderboards: Retrieves the leaderboard data from leaderboards.json.
GET /api/nfts: Retrieves the NFTs from nfts.json.
GET /api/upcoming-missions: Retrieves the upcoming missions from upcomingMissions.json.
POST /api/users: Registers a new user and saves their information in users.json.
POST /api/login: Logs in a user by checking their credentials against the data in users.json.
GET /api/users/:userId: Retrieves the user profile based on the provided userId.
GET /api/search?query=<search_query>: Searches for missions and upcoming missions based on the provided query parameter.
POST /api/addmission: Adds a mission to a player's ongoingMissions array in users.json.
POST /api/completemission: Adds a mission to a player's completedMissions array in users.json.
POST /api/leaderboards: Updates the leaderboard data by appending the provided data to leaderboards.json.
These endpoints handle various functionalities like retrieving data, user registration and login, user profile retrieval, search, and updating leaderboard data. You can customize the functionality and endpoints according to your specific needs.

