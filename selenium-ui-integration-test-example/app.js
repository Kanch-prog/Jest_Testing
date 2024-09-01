const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let users = [];

// Render the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Handle user registration
app.post('/register', (req, res) => {
    const { username } = req.body;
    if (users.includes(username)) {
        return res.status(400).send('Username already exists');
    }
    users.push(username);
    res.send(`User ${username} registered successfully`);
});

// Handle user login
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!users.includes(username)) {
        return res.status(400).send('Invalid username');
    }
    res.send(`User ${username} logged in successfully`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
