import { builder } from './builder.js'

// 单独导入该模块
const install = function (Vue) {
    var version = Number(Vue.version.split('.')[0])
    if (version === 2) {
        Vue.prototype.$createElemsGroup = builder.createElemsGroup;
        Vue.prototype.$createProvider = builder.createProvider;
        Vue.prototype.$initProviders = builder.initProviders;
        Vue.prototype.$buildElemsByUlist = builder.buildElemsByUlist;
        Vue.prototype.$buildElemsByHtml = builder.buildElemsByHtml;
        Vue.prototype.$createCoreObj = builder.createCoreObj;
        Vue.prototype.$design = builder.design;
    } else if (version === 3) {
        Vue.config.globalProperties.$createElemsGroup = builder.createElemsGroup;
        Vue.config.globalProperties.$createElemsGroup = builder.createElemsGroup;
        Vue.config.globalProperties.$createProvider = builder.createProvider;
        Vue.config.globalProperties.$initProviders = builder.initProviders;
        Vue.config.globalProperties.$buildElemsByUlist = builder.buildElemsByUlist;
        Vue.config.globalProperties.$buildElemsByHtml = builder.buildElemsByHtml;
        Vue.config.globalProperties.$createCoreObj = builder.createCoreObj;
        Vue.config.globalProperties.$design = builder.design;
    } else {
        throw new Error('Vue version is not supported');
    }
}

export const VhipBuilder = {
    ...builder,
    install
};