require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./api');

const app = express();
const PORT = 8080;

// CORS enabled
app.use(cors());
app.use(express.json());

// Routes
app.use('/sessions', routes.sessions);
app.use('/instructors', routes.instructors);
app.use('/systems', routes.systems);
app.use('/locations', routes.locations);
app.use('/sciences', routes.sciences);
app.use('/tags', routes.tags);
app.use('/faqs', routes.faqs);

// boot the server
app.listen(PORT, () => console.log(`listenting on port ${PORT}...`)).on('error', console.log);

// test api gateway
app.get('/howdy', function(e, r) {
  r.send('api call successfully responded to you!');
});
