require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./api');

const app = express();
const PORT = 8081;

// CORS enabled
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sessions', routes.sessions);
app.use('/api/instructors', routes.instructors);
app.use('/api/systems', routes.systems);
app.use('/api/locations', routes.locations);
app.use('/api/sciences', routes.sciences);
app.use('/api/tags', routes.tags);
app.use('/api/faqs', routes.faqs);

// boot the server
app.listen(PORT, () => console.log(`listenting on port ${PORT}...`)).on('error', console.log);

// test api gateway
app.get('/howdy', function(e, r) {
  r.send('api call successfully responded to you!');
});
