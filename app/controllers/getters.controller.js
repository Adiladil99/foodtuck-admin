const db = require("../models");
const fs = require("fs");
const Orders = db.order;
const User = db.client;
const { Sequelize, Op } = require('sequelize');

// Create and Save a new Product
exports.discounts = (req, res) => {
  db.discount_category.findAll({ 
    include: [
      {
        model: db.discount,
        as: 'disCategory',
      },
    ],
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
};

exports.categories = (req, res) => {
  db.category.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Нет данных."
      });
    });
};

exports.tables = (req, res) => {
  // db.table.findAll()
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Нет данных."
  //     });
  //   });
  const startTime = new Date(req.query.startTime);
  const endTime = new Date(req.query.endTime);
  db.table_reserv.findAll({
    where: {
      [Op.or]: [
        {
          startTime: {
            [Op.between]: [startTime, endTime],
          },
        },
        {
          endTime: {
            [Op.between]: [startTime, endTime],
          },
        },
      ],
    },
  })
    .then(reservations => {
        let ids = reservations.map(res => res.dataValues.id)
        db.table.findAll()
        .then(data => {
          const newData = data.map(item => {
            const reserv = ids.includes(item.dataValues.id) ? true : false;
            return { ...item.dataValues, reserv };
          });
          res.send(newData);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Нет данных."
          });
        });
      
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'An error occurred while executing the query.',
      });
    });
};