const { Professor } = require("../models/professor");
const { FeedBack } = require("../models/feedback");
const { Class } = require("../models/class");
const { User } = require("../models/user");
const { Student } = require("../models/student");
const bcrypt = require("bcrypt");



exports.getemails= async (req, res) => {
    try {
      const emails = await Student.find({class:req.params.id}).populate("userData","adress").select("userData");
      res.send(emails);
    } catch (ex) {
      next(ex);
    }
}
exports.getSubjects= async (req, res) => {
    try {
      var classeId = await Student.find({ userData: req.user._id }).select(
        "class"
      );
      classeId = classeId[0].class;
      const classe = await Class.findById({ _id: classeId }).populate("subjects");
      const subjects = classe.subjects.filter((s) => s.avaible == true);
      res.send(subjects);
    } catch (ex) {
      next(ex);
    }
}
exports.getStudentById=async (req, res) => {
    try {
      const student = await Student.findById({ _id: req.params.id });
      if (!student) return res.status(400).send("student not found !");
      return res.send(student);
    } catch (ex) {
      next(ex);
    }
}
exports.getFeedbacks=async (req, res) => {
  try {
    const feedbacks = await Student.find({ userData: req.user._id })
      .populate({ path: "feedbacks", populate: { path: "professor" } })
      .populate({ path: "feedbacks", populate: { path: "subject" } })
      .select("feedbacks -_id");
    res.send(feedbacks[0].feedbacks);
  } catch (ex) {
    next(ex);
  }
}
exports.getProfessors=async (req, res) => {
  const classeId = await Student.findOne({ userData: req.user._id }).select(
    "class -_id"
  );
  const professors = await Professor.find({
    classes: { $eq: classeId.class },
  })
    .populate("userData")
    .select("userData -_id");
  res.send(professors);
}
exports.deleteStudentsByclassId=async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.id }).select(
      "userData -_id"
    );
    const studentIds = students.map((s) => s.userData);

    await Student.deleteMany({ class: req.params.id }).then(
      async () => await User.deleteMany({ _id: { $in: studentIds } })
    );
    if (!studentIds) return res.status(400).send("student not found !");
    return res.send(studentIds);
  } catch (ex) {
    next(ex);
  }
}
exports.addStudent=async (req, res) => {
  try {
    let userexist = await User.findOne({ adress: req.body.adress });
    if (userexist) return res.status(400).send("user already registred");
    const user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      adress: req.body.adress,
      password: req.body.password,
      isAdmin: false,
      type: "student",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const userData = user._id;
    /****************************************************************** */
    const feedbacks = await FeedBack.find({ class: req.body.class }).select(
      "id"
    );
    const feedbacksId = feedbacks.map((c) => c._id);
    console.log(feedbacksId);
    /********************************************************************** */
    const student = new Student({
      class: req.body.class,
      feedbacks: feedbacksId,
      userData: userData,
    });
    await student.save();
    /********************************************************************** */
    return res.send(student);
  } catch (ex) {
    next(ex);
  }
}
exports.deleteStudent=async (req, res) => {
  try {
    await Student.findOneAndDelete({ userData: req.params.id }).then(
      async () => await User.findByIdAndDelete({ _id: req.params.id })
    );
  } catch (ex) {}
}
exports.getStudent=async (req, res, next) => {
  try {
    const students = await Student.find().populate("userData", "name lastname");

    if (!students) return res.status(400).send("no student found !");
    return res.send(students);
  } catch (ex) {
    next(ex);
  }
}
exports.deleteFeedbackStudent= async (req, res) => {
  try {
    await Student.update(
      { userData: req.user._id },
      { $pull: { feedbacks: req.params.id } }
    );
  } catch (ex) {}
}