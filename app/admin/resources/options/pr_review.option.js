const { Components } = require('../../components/components.js')
const db = require("../../../models");
const sidebar = require("../navigation");

const {
  before: uploadBeforeHook,
} = require('../actions/translate.hook');

const options = {
  resource: db.pr_reviews,
  options: {
    properties: {
      createdAt: { isVisible: { list: false } },
      updatedAt: { isVisible: { list: false } },    
      negative: {
        type: 'richtext'
      },
      positive: {
        type: 'richtext'
      },
      comment: {
        type: 'richtext'
      }
    },
    navigation: sidebar[0],
  },  
};

module.exports = options