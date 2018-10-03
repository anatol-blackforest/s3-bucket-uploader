const express = require('express');
const router = express.Router();
const uploader = require('../controllers/uploader');
const geter = require('../controllers/geter');
const thumbinator = require('../controllers/thumbinator');
const renderer = require('../controllers/renderer');
const bucketController = require('../controllers/bucket');

router.get('/:img', geter);
// router.post('/', uploader, thumbinator, renderer);
router.post('/', bucketController);

module.exports = router;
