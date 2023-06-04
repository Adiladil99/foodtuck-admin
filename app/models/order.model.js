module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: { 
      type: Sequelize.ENUM,
      values: ['Қабылданбады', 'Сәтті орындалды', 'Күтілуде'],
      defaultValue: 'Күтілуде'
    },
    payment: { 
      type: Sequelize.ENUM,
      values: ['Қолма-қол ақшамен', 'Kaspi QR', 'Карточкамен'],
      defaultValue: 'Қолма-қол ақшамен'
    },
    sum: {
      type: Sequelize.INTEGER
    },
    client_id: {      
      type: Sequelize.INTEGER
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Order;
};
