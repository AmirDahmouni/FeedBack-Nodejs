const { boolean } = require("joi");
const Joi = require("joi"); //it's a class
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quest: { type: String, required: true, minlength: 10 },
  avaible: { type: Boolean, required: true },
});

const Question = mongoose.model("question", questionSchema);
function validatequestion(questionverify) {
  const schema = Joi.object({
    quest: Joi.string().min(10).max(255).required(),
  });
  return schema.validate(questionverify);
}

exports.questionSchema = questionSchema;
exports.Question = Question;
exports.validate = validatequestion;
