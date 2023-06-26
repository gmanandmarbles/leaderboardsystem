const fs = require('fs');
const mysql = require('mysql');

// Create a connection pool to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'web',
  password: 'web',
  database: 'web',
});

// Read the existing users data from the users.json file
const existingUsersData = fs.readFileSync('./users.json', 'utf8');
let existingUsers = JSON.parse(existingUsersData);

// Function to fetch user data from the database
function fetchUserData() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM accounts', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to synchronize the database with the JSON file
async function syncDatabaseWithJSON() {
  try {
    // Fetch user data from the database
    const dbUsers = await fetchUserData();

    // Convert the fetched user data to an object for easy lookup
    const dbUsersMap = {};
    dbUsers.forEach((user) => {
      dbUsersMap[user.id] = user;
    });

    // Iterate over the existing users and synchronize with the database
    existingUsers = existingUsers.map((user) => {
      const dbUser = dbUsersMap[user.id];

      if (dbUser) {
        // User exists in the database, update the user
        const { id, username, password, email, bounties, leaderboardPosition, missions, nfts } = user;
        const query = `UPDATE accounts SET username = '${username}', password = '${password}', email = '${email}', bounties = '${JSON.stringify(bounties)}', leaderboardPosition = ${leaderboardPosition}, missions = '${JSON.stringify(missions)}', nfts = '${JSON.stringify(nfts)}' WHERE id = ${id}`;

        pool.query(query, (err) => {
          if (err) {
            console.error(`Error updating user ${id} in the database:`, err);
          }
        });

        return user; // Return the existing user
      } else {
        // User doesn't exist in the database, insert the user
        const { id, username, password, email, bounties, leaderboardPosition, missions, nfts } = user;
        const query = `INSERT INTO accounts (id, username, password, email, bounties, leaderboardPosition, missions, nfts) VALUES (${id}, '${username}', '${password}', '${email}', '${JSON.stringify(bounties)}', ${leaderboardPosition}, '${JSON.stringify(missions)}', '${JSON.stringify(nfts)}')`;

        pool.query(query, (err) => {
          if (err) {
            console.error(`Error inserting user ${id} into the database:`, err);
          }
        });

        return user; // Return the existing user
      }
    });

    console.log('Database synchronized with the JSON file.');

    // After synchronizing, update the JSON file with the latest data
    syncJSONWithDatabase();
  } catch (err) {
    console.error('Error retrieving user data from the database:', err);
  }
}

// Function to synchronize the JSON file with the database
// Function to synchronize the JSON file with the database
function syncJSONWithDatabase() {
    const updatedUsersData = JSON.stringify(existingUsers);
    fs.appendFileSync('./users.json', updatedUsersData, (err) => {
      if (err) {
        console.error('Error appending to users.json:', err);
      } else {
        console.log('JSON file synchronized with the database.');
      }
    });
  }
  

// Perform initial synchronization on startup
syncDatabaseWithJSON();

// Watch for changes in the users.json file
fs.watch('./users.json', (eventType) => {
  if (eventType === 'change') {
    const updatedUsersData = fs.readFileSync('./users.json', 'utf8');
    existingUsers = JSON.parse(updatedUsersData);

    syncDatabaseWithJSON();
  }
});
