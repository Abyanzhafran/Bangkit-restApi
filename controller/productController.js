const { v4: uuidv4 } = require('uuid');
const db = require('../database')
const process = require('process'); // Required to mock environment variables

// [START gae_storage_app]
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();

// add your bucket name here boyy
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET)

const getProductTest = (req, res) => {
  res.send('this is product controller')
}

const addProduct = (req, res, next) => {
  const {
    sellerId,
    name,
    category,
    definition,
    price_1,
    price_2
  } = req.body

  // Create a new blob in the bucket and upload the file data.
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
    );

    const id = uuidv4()
    const insertedAt = new Date().toISOString()
    const productPhoto = publicUrl

    const newProduct = {
      id,
      sellerId,
      productPhoto,
      name,
      category,
      definition,
      price_1,
      price_2,
      insertedAt
    }

    const getObjVal = Object.values(newProduct)

    let query = "INSERT INTO tbl_product (id, sellerId, productPhoto, name, category, definition, price_1, price_2, insertedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(query, getObjVal, (err) => {
      if (err) {
        res.status(201).send({ message: err.sqlMessage })
      }
      res.status(200).send({
        status: 'success',
        message: 'Product added successfully',
        data: {
          productId: newProduct.id
        }
      })
    })
  });

  blobStream.end(req.file.buffer);
}

const getAllProduct = (req, res) => {
  let query = "SELECT * FROM tbl_product"
  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send({ message: err.sqlMessage })
    }
    res.status(200).send({
      status: 'success',
      products: result
    })
  })
}

const getProductById = (req, res) => {
  const { id } = req.params

  let query = "SELECT * FROM tbl_product WHERE id = ?"
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

const getProductBySellerId = (req, res) => {
  const { sellerId } = req.params

  let query = "SELECT * FROM tbl_product WHERE sellerId = ?"
  db.query(query, [sellerId], (err, result) => {
    if (result.length == 0) {
      res.status(404).send({
        status: 'fail',
        message: 'Product not found'
      })
    } else if (!err && result.length !== 0) {
      res.status(200).send({
        status: 'success',
        products: result
      })
    }
  })
}

const editProductById = (req, res) => {
  const { id } = req.params

  const {
    productPhoto,
    name,
    category,
    definition,
    price_1,
    price_2
  } = req.body

  const updatedAt = new Date().toISOString()

  let query = "UPDATE tbl_product SET productPhoto = ?, name = ?, category = ?, definition = ?, price_1 = ?, price_2 = ?, updatedAt = ? WHERE id = ?"
  db.query(query, [
    productPhoto,
    name,
    category,
    definition,
    price_1,
    price_2,
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
      message: 'Product successfully updated'
    })
  })
}

const deleteProductById = (req, res) => {
  const { id } = req.params

  let query = "DELETE FROM tbl_product WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(404).send({
        status: 'fail',
        message: err.sqlMessage
      })
    }
    res.status(200).send({
      status: 'success',
      message: 'Product successfully deleted'
    })
  })
}

// function priceRangeFormat(p1, p2) {
//   console.log(products.priceRange)
//   const result = "Rp. " + p1 + " - " + "Rp. " + p2
//   console.log(result)
// }

module.exports = {
  getProductTest,
  addProduct,
  getAllProduct,
  getProductById,
  getProductBySellerId,
  editProductById,
  deleteProductById
}