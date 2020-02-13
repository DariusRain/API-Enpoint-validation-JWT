const router = require("express").Router();
const User = require("../model/User");
//Import bcrypt
const bcrypt = require("bcryptjs");

//Import Validation
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Exists");

  //Hash password with a salt
  //Salt is a random string that is used add extra string to the allready hashed
  //Password to make it harder to decode
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Add hashedPassword to databse schema
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser); //Resolved
  } catch (err) {
    res.status(401).send(err); //Rejected
  }
});

module.exports = router;
