const { notesService } = require("../services");
const validation = require("../_helper/validation");
const httpStatus = require("http-status");

const getNotesList = async (req, res) => {
  const resData = await notesService.notesList(
    req.user.id,
    parseInt(req.query.skip),
    parseInt(req.query.limit)
  );

  return res.status(res.statusCode).json(resData);
};

const addEditNotes = async (req, res) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id,
  };

  const validationResult = validation.notes.validate(payload);

  if (validationResult.error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: validationResult.error.message,
      statusCode: httpStatus.BAD_REQUEST,
    });
  }

  var resData;
  console.log();
  if (req.params.noteId) {
    resData = await notesService.updateNote(payload, req.params.noteId);
  } else {
    resData = await notesService.createNote(payload);
  }
  return res.status(resData.statusCode).json(resData);
};

const deleteNote = async (req, res) => {
  const resData = await notesService.deleteNote(req.params.noteId);
  return res.status(res.statusCode).json(resData);
};

module.exports = {
  getNotesList,
  addEditNotes,
  deleteNote,
};
