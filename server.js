const express           = require('express');
const connectDB         = require('./config/db');
const path              = require('path');
const configServerSubFolder = require('./configServerSubFolder');

const app = express();

// Connect database
connectDB();

// Init Middleware - body data now body-parser is a part of the express
app.use(express.json({ extended: false }))

const currBaseUrl = configServerSubFolder.baseUrl;
console.log(currBaseUrl)
// Define Routes
app.use(`${currBaseUrl}/api/users`, require('./routes/users'));
app.use(`${currBaseUrl}/api/auth`, require('./routes/auth'));
app.use(`${currBaseUrl}/api/contacts`, require('./routes/contacts')); 

/*
// Serve static assets in production == serve React in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder ==> client/build folder of React
  app.use(express.static('client/build'));

  // app.get('*') mean any route except routes specified above
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
