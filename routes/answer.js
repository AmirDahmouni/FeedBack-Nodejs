const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const answerController=require("../controllers/Answer")

router.get("/",answerController.getAllAnswers);
router.get("/:id", validateObjectId,answerController.getById);
router.post("/", answerController.addAnswer);
router.delete("/:id", validateObjectId,answerController.deleteAnswer);

module.exports = router;
