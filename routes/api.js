const express = require('express');
const router = express.Router();
const uploader = require('../modules/uploader');
const geter = require('../modules/geter');
const thumbinator = require('../modules/thumbinator');
const renderer = require('../modules/renderer');

router.get('/:img', geter);
router.post('/', uploader, thumbinator, renderer);

module.exports = router;
