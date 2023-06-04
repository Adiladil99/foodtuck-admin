
const { Components } = require('../../components/components.js')
const db = require("../../../models");
const sidebar = require("../navigation");

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

const getCharacteristics = require('../actions/get-characteristics.hook.js');
const getBrandsCategory = require('../actions/get-brandsCategory.hook.js');

// const categoryHandler = async (request, response, context) => {
//   // console.log(context._admin);
//   const { record, currentAdmin } = context
//           return {
//             record: record.toJSON('sadasdsad'),
//             msg: 'asdasd'
//           }
// }

const options = {
  resource: db.pr_category,
  options: {
    navigation: sidebar[0],
    properties: {
      createdAt: { isVisible: { list: false } },
      updatedAt: { isVisible: { list: false } },
      id: {
        isTitle: true
      },
      image: {
        isVisible: false,
      },
      name: {
        components: {
          edit: Components.TranslateText,
        },
      },
      slug: {
        isVisible: {
          edit: false,
          list: false,
          show: true,
        },
      },
      uploadImage: {
        components: {
          edit: Components.UploadImage,
          list: Components.ImageList,
          show: Components.ImageShow,
        },
      },
      parentId: {
        components: {
          // edit: Components.LinkId,
          list: Components.LinkIdList,
          show: Components.LinkIdShow,
        },
        label: 'parentID'
      }
    },
    actions: {
      dontTouchThis: {
        actionType: 'record',
        icon: 'DataViewAlt',
        // guard: 'youCanSetupGuards',
        component: Components.CharacteristicsCategory,
        handler: async (request, response, context) => {
          return {
            record: context.record.toJSON(),
          };
        },
        after: [getCharacteristics()],
      },
      brandsCategory: {
        actionType: 'record',
        icon: 'CollapseCategories',
        // guard: 'youCanSetupGuards',
        component: Components.BrandsCategory,
        handler: async (request, response, context) => {
          return {
            record: context.record.toJSON(),
          };
        },
        after: [getBrandsCategory()],
      },
      new: {
        after: async (response, request, context) => {
          // const modifiedResponse = await passwordAfterHook(response, request, context);
          return uploadAfterHook(request, context);
        },
        before: async (request, context) => {
          // const modifiedRequest = await passwordBeforeHook(request, context);
          return uploadBeforeHook(context), translateBeforeHook(request, context);
        },
      },
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
    },
  },  
};

module.exports = options