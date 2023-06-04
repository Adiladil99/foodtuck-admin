
const { Components } = require('../../components/components.js')
const db = require("../../../models");
const sidebar = require("../navigation");


const options = {
  resource: db.category_characteristics,
  options: {
    navigation: false,
    properties: {
      createdAt: { isVisible: { list: false } },
      updatedAt: { isVisible: { list: false } },
    },
    actions: {
      new: {
        showInDrawer: true,
      },
    },
  },
}

module.exports = options