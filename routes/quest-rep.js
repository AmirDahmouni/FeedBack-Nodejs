const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const student = require("../middlewares/student");
const QuestAnswerController=require("../controllers/questionanswer")

router.get("/",QuestAnswerController.getAll);
router.get("/:id", validateObjectId,QuestAnswerController.getById);
router.get("/getnbbad/:idfeed/:idquest",QuestAnswerController.getnbbad);
router.get("/getnbnotbad/:idfeed/:idquest", QuestAnswerController.getnbnotbad);
router.get("/getnbgood/:idfeed/:idquest", QuestAnswerController.getnbgood);
router.get("/getnbverygood/:idfeed/:idquest",QuestAnswerController.getnbverygood);
router.get("/getnbexcell/:idfeed/:idquest",QuestAnswerController.getnbexcell);
router.delete("/deletebyquestion/:id",QuestAnswerController.deletebyquestion);
router.delete("/:id", validateObjectId, QuestAnswerController.delete);
router.post("/", auth, student, QuestAnswerController.vote);

module.exports = router;
