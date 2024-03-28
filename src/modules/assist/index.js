import { assistant } from "./assistant.js";

const install = function (Vue) {
    Vue.prototype.$getPrintHTML = assistant.getPrintHTML;
    Vue.prototype.$getPrintHTMLStr = assistant.getPrintHTMLStr;
    Vue.prototype.$getTemplateObj = assistant.getTemplateObj;
    Vue.prototype.$exportTemplateJson = assistant.exportTemplateJson;
}

export const VhipAsst = {
    ...assistant,
    install
};