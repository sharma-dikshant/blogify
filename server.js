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

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "A blog must have title"],
      trim: true,
    },
    content: {
      type: String,
      require: [true, "A blog must have content"],
      trim: true,
    },
    author: {
      type: String,
      require: [true, "A blog must have author"],
    },
    category: [String],
    tags: [String],
  },
  {
    timestamp: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
const testBlog = new Blog({
  title: "test final",
  content: "test blog",
  author: "test user",
});

testBlog
  .save()
  .then((doc) => {
    // console.log(doc);
    console.log("doc saved");
  })
  .catch((err) => {
    console.log("error in savind doc", err);
  });

//starting server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
