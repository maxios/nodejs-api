const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('tags ya dude');
});

module.exports = router;
