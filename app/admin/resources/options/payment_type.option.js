
const { Components } = require('../../components/components.js')
const db = require("../../../models");
const sidebar = require("../navigation");

const {
  before: uploadBeforeHook,
} = require('../actions/translate.hook');

const options = {
  resource: db.or_payment_type,
  options: {
    navigation: sidebar[6],
    properties: {
      createdAt: { isVisible: { list: false } },
      updatedAt: { isVisible: { list: false } },
      name: {
        components: {
          edit: Components.TranslateText,
        },
      },
      description: {
        components: {
          edit: Components.TranslateText,
        },
      },
    },
    actions: {
      new: {
        before: async (request, context) => {
          return uploadBeforeHook(request, context);
        },
      },
      edit: {
        before: async (request, context) => {
          return uploadBeforeHook(request, context);
        },
      },
      // save: {
      //   before: () => {
      //     console.log('save'); 
      //   }
      // }
    },
  },  
};

module.exports = options