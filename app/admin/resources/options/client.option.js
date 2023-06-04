const { Components } = require('../../components/components.js')
const db = require("../../../models/index.js");
const sidebar = require("../navigation.js");
const getProducts = require('../actions/get-products.hook.js');


const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('../actions/upload-image.hook.js');


const options = {
  resource: db.client,
  options: {
    navigation: sidebar[1],
    properties: {
      createdAt: { isVisible: { list: false } },
      updatedAt: { isVisible: { list: false } },
      description: {
        type: 'richtext',
        custom: {
        toolbar: [['bold', 'italic'], ['link', 'image']],
        },
      },
      image: {
        isVisible: false,
      },
      uploadImage: {
        components: {
          edit: Components.UploadImage,
          list: Components.ImageList,
          show: Components.ImageShow,
        },
      },
    },
    actions: {
      new: {
        after: async (response, request, context) => {
          return uploadAfterHook(response, request, context);
        },
        before: async (request, context) => {
          // const translateBefore = await translateBeforeHook(request, context);
          return uploadBeforeHook(request, context);
        },
      },
      edit: {
        after: async (response, request, context) => {
          return uploadAfterHook(response, request, context);
        },
        before: async (request, context) => {
          return uploadBeforeHook(request, context);
        },
      },
    },
  },  
};

module.exports = options