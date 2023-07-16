const express = require('express');

const router = express.Router();

//QUERY PARAMS
router.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if(limit && offset) {
    res.json({ limit, offset})
  } else {
    res.send('No hay parametros')
  }

});

module.exports = router;
