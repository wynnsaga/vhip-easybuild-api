import { util } from "./util.js";

const install = function (Vue) {
    Vue.prototype.$chooseImage = util.chooseImage;
    Vue.prototype.$saveDataToFile = util.saveDataToFile;
}

export const VhipUtil = {
    ...util,
    install
}