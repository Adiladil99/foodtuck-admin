const db = require("../../models");
const fs = require("fs");
const Cart = db.commentform;
const User = db.client;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  const cart = {
    name: req.body.name,
    phone: req.body.phone,
    comment: req.body.comment,
  };
    Cart.create(cart)
    .then(item => {
      res.send(item);
    }) 
    .catch(err => {
      res.status(500).send({
        message: err
      }); 
    });
};
