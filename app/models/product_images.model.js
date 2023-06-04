module.exports = (sequelize, Sequelize) => {
  const Product_images = sequelize.define("product_images", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    image: {
      type: Sequelize.STRING
    },
    product_id: {
      type: Sequelize.INTEGER
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Product_images;
};
