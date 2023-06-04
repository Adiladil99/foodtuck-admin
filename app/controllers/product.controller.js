const db = require("../models");
const fs = require("fs");
const Orders = db.order;
const User = db.client;
const Op = db.Sequelize.Op;

exports.getProducts = async (req, res) => {
  let categoryId = eval(req.query.category_id);
  let price = eval(req.query.price);
  let currencateginfo
  let where = {
  }
  categoryId ? where.category_id = categoryId : ''
  price ? where.price = {
    [Op.between]: price ? price : [0, 100000000]
  } : ''
  console.log(price);
  categoryId ? await db.category.findAll({
    where: {
      id: categoryId[0]
    }
  }).then(res => currencateginfo = res).catch(err => console.log(err)) : ''
  await db.product.findAll({
    include: [
      {
        model: db.product_images,
        as: 'productId',
      },
    ],
      where: where
    })
    .then(data => {
      res.send({
        products: data,
        category: currencateginfo
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Нет товаров 1."
      });
    });
};

exports.getProductBySlug = async (req, res) => {
  await db.product.findOne({
    include: [
      {
        model: db.product_images,
        as: 'productId',
      },
    ],
      where: {
        slug: req.query.slug
      }
    })
    .then(data => {
      res.send({
        products: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Нет товаров 1."
      });
    });
};