const express = require('express');
const ProductsServices = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsServices();

router.get('/', async (req, res) => { // Siempre se espera es una lista de prodcutos, la respesta es un array
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => { // las Rutas (endpoints) especificas se deben crear antes que las rutas dinamicas
  res.send('Yo soy un filter')
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {//parametro id que se obtiene de la URL
    try{
        const { id } = req.params;
        // if(id === '999'){
        //   res.status(404).json({
        //     message: 'Not fount'
        //   });
        // } else{
        //   res.status(200).json({
        //     id,
        //     name: "Product 2",
        //     price: 2000
        //   });
        // }
        const product = await service.findOne(id);
        res.status(200).json(product);
    } catch(error){
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => { //metdodo POST para para recibir la inforación desde el cliente
    const body = req.body;
    const newProduct = await service.create(body);
    // res.status(201).json({
    //   message: 'created',
    //   data: body
    // });
    res.status(201).json(newProduct);
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => { //metdodo PATCh para para modificar la inforación desde el cliente, pero solo 1 propiedad a modifcar.
    try {
      const { id }= req.params;
      const body = req.body;
      const product = await service.update(id, body);
      // res.json({
      //   message: 'update',
      //   data: body,
      //   id
      // });
      res.json(product);
    } catch(error) {
      //res.status(404).json({ message: error.message });
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => { //metdodo DELETE para para Elimitar un elemento, recibe un identifador para saber cual elemento va eliminar.
  const { id }= req.params;
  const rta = await service.delete(id);
  // res.json({
  //   message: 'deleted',
  //   id
  // });

  res.json(rta);
})

module.exports = router;
