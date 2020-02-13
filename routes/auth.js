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

//Add async for any function fetching data.
router.post("/register", async (req, res) => {

    //Validation with  Joi

    //Without destructuring
    // const validation = schema.validate(req.body);
    
    //Object destructuring
    //To get the error message properly
    const { error } = schema.validate(req.body)

    


    res.send(error.details[0].message)
})
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   });

//   try {
//     const savedUser = await user.save();
//     res.status(201).send(savedUser); //Resolved
//   } catch (err) {
//     res.status(401).send(err); //Rejected
//   }
// });

module.exports = router;
