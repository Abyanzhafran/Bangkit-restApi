const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const db = require("../config/database");

const getAll = async (req, res, next) => {
  try {
    const [sellers] = await db.query("SELECT * FROM tbl_seller");

    const mappedSeller = sellers.map((seller) => {
      return {
        sellerId: seller.sellerId,
        userId: seller.userId,
        shopName: seller.shopName,
        province: seller.province,
        city: seller.city,
        detailStreet: seller.detailStreet,
        skill: seller.skill,
        sellerPhoto: seller.sellerPhoto,
        sellerName: seller.sellerName,
        phoneNumber: seller.phoneNumber,
        email: seller.email,
        latitude: seller.latitude,
        longtitude: seller.longtitude,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedSeller,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const sellerID = req.params.sellerId;

    const [seller] = await db.query(
      `SELECT * FROM tbl_seller WHERE sellerId="${sellerID}"`
    );

    if (seller.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: `Seller with ID ${sellerID} Not Found`,
      });
    }

    const mappedSeller = seller.map((seller) => {
      return {
        sellerId: seller.sellerId,
        userId: seller.userId,
        shopName: seller.shopName,
        province: seller.province,
        city: seller.city,
        detailStreet: seller.detailStreet,
        skill: seller.skill,
        sellerPhoto: seller.sellerPhoto,
        sellerName: seller.sellerName,
        phoneNumber: seller.phoneNumber,
        email: seller.email,
        latitude: seller.latitude,
        longtitude: seller.longtitude,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: mappedSeller[0],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addSeller = async (req, res, next) => {
  try {
    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(400).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
      });
    }

    const {
      userId,
      shopName,
      province,
      city,
      detailStreet,
      skill,
      sellerPhoto,
      sellerName,
      phoneNumber,
      email,
      latitude,
      longtitude,
    } = req.body;

    const generateUuid = uuidv4();

    const insertQuery =
      "INSERT INTO tbl_seller(sellerId, userId, shopName, province, city, detailStreet, skill, sellerPhoto, sellerName, phoneNumber, email, latitude, longtitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      generateUuid,
      userId,
      shopName,
      province,
      city,
      detailStreet,
      skill,
      sellerPhoto,
      sellerName,
      phoneNumber,
      email,
      latitude,
      longtitude,
    ];

    await db.query(insertQuery, values);

    const mappedSeller = {
      sellerId: generateUuid,
      userId,
      shopName,
      province,
      city,
      detailStreet,
      skill,
      sellerPhoto,
      sellerName,
      phoneNumber,
      email,
      latitude,
      longtitude,
    };

    res.status(201).send({
      status: "Success",
      message: "Seller added successfully",
      data: mappedSeller,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const sellerID = req.params.sellerId;

    const [result] = await db.query(
      `DELETE FROM tbl_seller WHERE sellerId="${sellerID}"`,
      [sellerID]
    );

    if (result.affectedRows) {
      return res.status(200).json({
        status: "Success",
        message: "Seller deleted successfully",
      });
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Seller with ID ${sellerID} Not Found`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const sellerID = req.params.sellerId;
    const validate = validationResult(req);

    if (validate.errors.length !== 0) {
      return res.status(400).send({
        status: "Bad Request",
        message: validate.errors[0].msg,
      });
    }

    const {
      shopName,
      province,
      city,
      detailStreet,
      skill,
      sellerPhoto,
      sellerName,
      phoneNumber,
      email,
      latitude,
      longtitude,
    } = req.body;

    const [seller] = await db.query(
      `SELECT * FROM tbl_seller WHERE sellerId="${sellerID}"`
    );

    if (seller.length === 0) {
      return res.status(404).send({
        status: "Not Found",
        message: `Seller with ID ${sellerID} Not Found`,
      });
    }

    const updateQuery = `UPDATE tbl_seller SET shopName=?, province=?, city=?, detailStreet=?, skill=?, sellerPhoto=?, sellerName=?, phoneNumber=?, email=?, latitude=?, longtitude=? WHERE sellerId="${sellerID}"`;

    const values = [
      shopName || seller[0].shopName,
      province || seller[0].province,
      city || seller[0].city,
      detailStreet || seller[0].detailStreet,
      skill || seller[0].skill,
      sellerPhoto || seller[0].sellerPhoto,
      sellerName || seller[0].sellerName,
      phoneNumber || seller[0].phoneNumber,
      email || seller[0].email,
      latitude || seller[0].latitude,
      longtitude || seller[0].longtitude,
    ];

    await db.query(updateQuery, values);

    const mappedSeller = {
      sellerId: sellerID,
      userId: seller[0].userId,
      shopName,
      province,
      city,
      detailStreet,
      skill,
      sellerPhoto,
      sellerName,
      phoneNumber,
      email,
      latitude,
      longtitude,
    };

    res.status(200).send({
      status: "Success",
      message: "Seller updated successfully",
      data: mappedSeller,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  addSeller,
  getAll,
  getById,
  deleteById,
  updateById,
};
