const express = require("express");
const blogController = require("./../controller/blogController");

const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

//alias route
router.route(
  "/latest",
  blogController.getLatestBlogs,
  blogController.getAllBlogs
);

router.param("id", blogController.checkBlogId); //only run if param in this route is id

router
  .route("/:id")
  .get(blogController.getBlog)
  .delete(blogController.deleteBlog)
  .patch(blogController.updateBlog);

module.exports = router;
