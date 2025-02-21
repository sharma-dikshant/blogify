const express = require("express");
const blogController = require("./../controller/blogController");

const router = express.Router();

router
  .route("/")
  .get(blogController.getAllTours)
  .post(blogController.createTour);

router.param("id", blogController.checkBlogId); //only run if param in this route is id

router
  .route("/:id")
  .get(blogController.getTour)
  .delete(blogController.deleteTour)
  .patch(blogController.updateTour);

module.exports = router;
