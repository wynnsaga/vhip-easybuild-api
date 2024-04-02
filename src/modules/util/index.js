import { util } from "./util.js";

const install = function (Vue) {
    var version = Number(Vue.version.split('.')[0])
    if (version === 2) {
        Vue.prototype.$chooseImage = util.chooseImage;
        Vue.prototype.$saveDataToFile = util.saveDataToFile;
    } else if (version === 3) {
        Vue.config.globalProperties.$chooseImage = util.chooseImage;
        Vue.config.globalProperties.$saveDataToFile = util.saveDataToFile;
    } else {
        throw new Error('Vue version is not supported');
    }
}

export const VhipUtil = {
    ...util,
    install
}