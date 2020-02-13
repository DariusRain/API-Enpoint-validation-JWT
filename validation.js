// Neaten Up code
const Joi = require("@hapi/joi");


const registerValidation = (data) => {
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
      
      return schema.validate(data)
  
}

const loiginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
          .min(6)
          .required()
          .email(),
        password: Joi.string()
          .min(6)
          .required()
      });
      
      return schema.validate(data)
  
    }



module.exports.registerValidation = registerValidation;
module.exports.loiginValidation = loiginValidation;
