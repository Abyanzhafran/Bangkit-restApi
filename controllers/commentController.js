const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const db = require("../config/database");

const getAll = async (req, res, next) => {
  try {
    const [comment] = await db.query("SELECT * FROM tbl_comment");

    const mappedComment = comment.map((comment) => {
      return {
        commentId: comment.commentId,
        userId: comment.userId,
        username: comment.username,
        comment: comment.comment,
        rating: comment.rating,
        insertedAt: comment.insertedAt,
        updatedAt: comment.updatedAt,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedComment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const commentID = req.params.commentId;

    const [comment] = await db.query(
      `SELECT * FROM tbl_comment WHERE commentId="${commentID}"`
    );

    if (comment.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Comment with ID ${commentId} Not Found`,
      });
    }

    const mappedComment = comment.map((comment) => {
      return {
        commentId: comment.commentId,
        userId: comment.userId,
        username: comment.username,
        comment: comment.comment,
        rating: comment.rating,
        insertedAt: comment.insertedAt,
        updatedAt: comment.updatedAt,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedComment[0],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(400).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
      });
    }

    const { userId, username, comment, rating } = req.body;

    const generateUuid = uuidv4();
    const timestamp = new Date().toISOString();

    const insertedQuery = `INSERT INTO tbl_comment(commentId, userId, username, comment, rating, insertedAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      generateUuid,
      userId,
      username,
      comment,
      rating,
      timestamp,
      timestamp,
    ];

    await db.query(insertedQuery, values);

    const mappedComment = {
      commentId: generateUuid,
      userId,
      username,
      comment,
      rating,
      insertedAt: timestamp,
      updatedAt: timestamp,
    };

    res.status(201).send({
      status: "Success",
      message: "Comment added successfully",
      data: mappedComment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  addComment,
  getAll,
  getById,
};
