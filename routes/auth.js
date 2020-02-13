const router = require("express").Router();
const User = require("../model/User");
const Joi = require("@hapi/joi");


//Joi schema
const schema = Joi.object({
  name: Joi.string() //These methods are similar to mongoose 
    .min(6) 
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});


router.post("/register", async (req, res) => {
    const { error } = schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)


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
