const db = require("../config/database");

const migration = async () => {
  try {
    await db.query(
      `
        CREATE TABLE IF NOT EXISTS tbl_user (
            userId varchar(255) NOT NULL,
            fullName varchar(255) DEFAULT NULL,
            username varchar(255) NOT NULL,
            password varchar(255) DEFAULT NULL,
            gender varchar(255) DEFAULT NULL,
            dateOfBirth varchar(255) DEFAULT NULL,
            phoneNumber int DEFAULT NULL,
            email varchar(255) DEFAULT NULL,
            photoProfile varchar(255) DEFAULT NULL,
            latitude double DEFAULT NULL,
            longtitude double DEFAULT NULL,
            insertedAt varchar(50) DEFAULT NULL,
            updatedAt varchar(50) DEFAULT NULL,
            PRIMARY KEY (userId, username)
        )
    `
    );

    await db.query(
      `
        CREATE TABLE IF NOT EXISTS tbl_comment (
            commentId varchar(50) NOT NULL,
            userId varchar(255) NOT NULL,
            username varchar(255) NOT NULL,
            comment text,
            rating int DEFAULT NULL,
            insertedAt varchar(50) DEFAULT NULL,
            updatedAt varchar(50) DEFAULT NULL,
            PRIMARY KEY (commentId),
            FOREIGN KEY (userId, username) REFERENCES tbl_user (userId, username)
        )   
    `
    );

    await db.query(
      `
        CREATE TABLE IF NOT EXISTS tbl_seller (
            sellerId varchar(50) NOT NULL,
            userId varchar(255) DEFAULT NULL,
            shopName varchar(255) DEFAULT NULL,
            province varchar(255) DEFAULT NULL,
            city varchar(255) DEFAULT NULL,
            detailStreet text,
            skill varchar(255) DEFAULT NULL,
            sellerPhoto varchar(255) DEFAULT NULL,
            sellerName varchar(255) DEFAULT NULL,
            phoneNumber int DEFAULT NULL,
            email varchar(255) DEFAULT NULL,
            latitude double DEFAULT NULL,
            longtitude double DEFAULT NULL,
            PRIMARY KEY (sellerId),
            FOREIGN KEY (userId) REFERENCES tbl_user (userId)
        )   
    `
    );

    await db.query(
      `
        CREATE TABLE IF NOT EXISTS tbl_product (
            productId varchar(50) NOT NULL,
            sellerId varchar(50) NOT NULL,
            productPhoto varchar(255) DEFAULT NULL,
            name varchar(255) DEFAULT NULL,
            category varchar(255) DEFAULT NULL,
            definition text,
            stock int DEFAULT NULL,
            price double DEFAULT NULL,
            insertedAt varchar(50) DEFAULT NULL,
            updatedAt varchar(50) DEFAULT NULL,
            PRIMARY KEY (productId),
            FOREIGN KEY (sellerId) REFERENCES tbl_seller (sellerId)
        )   
    `
    );

    await db.query(
      `
        CREATE TABLE IF NOT EXISTS tbl_transaction (
            transactionId varchar(50) NOT NULL,
            userId varchar(255) NOT NULL,
            productId varchar(50) NOT NULL,
            username varchar(255) DEFAULT NULL,
            productName varchar(255) DEFAULT NULL,
            quantity int DEFAULT NULL,
            price double DEFAULT NULL,
            totalAmount double DEFAULT NULL,
            transactionDate varchar(50) DEFAULT NULL,
            PRIMARY KEY (transactionId),
            FOREIGN KEY (userId, username) REFERENCES tbl_user (userId, username),
            FOREIGN KEY (productId) REFERENCES tbl_product (productId)
        )
    `
    );

    await db.query(
      `
        INSERT IGNORE INTO tbl_user 
            (
                userId, fullName, username, password, gender, dateOfBirth, phoneNumber, email, photoProfile, latitude, longtitude, insertedAt, updatedAt
            ) 
        VALUES 
            (
              '25e643c2-39c3-4800-90f3-83e9261b1f25',
              'San Diego',
              'Diego',
              'lorem ipsum',
              'PR',
              NULL,
              61237123,
              'diego@gmail.com',
              NULL,
              1.28123123,
              2.1238173,
              '2023-10-31T14:01:09.603Z',
              '2023-10-31T14:01:09.603Z'
            ),
            (
              '29b61455-330c-4b96-afaf-0d937e7993c6',
              'John Wick',
              'Beautifully muaacchhhhh',
              'lorem ipsum',
              'PR',
              NULL,
              81278123,
              'john@gmail.com',
              NULL,
              1.28123123,
              2.1238173,
              '2023-11-11T00:51:56.583Z',
              '2023-11-11T00:51:56.583Z'
            ),
            (
              '2dcb666b-4bd7-465f-9535-6675e43327f1',
              'John Wick',
              'John',
              'lorem ipsum',
              'PR',
              NULL,
              8572345,
              'john@gmail.com',
              NULL,
              1.28123123,
              2.1238173,
              '2023-10-31T14:12:12.878Z',
              '2023-10-31T14:12:12.878Z'
            ),
            (
              '3ad0532e-fa9c-478a-8f6c-37ec293db8e7',
              'Prilly Latu Consina',
              'Prilly',
              'lorem ipsum',
              'PR',
              NULL,
              8572345,
              'john@gmail.com',
              NULL,
              1.28123123,
              2.1238173,
              '2023-10-31T14:00:07.682Z',
              '2023-10-31T14:00:07.682Z'
            )
    `
    );

    await db.query(
      `
        INSERT IGNORE INTO tbl_seller 
            (
                sellerId, userId, shopName, province, city, detailStreet, skill, sellerPhoto, sellerName, phoneNumber, email, latitude, longtitude
            ) 
            VALUES 
            (
              'a437fa9c-e411-48cf-8b74-5f6c201464b8',
              '3ad0532e-fa9c-478a-8f6c-37ec293db8e7',
              'Prilly Nulis',
              'DKI Jakarta',
              'Jakarta Selatan',
              'Jl. Kapurangan',
              'Menjahit',
              'http:lorem-link',
              'Desta Mahabrata',
              8173102,
              'desta@gmail.com',
              1.321238123,
              1.321238123
            ),
            (
              'a96b4845-1711-4baf-a98a-49006d12f7a4',
              '25e643c2-39c3-4800-90f3-83e9261b1f25',
              'Diego is adventure',
              'DKI Jakarta',
              NULL,
              'Jl. Lorem',
              'Cooking',
              'http:lorem-link',
              'Desta Mahabrata',
              8173102,
              'desta@gmail.com',
              1.321238123,
              1.321238123
            ),
            (
              'ab39c6da-42d2-45a0-901f-0be1989609db',
              '2dcb666b-4bd7-465f-9535-6675e43327f1',
              'Jhon is house steak',
              'Yogyakarta',
              'Jakarta Utara',
              'Concat',
              'Cooking',
              'http:lorem-link',
              'Desta Mahabrata',
              8173102,
              'desta@gmail.com',
              1.321238123,
              1.321238123
            )
    `
    );

    await db.query(
      `
        INSERT IGNORE INTO tbl_product 
            (productId, sellerId, productPhoto, name, category, definition, stock, price, insertedAt, updatedAt) 
            VALUES 
            (
              'c9abd703-bd16-4f5c-9261-a863b629a3e5',
              'a437fa9c-e411-48cf-8b74-5f6c201464b8',
              'https://storage.googleapis.com/temp-bucket-41212/223487-P1O0NU-208.jpg',
              'Baju NIkah',
              'Wdding dress',
              'lorem ipsum dolor sit amet',
              23,
              230000,
              '2023-11-11T22:11:49.672Z',
              '2023-11-11T22:11:49.672Z'
            )
    `
    );
  } catch (error) {
    throw error;
  }
};

module.exports = migration;
