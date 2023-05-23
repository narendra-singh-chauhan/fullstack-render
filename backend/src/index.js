/* eslint-disable no-undef */
// packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';


// _mock
const account = {
  firstName: 'Narendra',
  lastName: 'Singh',
  email: 'narendrasingh@gmail.com',
  mobile: '+91 6378949412',
  age: 22,
  designation: 'Mern Stack Developer',
};

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// configs
dotenv.config();
const app = express();
const PORT = 3000;
app.use(cors());

// production
if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the frontend build directory
  app.use(express.static(path.join(__dirname, '../dist')));

  // For all other routes, serve the frontend index.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'), function (error) {
      if (error) {
        res.status(400).json({ err: error });
      }
    });
  });
}

// routes
app.get('/account', (req, res) => {
  res.status(200).json(account);
});

// development
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// listen
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});