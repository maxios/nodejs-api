const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('systems ya dude');
});

module.exports = router;
