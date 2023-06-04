module.exports = (sequelize, Sequelize) => {
  const Callform = sequelize.define("callform", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [11,11],
      },
      unique: true
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'name']
      },
    ]
  });

  return Callform;
};
