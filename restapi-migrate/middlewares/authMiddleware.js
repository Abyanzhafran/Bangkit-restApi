const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const db = require("../config/database");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token === "" || token === undefined) {
      return res.status(401).send({
        status: "Fail",
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, "kratos");

    const [userDbData] = await db.query(
      `SELECT * FROM tbl_user WHERE userId="${decoded.user}"`
    );

    if (userDbData.length === 0) {
      return res.status(401).send({
        status: "Fail",
        message: "Invalid token",
      });
    }

    req.user = userDbData[0];
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(400).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
      });
    }

    const { username, password } = req.body;

    const [user] = await db.query("SELECT * FROM tbl_user WHERE username = ?", [
      username,
    ]);

    if (user.length === 0) {
      return res.status(401).send({
        status: "Fail",
        message: "Invalid username or password",
      });
    }

    // // If you password in database encrypted use this :
    // const isPasswordValid = await bcrypt.compare(password, user[0].password);

    const isPasswordValid = password === user[0].password;

    if (!isPasswordValid) {
      return res.status(401).send({
        status: "Fail",
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ user: user[0].userId }, "kratos", {
      expiresIn: "1h",
    });

    res.send({
      status: "Success",
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
    res.status(500).send({
      status: "Fail",
      message: "Internal server error",
    });
  }
};

module.exports = {
  authenticate,
  login,
};
