const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Import Routes
const authRoute = require("./routes/auth.js");
const postsRoute = require("./routes/posts");

// Dotenv config
dotenv.config();

// Connect to mongongoose
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to DB")
);

// Middleware
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/posts", postsRoute);

// // listening port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`My node server is running at ${PORT}`);
// });
app.listen(5000, () => console.log("My node server is running"));
