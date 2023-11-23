const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const db = require("../config/database");

const getAll = async (req, res, next) => {
  try {
    const [users] = await db.query("SELECT * FROM tbl_user");

    const mappedUsers = users.map((user) => {
      return {
        userId: user.userId,
        fullName: user.fullName,
        username: user.username,
        password: user.password,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        email: user.email,
        photoProfile: user.photoProfile,
        latitude: user.latitude,
        longtitude: user.longtitude,
        insertedAt: user.insertedAt,
        updatedAt: user.updatedAt,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedUsers,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userID = req.params.userId;

    const [user] = await db.query(
      `SELECT * FROM tbl_user WHERE userId="${userID}"`
    );

    if (user.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `User with ID ${userID} Not Found`,
      });
    }

    const mappedUser = user.map((user) => {
      return {
        userId: user.userId,
        fullName: user.fullName,
        username: user.username,
        password: user.password,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        email: user.email,
        photoProfile: user.photoProfile,
        latitude: user.latitude,
        longtitude: user.longtitude,
        insertedAt: user.insertedAt,
        updatedAt: user.updatedAt,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedUser[0],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(400).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
      });
    }

    const {
      fullName,
      username,
      password,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      photoProfile,
      latitude,
      longtitude,
    } = req.body;

    const generateUuid = uuidv4();
    const timestamp = new Date().toISOString();

    const insertQuery =
      " INSERT INTO tbl_user(userId, fullName, username, password, gender, dateOfBirth, phoneNumber, email, photoProfile, latitude, longtitude, insertedAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      generateUuid,
      fullName,
      username,
      password,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      photoProfile,
      latitude,
      longtitude,
      timestamp,
      timestamp,
    ];

    await db.query(insertQuery, values);

    const mappedUser = {
      userId: generateUuid,
      fullName: fullName === undefined ? null : fullName,
      username,
      password: password === undefined ? null : password,
      gender: gender === undefined ? null : gender,
      dateOfBirth: dateOfBirth === undefined ? null : dateOfBirth,
      phoneNumber: phoneNumber === undefined ? null : phoneNumber,
      email: email === undefined ? null : email,
      photoProfile: photoProfile === undefined ? null : photoProfile,
      latitude: latitude === undefined ? null : latitude,
      longtitude: longtitude === undefined ? null : longtitude,
      insertedAt: timestamp,
      updatedAt: timestamp,
    };

    res.status(201).send({
      status: "Success",
      message: "User added successfully",
      data: mappedUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const userID = req.params.userId;

    const [result] = await db.query(
      `DELETE FROM tbl_user WHERE userId="${userID}"`,
      [userID]
    );

    if (result.affectedRows) {
      return res.status(200).json({
        status: "Success",
        message: "User deleted successfully",
      });
    }

    return res.status(404).json({
      status: "Not Found",
      message: `User with ID ${userID} Not Found`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const userID = req.params.userId;
    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(400).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
      });
    }

    const {
      fullName,
      username,
      password,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      photoProfile,
      latitude,
      longtitude,
    } = req.body;

    const [user] = await db.query(
      `SELECT * FROM tbl_user WHERE userId="${userID}"`
    );

    if (user.length === 0) {
      return res.status(404).send({
        status: "Not Found",
        message: `User with ID ${userID} Not Found`,
      });
    }

    const timestamp = new Date().toISOString();

    const updateQuery = `UPDATE tbl_user SET fullName=?, username=?, password=?, gender=?, dateOfBirth=?, phoneNumber=?, email=?, photoProfile=?, latitude=?, longtitude=?, insertedAt=?, updatedAt=? WHERE userId="${userID}"`;

    const values = [
      fullName || user[0].fullName,
      username || user[0].username,
      password || user[0].password,
      gender || user[0].gender,
      dateOfBirth || user[0].dateOfBirth,
      phoneNumber || user[0].phoneNumber,
      email || user[0].email,
      photoProfile || user[0].photoProfile,
      latitude || user[0].latitude,
      longtitude || user[0].longtitude,
      timestamp,
      timestamp,
    ];

    await db.query(updateQuery, values);

    const mappedUser = {
      userId: userID,
      fullName,
      username,
      password,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      photoProfile,
      latitude,
      longtitude,
      timestamp,
      timestamp,
    };

    res.status(200).send({
      status: "Success",
      message: "User updated sucessfully",
      data: mappedUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addUser,
  deleteById,
  updateById,
};
