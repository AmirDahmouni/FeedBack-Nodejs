const { Subject, validate } = require("../models/subject");
//const { delete } = require("./questionanswer");


exports.getById=async (req, res) => {
    try {
      const subject = await Subject.findById({ _id: req.params.id });
      if (!subject) return res.status(400).send("subject not found");
      res.send(subject);
    } catch (ex) {
      next(ex);
    }
}
exports.deleteSubject=async (req, res) => {
    try {
      subject = await Subject.findByIdAndUpdate(
        { _id: req.params.id },
        { avaible: false }
      );
      if (!subject) return res.status(400).send("subject not found");
      return res.send(subject);
    } catch (ex) {
      next(ex);
    }
}
exports.getAllSubjects=async (req, res) => {
    try {
      const subjects = await Subject.find({ avaible: true });
      res.send(subjects);
    } catch (ex) {
      next();
    }
}

exports.addSubject=async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send("invalid subject");
      var subjectexist = await Subject.findOneAndUpdate(
        { name: req.body.name },
        { avaible: true }
      );
      if (subjectexist) {
        await subjectexist.save(); 
        return res.send(subjectexist);
      } 
      else {
        let subject = new Subject({ name: req.body.name, avaible: true });
        await subject.save();
        return res.send(subject);
      }
    } catch (ex) {
      next(ex);
    }
  }
