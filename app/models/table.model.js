module.exports = (sequelize, Sequelize) => {
  const Table = sequelize.define("table", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    prepayment: {
      type: Sequelize.INTEGER
    },
    number_seats: {
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'name']
      },
    ]
  });

  return Table;
};
