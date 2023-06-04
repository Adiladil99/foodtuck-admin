module.exports = (sequelize, Sequelize) => {
  const table_reserv = sequelize.define("table_reserv", {
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
    startTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    client_id: {      
      type: Sequelize.INTEGER
    },
    table_id: {      
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

  return table_reserv;
};
