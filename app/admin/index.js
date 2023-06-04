// const { default: AdminJS } = require("adminjs/types/src");
const db = require("../models");
const ru = require("./locale/ru.js");
const { Components, componentLoader } = require('./components/components.js')

const themes = require("./theme/theme");
const sidebar = require("./resources/navigation");

const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
  } = require('./resources/actions/upload-image.hook');

const dashboardHandler = async (request, response, context) => {
    // console.log(context._admin);
    var datas = db.car.findAll()
    // console.log(datas);
    return datas
}
const newPageHandler = async () => {
    return { message: 'Hello World' }
}

module.exports = {
 resources: [
    {
        resource: db.client,
        options: {
            navigation: sidebar[1],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.product,
        options: {
            navigation: sidebar[0],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
                long_desc: {
                    type: 'richtext',
                },
                mini_desc: {
                    type: 'richtext',
                },
            },
        },
    },
    {
        resource: db.product_images,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
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
                    return uploadBeforeHook(request, context)
                },
                },
                edit: {
                    after: async (response, request, context) => {
                    return uploadAfterHook(response, request, context);
                    },
                    before: async (request, context) => {
                    return uploadBeforeHook(request, context)
                    },
                },
                // show: {
                //   after: [getProducts()],
                // },
            },
        },
    },
    {
        resource: db.callform,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.table,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
                description: {
                    type: 'richtext',
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
                    return uploadBeforeHook(request, context)
                },
                },
                edit: {
                    after: async (response, request, context) => {
                    return uploadAfterHook(response, request, context);
                    },
                    before: async (request, context) => {
                    return uploadBeforeHook(request, context)
                    },
                },
                // show: {
                //   after: [getProducts()],
                // },
            },
        },
    },
    {
        resource: db.table_reserv,
        options: {
            navigation: sidebar[1],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.category,
        options: {
            navigation: sidebar[0],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
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
                    return uploadBeforeHook(request, context)
                },
                },
                edit: {
                    after: async (response, request, context) => {
                    return uploadAfterHook(response, request, context);
                    },
                    before: async (request, context) => {
                    return uploadBeforeHook(request, context)
                    },
                },
                // show: {
                //   after: [getProducts()],
                // },
            },
        },
    },
    {
        resource: db.discount,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.discount_category,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.discount_images,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.order,
        options: {
            navigation: sidebar[1],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.order_list,
        options: {
            navigation: sidebar[1],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
 ],
//  pages: {
//     Көліктер: {
//         name: 'Көліктер',
//         handler: newPageHandler,
//         component: Components.MyInput,
//     },  
//     Тарифтер: {
//         name: 'Тарифтер',
//         handler: newPageHandler,
//         component: Components.MyInput1,
//     },    
//     Клиенттер: {
//         name: 'Клиенттер',
//         handler: newPageHandler,
//         component: Components.MyInput2,
//     }, 
//  },
 rootPath: '/admin',
 locale: {
  language: 'en',
  translations: ru
 },
 branding: {
    logo: '/logo.png',
    favicon: '/favicon.png',
    companyName: 'Foodtuck',
    withMadeWithLove: false,
    theme: themes
 },
 assets: {
    styles: ["/custom.css"]
 },
 dashboard: {
    component: Components.Dashboard,
    handler: dashboardHandler
 },
 componentLoader,
}