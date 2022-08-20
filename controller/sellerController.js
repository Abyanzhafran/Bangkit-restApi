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

const getSellerTest = (req, res) => {
  res.send('this is seller controller')
}

const addSeller = (req, res) => {
  const {
    userId,
    shopName,
    province,
    city,
    streetName,
    detailStreet,
    skill,
    sellerName,
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

    const id = uuidv4()
    const insertedAt = new Date().toISOString()
    const sellerPhoto = publicUrl

    const newSeller = {
      id,
      userId,
      shopName,
      province,
      city,
      streetName,
      detailStreet,
      skill,
      sellerPhoto,
      sellerName,
      phoneNumber,
      email,
      insertedAt,
      latitude,
      longtitude
    }

    const getObjVal = Object.values(newSeller)

    let query = "INSERT INTO tbl_seller (id, userId, shopName, province, city, streetName, detailStreet, skill, sellerPhoto, sellerName, phoneNumber, email, insertedAt, latitude, longtitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(query, getObjVal, (err) => {
      if (err) {
        res.status(201).send('Seller failed to add')
        throw err
      }
      res.status(200)
      res.send({
        status: 'success',
        message: 'Seller added successfully',
        data: {
          sellerId: newSeller.id
        }
      })
    })
  })

  blobStream.end(req.file.buffer);
}

const getAllSellers = (req, res) => {
  let query = "SELECT * FROM tbl_seller"
  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send('Cannot get sellers')
      throw err
    }
    res.status(200).send({
      status: 'success',
      sellers: result
    })
  })
}

const getSellerById = (req, res, h) => {
  const { id } = req.params

  let query = "SELECT * FROM tbl_seller WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (result.length == 0) {
      res.status(404).send({
        status: 'fail',
        message: 'Seller not found'
      })
    } else if (!err && result.length !== 0) {
      res.status(200).send(result[0])
    }
  })
}

const getSellerByUserId = (req, res, h) => {
  const { userId } = req.params

  let query = "SELECT * FROM tbl_seller WHERE userId = ?"
  db.query(query, [userId], (err, result) => {
    if (result.length == 0) {
      res.status(404).send({
        status: 'fail',
        message: 'Seller not found'
      })
    } else if (!err && result.length !== 0) {
      res.status(200).send(result[0])
    }
  })
}

const editSellerById = (req, res) => {
  const { id } = req.params

  const {
    shopName,
    province,
    city,
    streetName,
    detailStreet,
    skill,
    sellerPhoto,
    sellerName,
    phoneNumber,
    email,
    latitude,
    longtitude
  } = req.body

  const updatedAt = new Date().toISOString()

  let query = "UPDATE tbl_seller SET shopName = ?, province = ?, city = ?, streetName = ?, detailStreet = ?, skill = ?, sellerPhoto = ?, sellerName = ?, phoneNumber = ?, email = ?, latitude = ?, longtitude = ?, updatedAt = ? WHERE id = ?"
  db.query(query, [
    shopName,
    province,
    city,
    streetName,
    detailStreet,
    skill,
    sellerPhoto,
    sellerName,
    phoneNumber,
    email,
    latitude,
    longtitude,
    updatedAt,
    id
  ], (err) => {
    if (err) {
      res.status(404)
      res.send({
        status: 'fail',
        message: 'Seller not found'
      })
      throw err
    }
    res.status(200)
    res.send({
      status: 'success',
      message: 'Seller successfully updated'
    })
  })
}

const deleteSellerById = (req, res) => {
  const { id } = req.params

  let query = "DELETE FROM tbl_seller WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(404).send({
        status: 'fail',
        message: 'Seller failed to delete, id not found'
      })
      throw err
    }
    res.status(200).send({
      status: 'success',
      message: 'Seller successfully deleted'
    })
  })
}

module.exports = {
  getSellerTest,
  addSeller,
  getAllSellers,
  getSellerById,
  getSellerByUserId,
  editSellerById,
  deleteSellerById
}