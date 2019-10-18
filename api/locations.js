const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('locations ya dude');
});

module.exports = router;
