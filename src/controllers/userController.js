
const fs = require('fs');

const registerUser = (req, res) => {
  const { username, password, fullName, age, email, gender } = req.body;

  // Validatsiya
  if (username.length < 3 || password.length < 5 || age < 10) {
    return res.status(400).send('Invalid input data');
  }

  fs.readFile('database/users.json', (err, data) => {
    if (err) return res.status(500).send('Database error');
    const users = JSON.parse(data);

    // Username yoki email noyobligini tekshirish
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = {
      id: users.length + 1,
      username,
      password,
      fullName,
      age,
      email,
      gender
    };

    users.push(newUser);
    fs.writeFile('database/users.json', JSON.stringify(users), (err) => {
      if (err) return res.status(500).send('Error saving user');
      res.status(201).send('User registered successfully');
    });
  });
};

const getUserProfile = (req, res) => {
  const { username, email } = req.params;

  fs.readFile('database/users.json', (err, data) => {
    if (err) return res.status(500).send('Database error');
    const users = JSON.parse(data);

    const user = users.find(u => u.username === username || u.email === email);
    if (!user) return res.status(404).send('User not found');
    
    res.status(200).json(user);
  });
};

const updateUserProfile = (req, res) => {
  const { username } = req.params;
  const { fullName, age, email, gender } = req.body;

  fs.readFile('database/users.json', (err, data) => {
    if (err) return res.status(500).send('Database error');
    const users = JSON.parse(data);

    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).send('User not found');
    
    user.fullName = fullName || user.fullName;
    user.age = age || user.age;
    user.email = email || user.email;
    user.gender = gender || user.gender;

    fs.writeFile('database/users.json', JSON.stringify(users), (err) => {
      if (err) return res.status(500).send('Error saving user');
      res.send('Profile updated successfully');
    });
  });
};

const deleteUserProfile = (req, res) => {
  const { username, email } = req.params;

  fs.readFile('database/users.json', (err, data) => {
    if (err) return res.status(500).send('Database error');
    let users = JSON.parse(data);

    const userIndex = users.findIndex(u => u.username === username || u.email === email);
    if (userIndex === -1) return res.status(404).send('User not found');

    users.splice(userIndex, 1);
    fs.writeFile('database/users.json', JSON.stringify(users), (err) => {
      if (err) return res.status(500).send('Error deleting user');
      res.send('Profile deleted successfully');
    });
  });
};

module.exports = { registerUser, getUserProfile, updateUserProfile, deleteUserProfile };
