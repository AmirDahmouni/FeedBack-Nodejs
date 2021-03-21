const { Questrep } = require("../models/quest-rep");
const { Answer } = require("../models/answer");


exports.getAll= async (req, res) => {
    try {
      const questreps = await Questrep.find();
      if (!questreps) return res.status(400).send("no question rep found !");
      return res.send(questreps);
    } catch (ex) {
      next(ex);
    }
}
exports.getById= async (req, res) => {
    try {
      const questrep = await Questrep.findById({ _id: req.params.id });
      if (!questrep) return res.status(400).send("no question rep found !");
      return res.send(questrep);
    } catch (ex) {
      next(ex);
    }
}
exports.getnbbad=async (req, res) => {
    try {
      var idanswer=await Answer.findOne({answer:"bad"}).select("_id").then(res=>res._id);
      const nb = await Questrep.find({
        feedback: req.params.idfeed,
        question: req.params.idquest,
        answer: idanswer,
      }).count();
      return res.send(nb.toString());
    } catch (ex) {}
}
exports.getnbnotbad=async (req, res) => {
    try {
      var idanswer=await Answer.findOne({answer:"not bad"}).select("_id").then(res=>res._id);
      
    const nb = await Questrep.find({
      feedback: req.params.idfeed,
      question: req.params.idquest,
      answer: idanswer,
    }).count();
    return res.send(nb.toString());
    } catch (ex) {}
}
exports.getnbgood=async (req, res) => {
    try {
      var idanswer=await Answer.findOne({answer:"good"}).select("_id").then(res=>res._id);
      const nb = await Questrep.find({
      feedback: req.params.idfeed,
      question: req.params.idquest,
      answer: idanswer,
    }).count();
    return res.send(nb.toString());
    } catch (ex) {}
}
exports.getnbverygood=async (req, res) => {
    try {
      var idanswer=await Answer.findOne({answer:"very good"}).select("_id").then(res=>res._id);
      const nb = await Questrep.find({
      feedback: req.params.idfeed,
      question: req.params.idquest,
      answer: idanswer,
    }).count();
   return  res.send(nb.toString());
  }
  catch(ex){}
}
exports.getnbexcell= async (req, res) => {
    try {
      var idanswer=await Answer.findOne({answer:"excellent"}).select("_id").then(res=>res._id);
     const nb = await Questrep.find({
      feedback: req.params.idfeed,
      question: req.params.idquest,
      answer: idanswer,
    }).count();
    return res.send(nb.toString());
  }
  catch(ex){}
}
exports.deletebyquestion= async (req, res) => {
    try {
      const questionrep = await Questrep.deleteMany({
        question: req.params.id,
      });
      return res.send(questionrep);
    } catch (ex) {}
}
exports.delete=async (req, res) => {
    try {
      const questrep = await Questrep.findByIdAndDelete({ _id: req.params.id });
      if (!questrep) return res.status(400).send("no question rep found !");
      return res.send(questrep);
    } catch (ex) {
      next(ex);
    }
  }
exports.vote=async (req, res) => {
    try {
      const questrep = new Questrep({
        question: req.body.question,
        answer: req.body.answer,
        feedback: req.body.feedback,
      });
      await questrep.save();
      return res.send(questrep);
    } catch (ex) {
      next(ex);
    }
}