const Product = require('../models').Product;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    create(req, res, next) {
        return Product
        .create({
            name: req.body.name,
            qty: req.body.qty,
            picture: req.body.picture,
            expiredAt: req.body.expiredAt,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(result => {
            return Product.findOne({
                where: {
                    id: result.dataValues.id
                }
            })
            .then(newData => {
                req.data = newData;
                resp.ok(true, "Success create product.", req.data, res)
            })
        })
        .catch((error) => {
            resp.ok(false, "Failed create product.", null, res.status(500));
        });
    },

    list(req, res, next) {
        let orderBy = 'name';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};

        if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
            orderBy = req.query.order_by;
        }
        if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
            sortBy = req.query.sort_by;
        }
        if ((req.query.page != undefined) && (req.query.page.length > 0)) {
            page = req.query.page;
        }
        if ((req.query.per_page != undefined) && (req.query.per_page.length > 0)) {
            perPage = req.query.per_page;
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)) {
            options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('Product.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
        }

        // filter active
        options.isActive = sequelize.where(sequelize.col('Product.isActive'), '=', true);

        let {
            offsetResult,
            perPageResult,
            showPageResult
        } = pagination.builder(perPage, page);

        return Product
        .findAndCountAll({
            where: options,
            order: [
                [orderBy, sortBy]
            ],
            limit: perPageResult,
            offset: offsetResult,
        })
        .then(productResult => {
            let totalPage = Math.ceil(productResult.count / perPage);
            let data = resp.paging(productResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, productResult.count);

            resp.ok(true, "Get list data product.", data, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data product.", null, res.status(400));
            console.log(error);
        });
    },

    detail(req, res) {
        return Product
        .findByPk(req.params.id)
        .then(productResult => {
            if (!productResult) {
                resp.ok(false, "product not found.", null, res.status(404));
            }

            resp.ok(true, "Get data product.", productResult, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get product.", null, res.status(500));
            console.log(error);
        });
    },

    update(req, res) {
        return Product
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                
                if (!result) {
                    resp.ok(false, "product not found.", null, res.status(404));
                }
        
                return result
                    .update({
                        name: (req.body.name != undefined) ? req.body.name : result.name,
                        qty: (req.body.qty != undefined) ? req.body.qty : result.qty,
                        picture: (req.body.picture != undefined) ? req.body.picture : result.picture,
                        expiredAt: (req.body.expiredAt != undefined) ? req.body.expiredAt : result.expiredAt,
                        updatedAt: new Date()
                    })
                    .then(result2 => {
                        return Product
                            .findByPk(result2.id)
                            .then(result3 => {
                                resp.ok(true, "Success update product.", result3.dataValues, res);
                            })
                    })
                    .catch((error) => {
                        resp.ok(false, "Failed update product.", null, res.status(500));
                        console.log(error);
                    });
            })
            .catch((error) => {
                resp.ok(false, "Failed update product.", null, res.status(500));
                console.log(error);
            });
    },

    delete(req, res) {
        return Product
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                
                if (!result) {
                    resp.ok(false, "product not found.", null, res.status(404));
                }
        
                return result
                    .update({
                        isActive: false,
                        updatedAt: new Date()
                    })
                    .then(result2 => {
                        return Product
                            .findByPk(result2.id)
                            .then(result3 => {
                                resp.ok(true, "Success delete product.", result3.dataValues, res);
                            })
                    })
                    .catch((error) => {
                        resp.ok(false, "Failed delete product.", null, res.status(500));
                        console.log(error);
                    });
            })
            .catch((error) => {
                resp.ok(false, "Failed delete product.", null, res.status(500));
                console.log(error);
            });
    },
    
}