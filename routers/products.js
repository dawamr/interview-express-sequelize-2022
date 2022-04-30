const express = require('express')
const product = express.Router();

const productController = require('../controllers').products

product.post('/', productController.create)
product.get('/', productController.list);
product.get('/:id', productController.detail);
product.put('/:id', productController.update);
product.delete('/:id', productController.delete);

module.exports = product;