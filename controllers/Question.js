
const { Question, validate } = require("../models/question");

exports.getAllQuestions=async (req, res) => {
    try {
      const questions = await Question.find({ avaible: true });
      res.send(questions);
    } catch (ex) {
      next(ex);
    }
  }
exports.getQuestionById=async (req, res) => {
    try {
      let question = await Question.findById({ _id: req.params.id });
      if (!question) return res.status(400).send("question not found!");
      return res.send(question);
    } catch (ex) {
      next(ex);
    }
  }

exports.addQuestion=async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send("invalid question");
      var questionexist = await Question.findOneAndUpdate(
        { quest: req.body.quest, avaible: false },
        { avaible: true }
      );
      if (questionexist) {
        await questionexist.save();
        return res.send(questionexist);
      } else {
        var question = new Question({
          quest: req.body.quest,
          avaible: true,
        });
       await question.save();
       return res.send(question);
      }
    } catch (ex) {
      next(ex);
    }
  }

exports.deleteQuestion=async (req, res) => {
    try {
      const question = await Question.findByIdAndUpdate(
        { _id: req.params.id },
        { avaible: false }
      );
      if (!question) return res.status(400).send("not deleted");
    } catch (ex) {}
  }

  exports.removeQuestion=async (req, res) => {
    try {
      let question = await Question.findByIdAndDelete({ _id: req.params.id });
      if (!question) return res.status(400).send("question not found!");
      return res.send(question);
    } catch (ex) {
      next(ex);
    }
  }