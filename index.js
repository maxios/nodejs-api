require('module-alias/register');
const express = require('express');

const routes = require('./api');

const app = express();
const PORT = 8080;

app.use('/sessions', routes.sessions);
app.use('/instructors', routes.instructors);
app.use('/systems', routes.systems);
app.use('/locations', routes.locations);
app.use('/sciences', routes.sciences);
app.use('/tags', routes.tags);
app.use('/faqs', routes.faqs);

app.listen(PORT, () => console.log(`listenting on port ${PORT}...`)).on('error', console.log);

app.get('/howdy', function(e, r) {
  r.send('api call successfully responded to you!');
});
