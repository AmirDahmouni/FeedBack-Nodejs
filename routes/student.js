const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const student = require("../middlewares/student");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const studentController=require("../controllers/Student")

router.get("/getemails/:id", auth, admin,studentController.getemails);
router.get("/", studentController.getStudent);
router.get("/getsubjects", auth, student,studentController.getSubjects);
router.get("/getfeedbacks", auth, student,studentController.getFeedbacks);
router.get("/getprofessors", auth, student, studentController.getProfessors);
router.get("/:id", validateObjectId,studentController.getStudentById );
router.patch("/:id", auth, student,studentController.deleteFeedbackStudent);
router.post("/",studentController.addStudent);
router.delete("/:id", auth, admin, studentController.deleteStudent);
router.delete("/deletestudentsbyclassId/:id",validateObjectId,studentController.deleteStudentsByclassId);

module.exports = router;
