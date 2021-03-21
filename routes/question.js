const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const questionController=require("../controllers/Question");

router.get("/", auth, admin,questionController.getAllQuestions );
router.get("/:id", validateObjectId, questionController.getQuestionById);
router.patch("/", questionController.addQuestion);
router.patch("/:id", validateObjectId, questionController.deleteQuestion);
router.delete("/:id", validateObjectId, questionController.removeQuestion);

module.exports = router;
