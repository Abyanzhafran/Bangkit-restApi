const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const db = require("../config/database");

const getAll = async (req, res, next) => {
  try {
    const [product] = await db.query("SELECT * FROM tbl_product");

    const mappedProduct = product.map((product) => {
      return {
        productId: product.productId,
        sellerId: product.sellerId,
        productPhoto: product.productPhoto,
        name: product.name,
        category: product.category,
        definition: product.definition,
        price: product.price,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedProduct,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const productID = req.params.productId;

    const [product] = await db.query(
      `SELECT * FROM tbl_product WHERE productId="${productID}"`
    );

    if (product.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Product with ID ${productID} Not Found`,
      });
    }

    const mappedProduct = product.map((product) => {
      return {
        productId: product.productId,
        sellerId: product.sellerId,
        productPhoto: product.productPhoto,
        name: product.name,
        category: product.category,
        definition: product.definition,
        price: product.price,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedProduct[0],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    // Get uploaded imageUrl from imageUpload middleware
    const imageUrl = req.uploadedImageUrl;

    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(400).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
      });
    }

    const { sellerId, name, category, definition, stock, price } = req.body;

    const generateUuid = uuidv4();
    const timestamp = new Date().toISOString();

    const insertQuery =
      "INSERT INTO tbl_product(productId, sellerId, productPhoto, name, category, definition, stock, price, insertedAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      generateUuid,
      sellerId,
      imageUrl, // get uploaded image link
      name,
      category,
      definition,
      stock,
      price,
      timestamp,
      timestamp,
    ];

    await db.query(insertQuery, values);

    const mappedProduct = {
      productId: generateUuid,
      sellerId,
      productPhoto: imageUrl,
      name,
      category,
      definition,
      stock,
      price,
      insertedAt: timestamp,
      updatedAt: timestamp,
    };

    res.status(201).send({
      status: "Success",
      message: "Product added successfully",
      data: mappedProduct,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const productID = req.params.productId;

    const [result] = await db.query(
      `DELETE FROM tbl_product WHERE productId="${productID}"`,
      [productID]
    );

    if (result.affectedRows) {
      return res.status(200).json({
        status: "Success",
        message: "Product deleted successfully",
      });
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Product with ID ${productID} Not Found`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const productID = req.params.productId;
    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(400).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
      });
    }

    const { productPhoto, name, category, definition, stock, price } = req.body;

    const [product] = await db.query(
      `SELECT * FROM tbl_product WHERE productId="${productID}"`
    );

    if (product.length === 0) {
      return res.status(404).send({
        status: "Not Found",
        message: `Product with ID ${productID} Not Found`,
      });
    }

    const timestamp = new Date().toISOString();

    const updateQuery = `UPDATE tbl_product SET productPhoto=?, name=?, category=?, definition=?, stock=?, price=?, updatedAt=? WHERE productId="${productID}"`;

    const values = [
      productPhoto || product[0].productPhoto,
      name || product[0].name,
      category || product[0].category,
      definition || product[0].definition,
      stock || product[0].stock,
      price || product[0].price,
      timestamp,
    ];

    await db.query(updateQuery, values);

    const mappedProduct = {
      productId: productID,
      sellerId: product[0].sellerId,
      productPhoto,
      name,
      category,
      definition,
      stock,
      price,
      timestamp,
    };

    res.status(200).send({
      status: "Success",
      message: "Product updated successfully",
      data: mappedProduct,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addProduct,
  deleteById,
  updateById,
};
