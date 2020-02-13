const router = require("express").Router();
const User = require("../model/User");

//Import Validation
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //Shortened
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Email Issue:

//Check the databse for email if true then return error else proceed.
  const emailExist = await User.findOne({ email: req.body.email});
  if(emailExist) return res.status(400).send('Email Exists')


  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser); //Resolved
  } catch (err) {
    res.status(401).send(err); //Rejected
  }
});

module.exports = router;
