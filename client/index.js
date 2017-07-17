/*
  client/index.js
  webpack entry file
*/

var express = require('express');
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

var router = express.Router();
var db = require('../queries');

router.get('/', db.getAllNotes);
router.get('/:id', db.getSingleNote);
router.post('/', db.createNote);
router.put('/:id', db.updateNote);
router.delete('/:id', db.removeNote);

module.exports = router;
