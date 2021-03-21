const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const SubjectController=require("../controllers/Subject")


router.get("/:id", validateObjectId,SubjectController.getById);
router.get("/", auth, admin, SubjectController.getAllSubjects);
router.post("/", SubjectController.addSubject);
router.patch("/:id", validateObjectId,SubjectController.deleteSubject);

module.exports = router;
