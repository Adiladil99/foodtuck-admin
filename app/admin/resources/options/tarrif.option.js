const { Components } = require('../../components/components.js')
const db = require("../../../models/index.js");
const sidebar = require("../navigation.js");

const options = {
  resource: db.tarrif,
  options: {
    properties: {
      createdAt: { isVisible: { list: false } },
      updatedAt: { isVisible: { list: false } },    
    },
    navigation: sidebar[0],
  },  
};

module.exports = options