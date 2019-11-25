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
app.use('/apis/sessions', routes.sessions);
app.use('/apis/instructors', routes.instructors);
app.use('/apis/systems', routes.systems);
app.use('/apis/locations', routes.locations);
app.use('/apis/sciences', routes.sciences);
app.use('/apis/tags', routes.tags);
app.use('/apis/faqs', routes.faqs);
app.use('/apis/search', routes.search);

// boot the server
app.listen(PORT, () => console.log(`listenting on port ${PORT}...`)).on('error', console.log);

// test api gateway
app.get('/apis/howdy', function(e, r) {
  r.send('api call successfully responded to you!');
});
