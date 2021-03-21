const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const professor = require("../middlewares/professor");
const admin = require("../middlewares/admin");
const professorController=require("../controllers/Professor")

router.get("/",professorController.getAllProfessors );
router.post("/getByClassId", auth, admin, professorController.getProfessorByClass);
router.get("/getclasses", auth, professor,professorController.getClasses);
router.get("/getsubjects", auth, professor,professorController.getSubjects );
router.post("/getsubjectsByprofId", auth, admin,professorController.getSubjectsByProfId);
router.get("/getfeedbacks", auth, professor,professorController.getFeedbacks);
router.patch("/deleteclass/:id", auth, admin,professorController.deleteClass);
router.get("/:id", validateObjectId,professorController.getById );
router.post("/", professorController.addProfessor);
router.delete("/:id", validateObjectId,professorController.deleteProfessor);

module.exports = router;
