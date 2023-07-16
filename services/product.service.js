const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsServices{

    constructor () {
        this.products = [];
        this.generate();
    }

    generate() {
      const limit = 10;  // http://localhost:3000/products?size=20 -> numero de productos que quiero que muestre
      for(let index = 0; index < limit; index++) {
        this.products.push({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean(),
        });
      }
    }

    async create(data){
      const newProduct = {
        id: faker.datatype.uuid(),
        ...data
      }
      this.products.push(newProduct);
      return newProduct;
    }

    async find(){
      return new Promise((resolve, reject) =>{
        setTimeout(() =>{
          resolve(this.products);
        }, 5000)
      })
      //return this.products;
    }

    async findOne(id){
      //const name = this.getTotal(); // es una linea para forzar una error y hacer pruebas
      // return this.products.find(item => item.id === id);
     const product = this.products.find(item => item.id === id);
      if(!product){
        throw boom.notFound('Product not found');
      }
      if (product.isBlock) {
        throw boom.conflict('Product is block')
      }
      return product;
    }

    async update(id, changes){
      const index = this.products.findIndex(item => item.id === id);
      if(index === -1){
        // throw new Error('Product not found');
        throw boom.notFound('Product not found'); //esta libreria ya sabe que el error es un 404
      }
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      };
      return this.products[index];
    }

    async delete(id){
      const index = this.products.findIndex(item => item.id === id);
      if(index === -1){
        // throw new Error('Product not found');
        throw boom.notFound('Product not found');
      }
      this.products.splice(index, 1);
      return { id };
    }
}

module.exports = ProductsServices;
