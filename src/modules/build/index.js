import { builder } from './builder.js'

// 单独导入该模块
const install = function (Vue) {
    Vue.prototype.$createElemsGroup = builder.createElemsGroup;
    Vue.prototype.$createProvider = builder.createProvider;
    Vue.prototype.$initProviders = builder.initProviders;
    Vue.prototype.$buildElemsByUlist = builder.buildElemsByUlist;
    Vue.prototype.$buildElemsByHtml = builder.buildElemsByHtml;
    Vue.prototype.$createCoreObj = builder.createCoreObj;
    Vue.prototype.$design = builder.design;
}

export const VhipBuilder = {
    ...builder,
    install
};