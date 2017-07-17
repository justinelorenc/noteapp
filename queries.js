var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/notes';
var db = pgp(connectionString);

// add query functions
module.exports = {
  getAllNotes: getAllNotes,
  getSingleNote: getSingleNote,
  createNote: createNote,
  updateNote: updateNote,
  removeNote: removeNote
};

// get all notes
function getAllNotes(req, res, next) {
  db.any('SELECT * FROM notes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all notes'
        });
    })
    // if query failed, display an error message
    .catch(function (err) {
      return next(err);
    });
}

// get one note
function getSingleNote(req, res, next) {
  var noteID = parseInt(req.params.id);
  db.one('SELECT * FROM notes WHERE ID = $1', noteID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved a note'
        });
    })
    // if query failed, display an error message
    .catch(function (err) {
      return next(err);
    });
}

// create a new note
function createNote(req, res, next) {
  req.body.content = parseInt(req.body.content);
  db.none('INSERT INTO notes (content) VALUES (${content}', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted a note'
        });
    })
    // if insert failed, display an error message
    .catch(function (err) {
      return next(err);
    });
}

// update an existing note
function updateNote(req, res, next) {
  db.none('UPDATE notes SET content = $1 WHERE id = $2',
    [req.body.content, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated a note'
        });
    })
    // if update failed, display an error message
    .catch(function (err) {
      return next(err);
    });
}

// delete an existing note
function removeNote(req, res, next) {
  var noteID = parseInt(req.params.id);
  db.result('DELETE FROM notes WHERE ID = $1', noteID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} note`
        });
    })
    // if delete failed, display an error message
    .catch(function (err) {
      return next(err);
    });
}
