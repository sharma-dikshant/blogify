const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "welcome to Blogify API",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


