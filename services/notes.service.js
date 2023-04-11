const db = require("../models/index");
const tblNotes = db.Notes;
const httpStatus = require("http-status");

const notesList = async (userId, skip, limit) => {
  try {
    var res = {};
    if (!skip && !limit) {
      res = await tblNotes.findAndCountAll({
        where: {
          userId: userId,
        },
        order: [["createdAt", "ASC"]],
      });
    } else {
      res = await tblNotes.findAndCountAll({
        limit: limit,
        offset: skip,
        where: {
          userId: userId,
        },
        order: [["createdAt", "ASC"]],
      });
    }

    if (res != null) {
      const successRes = {};

      successRes.message = "Success";
      successRes.statusCode = httpStatus.OK;
      successRes.totalCount = res.count;
      successRes.data = res.rows;

      return successRes;
    } else {
      const errorRes = {};
      errorRes.message = "Something Went Wrong";
      errorRes.statusCode = httpStatus.BAD_REQUEST;
      errorRes.data = {};
      return errorRes;
    }
  } catch (error) {
    const errorRes = {};

    errorRes.message = error.errors[0].message;
    errorRes.statusCode = httpStatus.BAD_REQUEST;

    return errorRes;
  }
};

const createNote = async (payload) => {
  try {
    const res = await tblNotes.create(payload);
    const successRes = {};

    if (res != null) {
      successRes.message = "Success";
      successRes.statusCode = httpStatus.OK;
      successRes.data = res;
      return successRes;
    } else {
      const errorRes = {};

      errorRes.message = "Something Went Wrong";
      errorRes.statusCode = httpStatus.BAD_REQUEST;
      errorRes.data = {};
      return errorRes;
    }
  } catch (error) {
    const errorRes = {};

    errorRes.message = error.errors[0].message;
    errorRes.statusCode = httpStatus.BAD_REQUEST;

    return errorRes;
  }
};

const updateNote = async (payload, noteId) => {
  try {
    const res = await tblNotes.update(payload, { where: { id: noteId } });

    if (res != null) {
      const successRes = {};
      successRes.message = "Success";
      successRes.statusCode = httpStatus.OK;
      successRes.data = res;
      return successRes;
    } else {
      const errorRes = {};
      errorRes.message = "Something Went Wrong";
      errorRes.statusCode = httpStatus.BAD_REQUEST;
      errorRes.data = {};
      return errorRes;
    }
  } catch (error) {
    const errorRes = {};

    errorRes.message = error;
    errorRes.statusCode = httpStatus.BAD_REQUEST;

    return errorRes;
  }
};

const deleteNote = async (noteId) => {
  try {
    const res = await tblNotes.destroy({ where: { id: noteId } });

    if (res != null) {
      const successRes = {};
      successRes.message = "Success";
      successRes.statusCode = httpStatus.OK;
      successRes.data = res;
      return successRes;
    } else {
      const errorRes = {};
      errorRes.message = "Something Went Wrong";
      errorRes.statusCode = httpStatus.BAD_REQUEST;
      errorRes.data = {};
      return errorRes;
    }
  } catch (error) {
    const errorRes = {};

    errorRes.message = error;
    errorRes.statusCode = httpStatus.BAD_REQUEST;

    return errorRes;
  }
};

module.exports = {
  notesList,
  createNote,
  updateNote,
  deleteNote,
};
