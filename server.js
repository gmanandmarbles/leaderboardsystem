const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const { Magic } = require('@magic-sdk/admin');

const mAdmin = new Magic('sk_live_7A22E2EBF2AD1AA7'); // ✨
const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(cors());
const magic = new Magic("pk_live_D3E55D2DC0F2D6C3", {
  network: 'mainnet'
});


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
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    // Update the password with the hashed version
    newUser.password = hashedPassword;

    // Add the new user to the users array
    users.push(newUser);

    // Save the updated users array to the JSON file
    fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing users file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    console.log('User registration successful:', newUser);
    
    res.json({ message: 'User registration successful' });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  console.log('Received login request:', req.body);

  const { username, password } = req.body;

  // Check if the user exists
  const user = users.find((user) => user.username === username);
  if (!user) {
    console.log('User not found');
    return res.status(404).json({ error: 'User not found' });
  }
  // Check if the password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.log('Invalid password');
    return res.status(401).json({ error: 'Invalid password' });
  }

  console.log('Login successful');
  res.cookie('userId', user.id, {
    maxAge: 24 * 60 * 60 * 1000, // Set the cookie expiration time (e.g., 24 hours)
  });
  res.json({ message: 'Login successful' });
});

// Load users from the JSON file on server start
fs.readFile('./users.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading users file:', err);
  } else {
    users = JSON.parse(data);
    console.log('Users loaded successfully');
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
app.get('/magic', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'magicAuth.html'));
});
app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'callback.html'));
});
app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'logout.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
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

  // Add the mission ID to the user's ongoingMissions array
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
app.post('/api/bounties', (req, res) => {
  const newBounty = req.body;

  // Read the bounties from the JSON file
  const bounties = JSON.parse(fs.readFileSync('./bounties.json'));

  // Assign a unique ID to the new bounty
  newBounty.id = uuidv4();

  // Add the new bounty to the bounties array
  bounties.push(newBounty);

  // Save the updated bounties array to the JSON file
  fs.writeFileSync('./bounties.json', JSON.stringify(bounties, null, 2));

  res.json({ message: 'Bounty added successfully', bounty: newBounty });
});
app.post('/api/missions', (req, res) => {
  const newMission = req.body;

  // Read the missions from the JSON file
  const missions = JSON.parse(fs.readFileSync('./missions.json'));

  // Assign a unique ID to the new mission
  newMission.id = uuidv4();

  // Add the new mission to the missions array
  missions.push(newMission);

  // Save the updated missions array to the JSON file
  fs.writeFileSync('./missions.json', JSON.stringify(missions, null, 2));

  res.json({ message: 'Mission added successfully', mission: newMission });
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


app.post('/api/nfts', (req, res) => {
  const newNFT = req.body;

  // Read the NFTs from the JSON file
  const nfts = JSON.parse(fs.readFileSync('./nfts.json'));

  // Assign a unique ID to the new NFT
  newNFT.id = uuidv4();

  // Add the new NFT to the NFTs array
  nfts.push(newNFT);

  // Save the updated NFTs array to the JSON file
  fs.writeFileSync('./nfts.json', JSON.stringify(nfts, null, 2));

  res.json({ message: 'NFT added successfully', nft: newNFT });
});

app.get('/api/upcoming-missions', (req, res) => {
  const upcomingMissions = JSON.parse(fs.readFileSync('./upcomingMissions.json'));
  res.json(upcomingMissions);
});

app.post('/api/upcoming-missions', (req, res) => {
  const newMission = req.body;

  // Read the upcoming missions from the JSON file
  const upcomingMissions = JSON.parse(fs.readFileSync('./upcomingMissions.json'));

  // Assign a unique ID to the new mission
  newMission.id = uuidv4();

  // Add the new mission to the upcoming missions array
  upcomingMissions.push(newMission);

  // Save the updated upcoming missions array to the JSON file
  fs.writeFileSync('./upcomingMissions.json', JSON.stringify(upcomingMissions, null, 2));

  res.json({ message: 'Upcoming mission added successfully', mission: newMission });
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
