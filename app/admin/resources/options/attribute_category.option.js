const { Components } = require('../../components/components.js')
const db = require("../../../models");
const sidebar = require("../navigation");

const {
  before: translateBeforeHook,
} = require('../actions/translate.hook');

const options = {
  resource: db.pr_attribute,
  options: {
    properties: {
      createdAt: { isVisible: { list: false } },
      updatedAt: { isVisible: { list: false } },    
      name: {
        components: {
          edit: Components.TranslateText,
        },
      },
    }, 
    actions: { 
      new: {
        before: async (request, context) => {
          return translateBeforeHook(request, context);
        },
      },
      edit: {
        before: async (request, context) => {
          return translateBeforeHook(request, context);
        },
      },
    },
    navigation: sidebar[0],
  },  
};

module.exports = options