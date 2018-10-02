const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ "title": "Hello, i`m bucketfucker" }))

module.exports = router;
