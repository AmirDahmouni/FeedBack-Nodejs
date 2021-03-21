const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const FeedBackController=require("../controllers/Feedbacks")


router.get("/",FeedBackController.getAllFeedbacks);
router.get("/:id", validateObjectId,FeedBackController.getFeedbackById);
router.get("/getquestions/:id", validateObjectId,FeedBackController.getQuestions);
router.patch("/", FeedBackController.updateNbVote);
router.post("/setfeedback", auth, admin,FeedBackController.setFeedback);
router.delete("/deletefeedback/:id", auth, admin,FeedBackController.removeFeedback );
router.delete("/deletefeedbackByclassId/:id", auth, admin,FeedBackController.removeFeedbackByClass);

module.exports = router;
