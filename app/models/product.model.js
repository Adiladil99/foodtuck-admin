var slug = require('slug')
module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define("products", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING,
      unique: true
    },    
    mini_desc: {
      type: Sequelize.STRING
    }, 
    long_desc: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    category_id: {
      type: Sequelize.INTEGER
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ],
    hooks : {
      beforeCreate : (record, options) => {
          record.dataValues.slug = slug(record.dataValues.name);
      },
      beforeUpdate : (record, options) => {
        record.dataValues.slug = slug(record.dataValues.name);
      }
    }
  });

  return Products;
};
