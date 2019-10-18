const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('sciences ya dude');
});

module.exports = router;
