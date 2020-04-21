const router = require('express').Router();
const R = require('ramda');
const { lstatSync, readdirSync, statSync } = require('fs')
const { join } = require('path')

const BASE_URL = 'https://sheikhalamoud.org';
const ALBUMS_URL = `${BASE_URL}/static/albums`;
const ALBUM_BASE_PATH = '../sheikhalamoud/dist/sheikh/static/albums';

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)
const getFiles = source => readdirSync(source).map(name => join(source, name))
const getLastInUri = uri => uri.split('/').pop();


const albums = getDirectories(ALBUM_BASE_PATH).map(getLastInUri);
const photos = album_name => getFiles(`${ALBUM_BASE_PATH}/${album_name}`)
  .map(file => `${ALBUMS_URL}/${album_name}/${file.split('/').pop()}`);

/**
 * Get latest photo from the album and return its URL
 */
const getPreviewPhoto = album_name => {
  const photos_names = readdirSync(`${ALBUM_BASE_PATH}/${album_name}`);

  const photosStats = photos_names.map(photo_name => ({name: photo_name, stat: statSync(`${ALBUM_BASE_PATH}/${album_name}/${photo_name}`)}))
  const sortedPhotos = R.sortBy(R.path(['stat', 'ctime']))(photosStats)

  return `${ALBUMS_URL}/${album_name}/${sortedPhotos[0].name}`;
}

// get albums names and latest image preview
router.get('/', (req, res) => {
  const response = albums.map(album => ({name: album, preview: getPreviewPhoto(album)}))
  res.json(response);
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

