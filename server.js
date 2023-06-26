const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Middleware
app.use(bodyParser.json());

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
  const users = JSON.parse(fs.readFileSync('./users.json'));
  const sortedUsers = users.sort((a, b) => b.points - a.points);
  res.json(sortedUsers);
});

app.get('/api/nfts', (req, res) => {
  const user = JSON.parse(fs.readFileSync('./users.json')).find(
    (user) => user.name === 'John Doe'
  );
  const earnedNFTs = JSON.parse(fs.readFileSync('./nfts.json')).filter((nft) =>
    user.earnedNFTs.includes(nft.id)
  );
  res.json(earnedNFTs);
});

app.get('/api/upcoming-missions', (req, res) => {
  const upcomingMissions = JSON.parse(
    fs.readFileSync('./upcomingMissions.json')
  );
  res.json(upcomingMissions);
});

app.post('/api/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./users.json'));
  const newUser = req.body;

  // Assign a unique ID to the new user (You can use a UUID generator library for this)
  newUser.id = generateUniqueId();

  // Add the new user to the users array
  users.push(newUser);

  // Save the updated users array to the JSON file
  fs.writeFileSync('./users.json', JSON.stringify(users));

  res.json(newUser);
});
app.get('/api/users/:userId', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./users.json'));
  const userId = req.params.userId;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
