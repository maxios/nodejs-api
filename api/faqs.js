const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('faqs ya dude');
});

module.exports = router;
