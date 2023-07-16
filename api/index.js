const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Usar el Middelware para poder recibir información en formato JSON.

const whitelist = ['http://localhost:8080', 'http://myapp.co']; // las URL autorizadas a conectarse.
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error('Url No permitida'));
    }
  }
}
app.use(cors(options));// linea que habilita que dominios se pueden conectar a la API, en la variable options

app.get('/api', (req, res) => {
  res.send('Hola Mi server en Express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('listening on port ' + port);
});
