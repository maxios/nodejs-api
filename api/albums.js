const router = require('express').Router();
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const BASE_URL = 'https://sheikhalamoud.com';
const ALBUM_BASE_PATH = '../sheikhalamoud/dist/sheikh/static/albums';
const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)

const getFiles = source =>
  readdirSync(source).map(name => join(source, name))

// GET all Records
router.get('/', (req, res) => {
  const dirNames = getDirectories(ALBUM_BASE_PATH)
  res.json(dirNames);
});

router.get('/:album_name', (req, res) => {
  const { album_name } = req.params;
  const files = getFiles(`${ALBUM_BASE_PATH}/${album_name}`)
    .map(file => `https://${BASE_URL}/static/albums/${album_name}/${file.split('/').pop()}`);

  res.json(files)
})

module.exports = router;

