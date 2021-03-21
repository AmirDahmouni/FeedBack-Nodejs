const { Professor } = require("../models/professor");
const { User } = require("../models/user");
const { FeedBack } = require("../models/feedback");
const bcrypt = require("bcrypt");


exports.getAllProfessors=async (req, res) => {
    try {
      const professors = await Professor.find()
        .populate("userData","name lastname")
        .select("userData");
      if (!professors) return res.status(400).send("no professor found !");
      return res.send(professors);
    } catch (ex) {
      next(ex);
    }
}

exports.getById=async (req, res) => {
    try {
      const professor = await Professor.findById({ _id: req.params.id });
      if (!professor) return res.status(404).send("not found !");
      return res.send(professor);
    } catch (ex) {
      next(ex);
    }
}

exports.getProfessorByClass=async (req, res) => {
    const Professors = await Professor.find({
      classes: { $in: req.body.classId },
    })
      .populate("userData", "name lastname")
      .select("userData");
    res.send(Professors);
}

exports.getClasses=async (req, res) => {
    try {
      var classes = await Professor.find({ userData: req.user._id }).populate(
        "classes",
        "filiere niveau groupe avaible"
      );
      classes = classes[0].classes.filter((classe) => classe.avaible == true);
      res.send(classes);
    } catch (ex) {
      next(ex);
    }
}

exports.getSubjects=async (req, res) => {
    try {
      var subjects = await Professor.find({ userData: req.user._id })
        .populate("subjects")
        .select("subjects -_id");
      subjects = subjects[0].subjects.filter((s) => s.avaible == true);
      res.send(subjects);
    } catch (ex) {
      next(ex);
    }
}

exports.getSubjectsByProfId= async (req, res) => {
    try {
      var subjects = await Professor.find({ userData: req.body.profId })
        .populate("subjects")
        .select("subjects -_id");
      res.send(subjects[0].subjects);
    } catch (ex) {
      next(ex);
    }
}

exports.getFeedbacks=async (req, res) => {
    const feedbacks = await FeedBack.find({ professor: req.user._id })
      .populate("class", "filiere niveau groupe")
      .populate("subject")
      .select("-professor");
    res.send(feedbacks);
}

exports.deleteClass=async (req, res) => {
    await Professor.updateMany({ $pull: { classes: req.params.id } });
}

exports.addProfessor=async (req, res) => {
    try {
      const userexist=await User.findOne({adress:req.body.adress});
      if(userexist) return res.status(400).send("user already exist !!!");
      var userId;
      const userexistbyname = await User.findOneAndUpdate({ name:req.body.name,lastname:req.body.lastname },
        { 
        adress: req.body.adress,
        password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
        });
       
      if(userexistbyname!=null)
      {
        console.log(userexistbyname);
        userId=userexistbyname._id;
   
      }
      else{
         const user = new User({
         name: req.body.name,
         lastname: req.body.lastname,
         adress: req.body.adress,
         password: req.body.password,
         type: "professor",
         isAdmin: false,
         });
         const saltt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(user.password, saltt);
         await user.save();
         userId=user._id;
      }
      /****************************************************** */
      /*const { error } = validate(req.body);
      if (error) res.status(400).send(error.message);*/
      var professor = new Professor({
        classes: req.body.classes,
        subjects: req.body.subjects,
        userData: userId,
      });
      await professor.save();
      return res.send(professor);
    } 
    catch (ex) 
    {
      next(ex);
    }
}

exports.deleteProfessor=async (req, res) => {
    try {
      const professor = await Professor.findOneAndDelete({
        userData: req.params.id,
      }).then(
        async () =>
          await User.findOneAndUpdate(
            { _id: req.params.id },
            { adress: "", password: "" }
          )
      );
      if (!professor) return res.status(404).send("not found !");
      return res.send(professor);
    } catch (ex) {
      next(ex);
    }
}