const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

//Import Validation
const { registerValidation, loiginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.status(201).send({user: user._id}); //Resolved
  } catch (err) {
    res.status(401).send(err); //Rejected
  }
});


//Login


router.post("/login", async (req, res) => {

    //Use the login validation Joi schema from the validation.js file
    const { error } = loiginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if email is a email registered
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Ivalid Username and or Password");  

    //Validate password with bcrypt.compare
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send("Invalid Username and or Password")

    //Create and assin a token
    //Takes two arguments an object and a token secret
    const token = jwt.sign({_id: user._id}, process.env.JWT)
    res.header('auth-token', token).send(token)
   // res.send('Logged in!')
})
module.exports = router;
