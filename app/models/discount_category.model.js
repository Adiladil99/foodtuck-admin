var slug = require('slug')
module.exports = (sequelize, Sequelize) => {
  const Discount_category = sequelize.define("discount_category", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
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

  return Discount_category;
};
