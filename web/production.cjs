const express = require('express');
const morgan = require('morgan');

// Initialize the app
const app = express();

// Middleware
app.use(morgan('common')); // Logging

// Routes to handle all requests (SPA)
const response = (req, res) => {
  res.set('X-Date', new Date().toISOString());
  res.set('X-Revision', process.env.GIT_COMMIT_ID || 'Unknown');
  res.set('X-Revision', commitHash); 
  res.set('Document-Policy', 'js-profiling');

  res.sendFile(__dirname + '/dist/index.html');
};

app.get('/', response);
app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, response);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Running on: http://localhost:${PORT}/`);
});
