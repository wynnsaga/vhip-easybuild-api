import { printer } from "./printer.js";

const install = function (Vue) {
    Vue.prototype.$browserPrint = printer.browserPrint;

    Vue.prototype.$clientPrint = printer.clientPrint;

    Vue.prototype.$exportToPDF = printer.exportToPDF;

    Vue.prototype.$setPaperType = printer.setPaperType;

    Vue.prototype.$setPaperSize = printer.setPaperSize;

    Vue.prototype.$updateTemplate = printer.updateTemplate;

    Vue.prototype.$clearCanvas = printer.clearCanvas;

    Vue.prototype.$rotatePaper = printer.rotatePaper;

    Vue.prototype.$scaleContent = printer.scaleContent;
}

export const VhipPrinter = {
    ...printer,
    install
}