const { Components } = require('../../components/components.js')
const db = require("../../../models");
const sidebar = require("../navigation");
const getProducts = require('../actions/get-products.hook.js');

const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('../actions/password.hook');

const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('../actions/upload-image.hook');

const {
  before: translateBeforeHook,
} = require('../actions/translate.hook');

const options = {
  resource: db.adv,
  options: {
    navigation: sidebar[5],
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
      productsList: {
        isVisible: {
          edit: false,
          list: false,
          filter: false,
          show: true,
        },
        components: {
          show: Components.CharacteristicsList,
        },
        position: 999,
      },
    },
    actions: {
      new: {
        after: async (response, request, context) => {
          const modifiedResponse = await passwordAfterHook(response, request, context);
          return uploadAfterHook(modifiedResponse, request, context);
        },
        before: async (request, context) => {
          const modifiedRequest = await passwordBeforeHook(request, context);
          return uploadBeforeHook(modifiedRequest, context), translateBeforeHook(request, context);
        },
      },
      // dontTouchThis: {
      //   actionType: 'record',
      //   label: 'Характеристики товара',
      //   icon: 'DataViewAlt',
      //   // guard: 'youCanSetupGuards',
      //   component: Components.CharacteristicsProduct,
      //   handler: async (request, response, context) => {
      //     return {
      //       record: context.record.toJSON(),
      //     };
      //   },
      // },
      edit: {
        after: async (response, request, context) => {
          const modifiedResponse = await passwordAfterHook(response, request, context);
          return uploadAfterHook(modifiedResponse, request, context);
        },
        before: async (request, context) => {
          const modifiedRequest = await passwordBeforeHook(request, context);
          return uploadBeforeHook(modifiedRequest, context), translateBeforeHook(request, context);
        },
      },
      // show: {
      //   after: [getProducts()],
      // },
    },
  },  
};

module.exports = options