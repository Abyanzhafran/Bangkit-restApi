const express = require("express");
const app = express();
const cors = require("cors");
const migration = require("./config/migration");
const { authenticate, login } = require("./middlewares/authMiddleware");
const userRouter = require("./router/user");
const commentRouter = require("./router/comment");
const sellerRouter = require("./router/seller");
const productRouter = require("./router/product");
const transactionRouter = require("./router/transaction");
const { validateLogin } = require("./middlewares/validators/loginValidator");

// enable urlencoded URL Encoding
app.use(express.urlencoded({ extended: true }));

// enable cors for all request
app.use(cors());

// enable middleware
app.use(express.json());

// trust proxy config for GAE
app.set("trust proxy", true);

// handle error message
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    error: err.message,
  });

  // example of detailed error
  // if (err instanceof MulterError) {
  //   console.log("ERR TYPE : ", err.code);
  //   res.status(400).send({
  //     error: "Multer error : " + err.message,
  //   });
  // } else if (err) {
  //   err.statusCode = err.statusCode || 500;
  //   err.message = err.message || "Internal Server Error";

  //   res.status(err.statusCode).json({
  //     error: err.message,
  //   });
  // }
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome, helloowww broroooooooo");
});

// Public route for login
app.post("/login", validateLogin, login);

// Protected routes using the authenticate middleware
app.use("/api", authenticate);
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/transaction", transactionRouter);

// // folder to serve file statically
// // disable this for production
// app.use("/bucket_dev", express.static("bucket_dev"));

// [Start the server GAE]
const PORT = parseInt(process.env.PORT) || 8080;
const runApp = async () => {
  await migration();

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
  });
};

runApp();
// [END gae_node_request_example]

// DEVELOPMENT
// const PORT = parseInt(process.env.PORT) || 3000;
// const HOST = process.env.HOST || "localhost";

// const runApp = async () => {
//   await migration();

//   app.listen(PORT, () => {
//     console.log(`App listening on http://${HOST}:${PORT}/`);
//     console.log("Press Ctrl+C to quit.");
//   });
// };

// runApp();
