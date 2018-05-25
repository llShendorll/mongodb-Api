const express = require('express');
const router = express.Router();
const envelope = require('../controllers/api');

router.get('/', envelope.getPackages);

router.get('/:id', envelope.getPackage);

router.post('/', envelope.addPackages);

router.post('/:id', envelope.editPackage);

router.delete('/:id', envelope.deletedPackage);

module.exports = router;

