const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const db = require("../config/database");

const getAll = async (req, res, next) => {
  try {
    const [transactions] = await db.query("SELECT * FROM tbl_transaction");

    const mappedTransaction = transactions.map((transaction) => {
      return {
        transactionId: transaction.transactionId,
        userId: transaction.userId,
        productId: transaction.productId,
        username: transaction.username,
        productName: transaction.productName,
        quantity: transaction.quantity,
        price: transaction.price,
        totalAmount: transaction.totalAmount,
        transactionDate: transaction.transactionDate,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedTransaction,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const transactionID = req.params.transactionId;

    const [transaction] = await db.query(
      `SELECT * FROM tbl_transaction WHERE transactionId="${transactionID}"`
    );

    if (transaction.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `transaction with ID ${transactionID} Not Found`,
      });
    }

    const mappedTransaction = transaction.map((transaction) => {
      return {
        transactionId: transaction.transactionId,
        userId: transaction.userId,
        productId: transaction.productId,
        username: transaction.username,
        productName: transaction.productName,
        quantity: transaction.quantity,
        price: transaction.price,
        totalAmount: transaction.totalAmount,
        transactionDate: transaction.transactionDate,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedTransaction[0],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addTransaction = async (req, res, next) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(400).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
      });
    }

    const {
      userId,
      productId,
      username,
      productName,
      quantity,
      price,
      totalAmount,
    } = req.body;

    const generateUuid = uuidv4();
    const timestamp = new Date().toISOString();

    const insertQuery =
      "INSERT INTO tbl_transaction(transactionId, userId, productId, username, productName, quantity, price, totalAmount, transactionDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      generateUuid,
      userId,
      productId,
      username,
      productName,
      quantity,
      price,
      totalAmount,
      timestamp,
    ];

    await db.query(insertQuery, values);

    const mappedTransaction = {
      transactionId: generateUuid,
      userId,
      productId,
      username,
      productName,
      quantity,
      price,
      totalAmount,
      transactionDate: timestamp,
    };

    await connection.commit();

    res.status(201).send({
      status: "Success",
      message: "Transaction added successfully",
      data: mappedTransaction,
    });
  } catch (error) {
    console.log(error);
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

const deleteById = async (req, res, next) => {
  try {
    const transactionID = req.params.transactionId;

    const [result] = await db.query(
      `DELETE FROM tbl_transaction WHERE transactionId="${transactionID}"`,
      [transactionID]
    );

    if (result.affectedRows) {
      return res.status(200).json({
        status: "Success",
        message: "User deleted successfully",
      });
    }

    return res.status(404).json({
      status: "Not Found",
      message: `transaction with ID ${transactionID} Not Found`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addTransaction,
  deleteById,
};
