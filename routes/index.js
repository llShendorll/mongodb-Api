const express = require('express');
const router = express.Router();
const pageIndex = require('../controllers/index');

/* GET home page. */

router.get('/', pageIndex.sendData);

module.exports = router;
