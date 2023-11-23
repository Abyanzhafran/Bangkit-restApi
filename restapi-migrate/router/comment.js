const express = require("express");
const router = express.Router();
const {
  validateComment,
} = require("../middlewares/validators/commentValidator");

const {
  addComment,
  getAll,
  getById,
} = require("../controllers/commentController");

router.get("/test", (req, res) => {
  res.send("helllow comment");
});

router.get("/", getAll);

router.get("/:commentId", getById);

router.post("/", validateComment, addComment);

module.exports = router;
