const Joi = require("joi"); //it's a class
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer: { type: String, required: true, minlength: 3 },
  level: { type: Number, required: true, min: 1, max: 5 },
});

const Answer = mongoose.model("answer", answerSchema);
function validateanswer(answerverify) {
  const schema = Joi.object({
    answer: Joi.string().valid(
      "BAD",
      "NOTBAD",
      "GOOD",
      "VERYGOOD",
      "EXCELLENT"
    ),
    level: Joi.number().min(1).max(5).required(),
  });
  return schema.validate(answerverify);
}

exports.Answer = Answer;
exports.validate = validateanswer;
exports.answerSchema = answerSchema;
