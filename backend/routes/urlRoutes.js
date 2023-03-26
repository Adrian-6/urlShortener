const express = require('express');
const router = express.Router();
const urlsController = require('../controllers/urlsController');

router.route('/newEntry')
    .post(urlsController.addNewUrl)

/* router.route('/allUrls')
    .get(urlsController.getAllUrls) */

router.route('/getUrlInfo/:shortUrl')
    .get(urlsController.DisplayShortUrl)

router.route('/:shUrl')
    .get(urlsController.getShortUrl)

module.exports = router;
