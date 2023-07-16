const express = require('express');

const router = express.Router();

router.get('/categories/:categoryId/products/:productId', (req, res) => {//parametros id de categorias y productos, 2 paramentros que se obtienen de la URL
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  })
});

module.exports = router;
