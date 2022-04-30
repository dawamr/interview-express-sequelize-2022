# interview-express-sequelize-2022

# be-nodejs-expressjs

### Task
The **backend** side will manage `product`, with REST over HTTP API request:
1. Create Web Server App using `Express.js` or `Hapi` to handle product data✅
2. Backend side should use SQL database engine such: `Postgres/SQL Server/MySQL` wrapped with **ORM**✅
3. For **ORM** library, please use `Sequelize/Knex` for `migration`, `seeding`, and `data processing` (CRUD). Prevent using sql script directly!✅
4. Create `migration` for product schema with fields: ✅
    * id: `BIGINT`
    * name: `VARCHAR`
    * qty: `INT`
    * picture: `TEXT` with Base64 value
    * expiredAt: `DATE` YYYY-MM-DD
    * isActive: `BOOLEAN`
5. Don't forget to `seed` it with some initial data.✅
6. HTTP response and request body payload should formated in **JSON** format✅
7. Describe your endpoint as a **REST**, this is available endpoints for manage product:
    * Add product: `/POST` `/product`✅
    * Get products: `/GET` `/product`✅
    * Get product by id: `/GET` `/product/:id`✅
    * Remove product by id: `/DELETE` `/product/:id`✅
    * Update product by id: `/PUT` `/product/:id`✅
6. With **REST** specification:
    * For getting product should returned with `true` value in `isActive` field✅
    * Filtering product by specific criteria, sorter and pagination product is optional.✅
    * While deleting product, we use "soft delete" with set `isActive` field to `false`✅
    * Post a product always set `isActive` value to `true`✅
    * Updating product should block `isActive` value from body payloads✅
7. Endpoint of logging activity, unit testing, and `Swagger` API docs are optional✅
8. Write clean and effective code for example: proper project structure, exception handling, parameterize config, etc.✅
9. Push your work to your **GitHub** repository, make sure your repository accessible to public.✅

# Instalation

Install semua dependencies yang dibutuhkan menggunakan `npm` atau bisa juga dengan menggunakan `yarn` :
```
npm install or yarn install
```
Salin `.env.example` menjadi `.env` lalu gunakan konfigurasi disini
```
NODE_ENV = development
PORT = 4002
```
Membuat database dan tabel dalam mode `development` :
```
npm run db:start
```
Membuat database dan tabel dalam mode `testing` :
```
npm run db:test:start
```
Menjalankan test :
```
npm run test
```
Jalankan servernya, bisa dengan menggunakan `npm` atau `yarn` :
```
npm run start or yarn start
```
Dokumtasi dan sample ada disini
`URL` : `https://documenter.getpostman.com/view/18078111/UyrGBZTo`