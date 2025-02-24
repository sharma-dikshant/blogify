const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    //options
  })
  .then(() => {
    console.log("DB is connected Successfully!");
  })
  .catch((err) => {
    console.log("💥 Error in Connecting DB!");
  });

//starting server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
