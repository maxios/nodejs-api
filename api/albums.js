const router = require('express').Router();
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const BASE_URL = 'https://sheikhalamoud.org';
const ALBUM_BASE_PATH = '../sheikhalamoud/dist/sheikh/static/albums';

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)
const getFiles = source => readdirSync(source).map(name => join(source, name))
const getLastInUri = uri => uri.split('/').pop();


const albums = getDirectories(ALBUM_BASE_PATH).map(getLastInUri);
const photos = album_name => getFiles(`${ALBUM_BASE_PATH}/${album_name}`)
  .map(file => `${BASE_URL}/static/albums/${album_name}/${file.split('/').pop()}`);

// get albums names
router.get('/', (req, res) => {
  res.json(albums);
});

// Get all Photos
router.get('/photos', (req, res) => {
  const allPhotos = albums.map(photos).flat();

  res.json(allPhotos);
})

// Get photos in one album
router.get('/:album_name', (req, res) => {
  const { album_name } = req.params;

  res.json(photos(album_name))
})

module.exports = router;

