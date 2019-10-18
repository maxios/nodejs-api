const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('instructors ya dude');
});

module.exports = router;
