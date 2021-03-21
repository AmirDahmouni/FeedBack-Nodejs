const { Class, validate } = require("../models/class");


exports.getAllclasses= async (req, res) => {
    try {
      const classes = await Class.find({ avaible: true });
      res.send(classes);
    } catch (ex) {
      next(ex);
    }
  }

exports.getclassById=async (req, res) => {
    try {
      const classe = await Class.findById(req.params.id);
      if (!classe) return res.status(400).send("class not found");
      return res.send(classe);
    } catch (ex) {
      next(ex);
    }
  }

exports.getSubjectsByClassId=async (req, res) => {
    try {
      const subjects = await Class.findById({ _id: req.params.id })
        .populate("subjects")
        .select("subjects");
      res.send(subjects);
    } catch (ex) {
      next(ex);
    }
  }
exports.removeClass=async (req, res) => {
    try {
      let classe = await Class.findByIdAndDelete({ _id: req.params.id });
      if (!classe) return res.status(400).send("class not found !");
      return res.send(classe);
    } catch (ex) {
      next(ex);
    }
  }

exports.deleteClass=async (req, res) => {
    await Class.findByIdAndUpdate({ _id: req.params.id }, { avaible: false,subjects:[] });
  }

  exports.addClass=async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.message);
      var classexist=await Class.findOneAndUpdate(
        {filiere:req.body.filiere,niveau:req.body.niveau,groupe:req.body.groupe},
        {subjects:req.body.subjects,avaible:true});
        if(classexist){
          await classexist.save();
          return res.send(classexist);
        }
      const classe = new Class({
        filiere: req.body.filiere,
        niveau: req.body.niveau,
        groupe: req.body.groupe,
        subjects: req.body.subjects,
        avaible: true,
      });
      await classe.save();
      res.send(classe);
    } catch (ex) {
      next(ex);
    }
  }