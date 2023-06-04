var slug = require('slug')
module.exports = (sequelize, Sequelize) => {
  const Discounts = sequelize.define("discounts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    mini_desc: {
      type: Sequelize.STRING
    },
    dis_category: {
      type: Sequelize.INTEGER
    }
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

  return Discounts;
};
