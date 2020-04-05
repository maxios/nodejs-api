const router = require('express').Router();
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)

// GET all Records
router.get('/', (req, res) => {
  const dirNames = getDirectories('../../sheikhalamoud/dist/sheikh/static/albums/')
  res.json(dirNames);
});

module.exports = router;

