const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Add this line
const app = express();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Middleware
app.use(bodyParser.json());
app.use(cors());

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

app.get('/api/upcoming-missions', (req, res) => {
  const upcomingMissions = JSON.parse(
    fs.readFileSync('./upcomingMissions.json')
  );
  res.json(upcomingMissions);
});

// Initialize users as an empty array
let users = [];

app.post('/api/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./users.json'));
  const newUser = req.body;

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === newUser.username);
  if (existingUser) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  // Assign a unique ID to the new user
  newUser.id = uuidv4();

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(newUser.password, saltRounds);
  newUser.password = hashedPassword;

  // Add the new user to the users array
  users.push(newUser);

  // Save the updated users array to the JSON file
  fs.writeFileSync('./users.json', JSON.stringify(users));

  res.json(newUser);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync('./users.json'));

  // Find user by username
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Check password
  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Set the authentication cookie
  res.cookie('authenticated', true);
  res.cookie('userId', user.id);

  res.status(200).json({Success: 'YAY!'});
  
});

app.get('/dashboard', (req, res) => {
  const userId = req.cookies.userId;
  const users = JSON.parse(fs.readFileSync('./users.json'));
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Render the dashboard page with the user's data
  res.render('dashboard', { user });
});

app.get('/api/users/:userId', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./users.json'));
  const userId = req.params.userId;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Create a new object with selected properties
  const { id, username, name, age, gender, skills, hobbies, school, residentialArea, passionateAbout, avatar } = user;
  const userProfile = { id, username, name, age, gender, skills, hobbies, school, residentialArea, passionateAbout, avatar };

  res.json(userProfile);
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Serve the index page
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
