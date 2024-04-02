import { assistant } from "./assistant.js";

const install = function (Vue) {
    var version = Number(Vue.version.split('.')[0])
    if (version === 2) {
        Vue.prototype.$getPrintHTML = assistant.getPrintHTML;
        Vue.prototype.$getPrintHTMLStr = assistant.getPrintHTMLStr;
        Vue.prototype.$getTemplateObj = assistant.getTemplateObj;
        Vue.prototype.$exportTemplateJson = assistant.exportTemplateJson;
    } else if (version === 3) {
        Vue.config.globalProperties.$getPrintHTML = assistant.getPrintHTML;
        Vue.config.globalProperties.$getPrintHTMLStr = assistant.getPrintHTMLStr;
        Vue.config.globalProperties.$getTemplateObj = assistant.getTemplateObj;
        Vue.config.globalProperties.$exportTemplateJson = assistant.exportTemplateJson;
    } else {
        throw new Error('Vue version is not supported');
    }
}

export const VhipAsst = {
    ...assistant,
    install
};