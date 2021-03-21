
const { Answer, validate } = require("../models/answer");


exports.getAllAnswers=async (req, res) => {
    try {
      const answers = await Answer.find();
      res.send(answers);
    } catch (ex) {
      next(ex);
    }
}
exports.getById=async (req, res) => {
    try {
      let answer = await Answer.findById({ _id: req.params.id });
      if (!answer) return res.status(400).send("answer not found !");
      return res.send(answer);
    } catch (ex) {
      next(ex);
    }
}

exports.addAnswer=async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send("invalid answer");
      let answer = new Answer({ answer: req.body.answer, level: req.body.level });
      await answer.save();
      return res.send(answer);
    } catch (ex) {
      next(ex);
    }
}
exports.deleteAnswer=async (req, res) => {
    try {
      let answer = await Answer.findByIdAndDelete({ _id: req.params.id });
      if (!answer) return res.status(400).send("answer not found !");
      return res.send(answer);
    } catch (ex) {
      next(ex);
    }
  }