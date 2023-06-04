const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
  timezone: '+06:00',
  // dialectOptions: {
  //   connectTimeout:100000
  // },
  // dialectOptions: {
  //   allowPublicKeyRetrieval: true,
  // },
  operatorsAliases: '0',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
// const sequelize = new Sequelize('mysql://172.17.0.2:3306/ecommerce?allowPublicKeyRetrieval=true')

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.client = require("./client.model.js")(sequelize, Sequelize);
db.callform = require("./callform.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.discount_category = require("./discount_category.model.js")(sequelize, Sequelize);
db.discount_images = require("./discount_images.model.js")(sequelize, Sequelize);
db.discount = require("./discount.model.js")(sequelize, Sequelize);
db.product_images = require("./product_images.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.order_list = require("./order_list.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.table_reserv = require("./table_reserv.model.js")(sequelize, Sequelize);
db.table = require("./table.model.js")(sequelize, Sequelize);

db.product.hasMany(db.product_images, { foreignKey: 'product_id', as: 'productId' });
db.order.hasMany(db.order_list, { foreignKey: 'order_id', as: 'orderId' });
db.product.belongsTo(db.category, { foreignKey: 'category_id', as: 'categoryId' });
db.table_reserv.belongsTo(db.table, { foreignKey: 'table_id', as: 'tableId' });
db.table_reserv.belongsTo(db.client, { foreignKey: 'client_id', as: 'clientId' });

db.discount.hasMany(db.discount_images);
db.discount_category.hasMany(db.discount, { foreignKey: 'dis_category', as: 'disCategory' });

db.order.belongsTo(db.client, { foreignKey: 'client_id', as: 'clientId' });
// db.order_list.belongsTo(db.order, { foreignKey: 'order_id', as: 'orderId' });

db.order_list.belongsTo(db.product, { foreignKey: 'product_id', as: 'productId' });

// db.car = require("./products/car.model.js")(sequelize, Sequelize);
// db.tarrif = require("./products/tarrif.model.js")(sequelize, Sequelize, db.car);

// db.cities = require("./others/cities.model.js")(sequelize, Sequelize);
// db.country = require("./others/country.model.js")(sequelize, Sequelize);
// db.callform = require("./others/callform.model.js")(sequelize, Sequelize);
// db.commentform = require("./others/commentform.model.js")(sequelize, Sequelize);


// db.order = require("./orders/order.model.js")(sequelize, Sequelize, db.tarrif, db.client);
// db.car.hasMany(db.tarrif, {as: 'carAs', foreignKey: 'car_id'});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
