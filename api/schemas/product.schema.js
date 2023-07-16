const Joi = require('joi');

const id = Joi.string().uuid();
//const name = Joi.string().alphanum().min(3).max(15); // esta configuracion no acepta nombre con espacios
const name = Joi.string().min(3).max(15).empty('').default('default value'); //para que tomar strings con espacios
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
