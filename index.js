// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// Middleware to parse JSON
app.use(express.json());

// Route to handle /api/:date? endpoint
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let parsedDate;

  if (!date) {
    // No date provided, return the current time
    parsedDate = new Date();
  } else {
    // Try to parse the provided date
    if (!isNaN(date)) {
      // If it's a number, treat it as a Unix timestamp
      parsedDate = new Date(parseInt(date));
    } else {
      // Otherwise, try to parse it as a regular date string
      parsedDate = new Date(date);
    }
  }

  if (parsedDate.toString() === 'Invalid Date') {
    // Return error for invalid dates
    res.json({ error: 'Invalid Date' });
  } else {
    // Return Unix timestamp and UTC string for valid dates
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString(),
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


