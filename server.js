const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(cors());
const axios = require('axios');

// LootLocker API Configuration
const domainKey = '8o396rj8';
const isDevelopment = false;

// API endpoints
app.get('/api/missions', (req, res) => {
  const missions = JSON.parse(fs.readFileSync('./missions.json'));
  res.json(missions);
});

app.get('/api/bounties', (req, res) => {
  const bounties = JSON.parse(fs.readFileSync('./bounties.json'));
  res.json(bounties);
});

app.get('/api/leaderboards', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./leaderboards.json'));
  const sortedUsers = users.sort((a, b) => b.points - a.points);
  res.json(sortedUsers);
});

app.get('/api/nfts', (req, res) => {
  const nfts = JSON.parse(fs.readFileSync('./nfts.json'));
  res.json(nfts);
});


app.get('/api/upcoming-missions', (req, res) => {
  const upcomingMissions = JSON.parse(fs.readFileSync('./upcomingMissions.json'));
  res.json(upcomingMissions);
});

// Initialize users as an empty array
let users = [];

app.post('/api/users', async (req, res) => {
  console.log('Received user registration request:', req.body);

  const newUser = req.body;

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === newUser.username);
  if (existingUser) {
    console.log('Username already exists');
    return res.status(409).json({ error: 'Username already exists' });
  }

  try {
    // Sign up the user with LootLocker API
    console.log('Signing up user with LootLocker API');
    const signUpUrl = 'https://api.lootlocker.io/white-label-login/sign-up';
    const signUpPayload = {
      email: newUser.username,
      password: newUser.password,
    };
    const signUpHeaders = {
      'domain-key': domainKey,
      'is-development': isDevelopment.toString(),
    };

    try {
      const signUpResponse = await axios.post(signUpUrl, signUpPayload, { headers: signUpHeaders });
      console.log('LootLocker user sign up successful:', signUpResponse.data);

      // Update the newUser object with LootLocker user ID
      newUser.id = signUpResponse.data.id;

      // Add the new user to the users array
      users.push(newUser);

      // Save the updated users array to the JSON file
      fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

      console.log('User registration successful:', newUser);

      // Log the data being sent to LootLocker
      console.log('Data sent to LootLocker:', {
        email: req.body.username,
        password: req.body.password,
        remember: true,
      });

      // Send additional CURL request
      const lootLockerLoginUrl = 'https://api.lootlocker.io/white-label-login/login';
      const lootLockerLoginPayload = {
        email: req.body.username,
        password: req.body.password,
        remember: true,
      };

      const lootLockerLoginHeaders = {
        'domain-key': domainKey,
        'is-development': isDevelopment.toString(),
        'Content-Type': 'application/json',
      };

      axios
        .post(lootLockerLoginUrl, lootLockerLoginPayload, { headers: lootLockerLoginHeaders })
        .then((response) => {
          console.log('LootLocker login successful:', response.data);
          // Handle successful login here

          // Send success message and status number
          res.status(200).json({
            message: 'LootLocker login successful',
            status: 200,
            lootLockerData: response.data,
          });

          // Additional code to be executed after sending the response
          // ...

        })
        .catch((error) => {
          console.error('LootLocker login failed:', error.response.data);
          // Handle login error here
          res.status(500).json({
            message: 'LootLocker login failed',
            status: 500,
            error: error.response.data,
          });

          // Additional code to be executed after sending the response
          // ...
        });
    } catch (error) {
      console.error('LootLocker user sign up failed:', error);
      res.status(500).json({ error: 'Failed to sign up user' });

      // Additional code to be executed after sending the response
      // ...
    }
  } catch (error) {
    console.error('User registration failed:', error);
    res.status(500).json({ error: 'Failed to sign up user' });
  }
});


