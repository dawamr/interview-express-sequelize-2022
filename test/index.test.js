const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const helpers = require('./helper');


describe('User API Endpoint Tests', () => { 
    it('GET /product', async () => {
        const response = await request(app)
        .get('/product');
        // console.log(response.body.success);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Get list data product.');
        expect(response.body).to.have.property('data');
    });

    it('POST /product', async () => {
        let product = {
            name:'Juice Lemon Test',
            qty:10,
            picture:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
            expiredAt:'2022-04-30'
        };

        const response = await request(app)
            .post('/product')
            .send(product);
        
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Success create product.');
        expect(response.body).to.have.property('data');
    });

    it('GET /product/:id', async () => {

        const product = await helpers.createProduct();

        const response = await request(app)
                .get(`/product/${product.product.id}`);

        // console.log(response.body.success);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Get data product.');
        expect(response.body).to.have.property('data');
    });

    it('PUT /product/:id', async () => {
        const updateData = {
            qty: 5,
        }
        
        const product = await helpers.createProduct();

        const response = await request(app)
        .put(`/product/${product.product.id}`)
        .send(updateData);

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Success update product.');
        expect(response.body).to.have.property('data');
    });

    it('DELETE /product/:id', async () => {
        const product = await helpers.createProduct();

        const response = await request(app)
        .delete(`/product/${product.product.id}`);              
        
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Success delete product.');
        expect(response.body).to.have.property('data');
    });

})