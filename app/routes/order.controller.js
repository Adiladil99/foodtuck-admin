const db = require("../models");
const fs = require("fs");
const Orders = db.order;
const User = db.client;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  User.findByPk(req.userId)
  .then(async data => {
        const cart = {
          client_id: req.userId,
          payment: req.body.payment,
          status: req.body.status,
          total: req.body.sum,
        };
        let products = eval(req.body.products_id)
        let orderId
        await db.order.create(cart)
        .then(res => {
          orderId = res
        })
        console.log(JSON.stringify(orderId));
        for (let index = 0; index < products.length; index++) {
          products[index].order_id = orderId.dataValues.id
        }
        db.order_list.bulkCreate(products)
          .then(item => {
            res.send(item);
          }) 
          .catch(err => {
            res.status(500).send({
              message:
                "Такой продукт не найден!"
            }); 
          });
    })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Orders."
    }); 
  });  
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  User.findByPk(req.userId)
  .then(data => {
    Orders.findAll({ 
      include: [
        {
          model: db.order_list,
          as: 'orderId',
          include: [
            {
              model: db.product,
              as: 'productId'
            },
          ],
        },
      ],
      where: { client_id: req.userId }, 
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Нет данных."
        });
      });
  })  
};