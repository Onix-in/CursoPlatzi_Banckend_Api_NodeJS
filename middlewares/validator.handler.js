const boom = require('@hapi/boom');

function validatorHandler(schema, property) { //recibe el schema y (property) decimos donde encontrar la infirmación.
  return (req, res, next) => {//retorna un middleware de forma dinamica, con la propiedad de closures de JS.
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });// para que arroje todos los equiovaciones de las validadiones a la vez
    if (error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
