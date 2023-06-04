const { Components } = require('../../components/components.js')
const db = require("../../../models");
const sidebar = require("../navigation");

const options = {
  resource: db.sh_addresses,
  options: {
    navigation: false,
    properties: {
      createdAt: { isVisible: { list: false } },
      updatedAt: { isVisible: { list: false } },
      pharmacyId: { 
        components: {
          edit: Components.IdPrevPage,
        }, 
      },
    },
    actions: {       
      list: {
        showFilter: false,
      },
    }
  },  
};

module.exports = options 