const { v4: uuidv4 } = require('uuid');
const db = require('../database')

const process = require('process'); // Required to mock environment variables

// [START gae_storage_app]
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();

// add your bucket name here boyy
const bucket = storage.bucket('cogent-tempo-351103.appspot.com')

const getUserTest = (req, res) => {
  res.send('this is user controller')
}

const auth = (req, res) => {
  const { email, password } = req.body

  let query = "SELECT id, email, password FROM tbl_user WHERE email = ? AND password = ?"
  db.query(query, [email, password], (err, result) => {
    if (err) {
      res.status(404).send({
        status: 'fail',
        message: err.sqlMessage
      })
    }
    res.status(200).send({
      status: 'success',
      loginResult: result[0].id
    })
  })
}

const addUser = (req, res) => {
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
    longtitude
  } = req.body

  const id = uuidv4()
  const insertedAt = new Date().toISOString()

  const newUser = {
    id,
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
    insertedAt
  }

  const getObjVal = Object.values(newUser)

  let query = "INSERT INTO tbl_user (id, fullName, username, password, gender, dateOfBirth, phoneNumber, email, photoProfile, latitude, longtitude, insertedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  db.query(query, getObjVal, (err) => {
    if (err) {
      res.status(201).send({ message: err.sqlMessage })
    }
    res.status(200)
    res.send({
      status: 'success',
      message: 'User added successfully',
      data: {
        userId: newUser.id
      }
    })
  })
}

const getAllUsers = (req, res) => {
  let query = "SELECT * FROM tbl_user"
  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send({ message: err.sqlMessage })
    }
    res.status(200).send({
      status: 'success',
      users: result
    })
  })
}

const getUserById = (req, res) => {
  const { id } = req.params

  let query = "SELECT * FROM tbl_user WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (result.length == 0) {
      res.status(404).send({
        status: 'fail',
        message: err.sqlMessage
      })
    } else if (!err && result.length !== 0) {
      res.status(200).send(result[0])
    }
  })
}

const editUserById = (req, res) => {
  const { id } = req.params

  const {
    fullName,
    username,
    password,
    gender,
    dateOfBirth,
    phoneNumber,
    email,
    latitude,
    longtitude
  } = req.body

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    const photoProfile = publicUrl
    const updatedAt = new Date().toISOString()

    let query = "UPDATE tbl_user SET fullName = ?, username = ?, password = ?, gender = ?, dateOfBirth = ?, phoneNumber = ?, email = ?, photoProfile = ?, latitude = ?, longtitude = ?, updatedAt = ? WHERE id = ?"
    db.query(query, [
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
      updatedAt,
      id
    ], (err, result) => {
      if (err) {
        res.status(404)
        res.send({
          status: 'fail',
          message: err.sqlMessage
        })
      }
      res.status(200)
      res.send({
        status: 'success',
        message: 'User successfully updated'
      })
    })
  })

  blobStream.end(req.file.buffer);
}

const deleteUserById = (req, res) => {
  const { id } = req.params

  let query = "DELETE FROM tbl_user WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(404).send({
        status: 'fail',
        message: err.sqlMessage
      })
    }
    res.status(200).send({
      status: 'success',
      message: 'Users successfully deleted'
    })
  })
}

module.exports = {
  getUserTest,
  addUser,
  auth,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
}

