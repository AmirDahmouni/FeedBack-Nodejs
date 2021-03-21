const { Student } = require("../models/student");
const { Admin } = require("../models/admin");
const { Questrep } = require("../models/quest-rep");
const { FeedBack, validate } = require("../models/feedback");


exports.getAllFeedbacks=async (req, res) => {
    try {
      const feedbacks = await FeedBack.find();
      return res.send(feedbacks);
    } catch (ex) {
      next(ex);
    }
}

exports.getFeedbackById=async (req, res) => {
    try {
      const feedback = await FeedBack.findById(req.params.id);
      if (!feedback) return res.status(404).send("feedback not found !");
      return res.send(feedback);
    } catch (ex) {
      next(ex);
    }
}

exports.getQuestions=async (req, res) => {
    try {
      const questions = await FeedBack.find({ _id: req.params.id })
        .populate("questions")
        .select("name");
      if (!questions)
        return res.status(404).send("no questions for this feedback");
      return res.send(questions[0]);
    } catch (ex) {
      next(ex);
    }
}

exports.updateNbVote=async (req, res) => {
    try {
      await FeedBack.update({ _id: req.body.feedId }, { $inc: { nbvotes: 1 } });
    } catch (ex) {}

}

exports.setFeedback=async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.message);
  
      let feedback = new FeedBack({
        name: req.body.name,
        class: req.body.class,
        professor: req.body.professor,
        subject: req.body.subject,
        questions: req.body.questions,
        nbvotes: req.body.nbvotes,
      });
  
      await feedback.save();
  
      await Student.updateOne(
        { class: req.body.class },
        { $push: { feedbacks: feedback._id } }
      );
  
      await Admin.updateOne(
        { userData: req.user._id },
        { $push: { feedbacks: feedback._id } }
      );
      res.send(feedback);
    } catch (ex) {
      next(ex);
    }
}

exports.removeFeedback=async (req, res) => {
    const feedback = await FeedBack.findByIdAndDelete({ _id: req.params.id });
    await Admin.update(
      { userData: req.user._id },
      { $pull: { feedbacks: req.params.id } }
    );
    await Student.update(
      { class: feedback.class },
      { $pull: { feedbacks: req.params.id } }
    );
    await Questrep.deleteMany({ feedback: req.params.id });
    res.send(feedback);
}

exports.removeFeedbackByClass= async (req, res) => {
    await FeedBack.deleteMany({ class: req.params.id });
  }