app.post('/api/login', async (req, res) => {
  console.log('Received login request:', req.body);

  const { username, password } = req.body;

  try {
    // Log in the user with LootLocker API
    console.log('Logging in user with LootLocker API');
    const loginUrl = 'https://api.lootlocker.io/white-label-login/login';
    const loginPayload = {
      email: username,
      password: password,
      remember: true,
    };
    const loginHeaders = {
      'domain-key': domainKey,
      'is-development': isDevelopment.toString(),
      'Content-Type': 'application/json',
    };

    const loginResponse = await axios.post(loginUrl, loginPayload, { headers: loginHeaders });

    // Set the authentication cookie
    res.cookie('authenticated', true);
    res.cookie('userId', loginResponse.data.id);

    console.log('Login successful');
    res.status(200).json({ success: 'Login successful' });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/dashboard', (req, res) => {
  const userId = req.cookies.userId;
  const users = JSON.parse(fs.readFileSync('./users.json'));
  const user = users.find((user) => user.id === userId);

  if (!user) {
    console.log('User not found');
    return res.status(404).json({ error: 'User not found' });
  }

  res.render('dashboard', { user });
});

app.get('/api/users/:userId', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./users.json'));
  const userId = req.params.userId;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    console.log('User not found');
    return res.status(404).json({ error: 'User not found' });
  }

  const { id, username, name, age, gender, skills, hobbies, school, residentialArea, passionateAbout, avatar } = user;
  const userProfile = { id, username, name, age, gender, skills, hobbies, school, residentialArea, passionateAbout, avatar };

  res.json(userProfile);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/missions', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'missions.html'));
});
app.get('/nft', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'nft.html'));
});
app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'leaderboard.html'));
});

app.get('/api/search', (req, res) => {
  const { query } = req.query;
  const missions = JSON.parse(fs.readFileSync('./missions.json'));
  const upcomingMissions = JSON.parse(fs.readFileSync('./upcomingMissions.json'));

  // Filter missions based on matching keywords
  const filteredMissions = missions.filter((mission) =>
    mission.keywords.some((keyword) => keyword.includes(query))
  );

  // Filter upcoming missions based on matching keywords
  const filteredUpcomingMissions = upcomingMissions.filter((mission) =>
    mission.keywords.some((keyword) => keyword.includes(query))
  );

  // Combine the filtered results
  const searchResults = [...filteredMissions, ...filteredUpcomingMissions];

  res.json(searchResults);
});

app.post('/api/addmission', (req, res) => {
  const { missionId, playerId } = req.body;

  // Read the users from the JSON file
  const users = JSON.parse(fs.readFileSync('./users.json'));

  // Find the user by ID
  const user = users.find((user) => user.id === playerId);

  if (!user) {
    console.log('Player not found');
    return res.status(404).json({ error: 'Player not found' });
  }

  // Add the mission ID to the user's completedMissions array
  user.ongoingMissions.push(missionId);

  // Save the updated users array to the JSON file
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

  res.json({ message: 'Mission added to player' });
});

app.post('/api/completemission', (req, res) => {
  const { missionId, playerId } = req.body;

  // Read the users from the JSON file
  let users = JSON.parse(fs.readFileSync('./users.json'));

  // Find the user by ID
  const userIndex = users.findIndex((user) => user.id === playerId);

  if (userIndex === -1) {
    console.log('Player not found');
    return res.status(404).json({ error: 'Player not found' });
  }

  // Add the mission ID to the user's completedMissions array
  if (!users[userIndex].completedMissions) {
    users[userIndex].completedMissions = []; // Initialize completedMissions array if it doesn't exist
  }
  users[userIndex].completedMissions.push(missionId);

  // Save the updated users array to the JSON file
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

  res.json({ message: 'Mission added to player' });
});

app.post('/api/leaderboards', (req, res) => {
  const leaderboardData = req.body;

  // Assuming the leaderboardData is an array of leaderboard entries

  // Read the existing leaderboard data from a file or database
  const existingData = JSON.parse(fs.readFileSync('./leaderboards.json'));

  // Append the new data to the existing leaderboard
  const updatedData = existingData.concat(leaderboardData);

  // Update the leaderboard in the server's memory or database
  fs.writeFileSync('./leaderboards.json', JSON.stringify(updatedData, null, 2));

  // Send a success response
  res.json({ message: 'Leaderboard updated successfully' });
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
