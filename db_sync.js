const fs = require('fs');
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: '10.0.0.52',
  user: 'web',
  password: 'web',
  database: 'web',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database.');

  // Read the existing users data from the users.json file
  const existingUsersData = fs.readFileSync('./users.json', 'utf8');
  const existingUsers = JSON.parse(existingUsersData);

  // Map the existing users data to an object for easy lookup
  const existingUsersMap = {};
  existingUsers.forEach((user) => {
    existingUsersMap[user.id] = user;
  });

  // Execute the query to fetch user data
  connection.query('SELECT * FROM accounts', (err, results) => {
    if (err) {
      console.error('Error retrieving user data:', err);
      connection.end();
      return;
    }

    // Synchronize database data with the existing users
    const synchronizedUsers = results.map((row) => {
      const { id, username, password, email } = row;
      const existingUser = existingUsersMap[id];

      // Fetch bounties for the user
      const bounties = existingUser ? existingUser.bounties : []; // Use existing bounties or fetch from the database

      // Fetch leaderboard position for the user
      const leaderboardPosition = existingUser ? existingUser.leaderboardPosition : null; // Use existing position or fetch from the database

      // Fetch missions for the user
      const missions = existingUser ? existingUser.missions : []; // Use existing missions or fetch from the database

      // Fetch NFTs for the user
      const nfts = existingUser ? existingUser.nfts : []; // Use existing NFTs or fetch from the database

      return { id, username, password, email, bounties, leaderboardPosition, missions, nfts };
    });

    // Write the synchronized users data to the users.json file
    fs.writeFileSync('./users.json', JSON.stringify(synchronizedUsers));

    console.log('Users data synchronized successfully.');

    // Close the database connection
    connection.end();
  });
});

// Watch for changes in the users.json file
// Watch for changes in the users.json file
fs.watch('./users.json', (eventType) => {
    if (eventType === 'change') {
      // Read the updated users data from the users.json file
      const updatedUsersData = fs.readFileSync('./users.json', 'utf8');
      const updatedUsers = JSON.parse(updatedUsersData);
  
      // Loop through the updated users and update the corresponding database records
      updatedUsers.forEach((user) => {
        const { id, username, password, email, bounties, leaderboardPosition, missions, nfts } = user;
  
        // Update the database records with the updated user data
        const query = `
          UPDATE accounts
          SET username = '${username}', password = '${password}', email = '${email}'
          WHERE id = ${id}`;
        connection.query(query, (err, results) => {
          if (err) {
            console.error(`Error updating user ${id} in the database:`, err);
          }
        });
      });
  
      console.log('Database records updated with the changes from users.json.');
  
      // Fetch the latest data from the database after updating the records
      connection.query('SELECT * FROM accounts', (err, results) => {
        if (err) {
          console.error('Error retrieving user data:', err);
          return;
        }
  
        // Map the fetched data to the existingUsers object
        const existingUsers = results.map((row) => {
          const { id, username, password, email } = row;
          return { id, username, password, email };
        });
  
        // Write the updated user data back to the users.json file
        fs.writeFileSync('./users.json', JSON.stringify(existingUsers));
  
        console.log('Users data synchronized successfully.');
      });
    }
  });
  
    console.log('Database records updated with the changes from users.json.');
  }
});
