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
          sum: req.body.sum,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          table_id: req.body.table_id
        };
        await db.table_reserv.create(cart)
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
    db.table_reserv.findAll({ 
      include: [
        {
          model: db.table,
          as: 'tableId'
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