const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Agregamos bodyParser para parsear JSON en las solicitudes POST.

const { mongoConnect, getDb } = require('./database'); // Importa getDb desde database.js
const Product = require('./product');


const app = express();
app.use(cors());
app.use(bodyParser.json()); // Middleware para analizar el cuerpo JSON de las solicitudes POST.

mongoConnect(() => {
  app.listen(5000, () => {
    console.log('Servidor en ejecución en el puerto 5000');
  });
});

// Ruta GET para obtener todos los productos
app.get('/api/products', (req, res) => {
  const db = getDb();
  db.collection('products')
    .find()
    .toArray()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener los productos' });
    });
});

// Ruta POST para agregar un nuevo producto
app.post('/api/products', (req, res) => {
  console.log(req.body)
  const { title, price, description, imageUrl } = req.body;
  const product = new Product(title, price, description, imageUrl);
  product.save()
    .then(result => {
      res.status(201).json({ message: 'Producto creado exitosamente' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error al crear el producto' });
    });
});
