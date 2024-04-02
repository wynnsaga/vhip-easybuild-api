import { printer } from "./printer.js";

const install = function (Vue) {
    var version = Number(Vue.version.split('.')[0])
    if (version === 2) {
        Vue.prototype.$browserPrint = printer.browserPrint;
        Vue.prototype.$clientPrint = printer.clientPrint;
        Vue.prototype.$exportToPDF = printer.exportToPDF;
        Vue.prototype.$setPaperType = printer.setPaperType;
        Vue.prototype.$setPaperSize = printer.setPaperSize;
        Vue.prototype.$updateTemplate = printer.updateTemplate;
        Vue.prototype.$clearCanvas = printer.clearCanvas;
        Vue.prototype.$rotatePaper = printer.rotatePaper;
        Vue.prototype.$scaleContent = printer.scaleContent;
    } else if (version === 3) {
        Vue.config.globalProperties.$browserPrint = printer.browserPrint;
        Vue.config.globalProperties.$clientPrint = printer.clientPrint;
        Vue.config.globalProperties.$exportToPDF = printer.exportToPDF;
        Vue.config.globalProperties.$setPaperType = printer.setPaperType;
        Vue.config.globalProperties.$setPaperSize = printer.setPaperSize;
        Vue.config.globalProperties.$updateTemplate = printer.updateTemplate;
        Vue.config.globalProperties.$clearCanvas = printer.clearCanvas;
        Vue.config.globalProperties.$rotatePaper = printer.rotatePaper;
        Vue.config.globalProperties.$scaleContent = printer.scaleContent;
    } else {
        throw new Error('Vue version is not supported');
    }
}

export const VhipPrinter = {
    ...printer,
    install
}