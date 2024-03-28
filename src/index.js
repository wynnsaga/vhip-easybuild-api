import { hiPrintPlugin } from 'vue-plugin-hiprint';

import { VhipBuilder } from './modules/build/index.js';
import { VhipPrinter } from './modules/print/index.js';
import { VhipAsst } from "./modules/assist/index.js";
import { VhipUtil } from './modules/utils/index.js';

export const EasyVhip = {
    install: function (Vue, {
        modules = ['build', 'print', 'assist', 'utils'],
        autoConnect = true
    } = {}) {
        if (modules.includes('build')) {
            VhipBuilder.install(Vue);
        }
        if (modules.includes('print')) {
            VhipPrinter.install(Vue);
        }
        if (modules.includes('assist')) {
            VhipAsst.install(Vue);
        }
        if (modules.includes('utils')) {
            VhipUtil.install(Vue);
        }
        if (!autoConnect) {
            hiPrintPlugin.disAutoConnect();
        }
    }
}

export {
    VhipBuilder,
    VhipPrinter,
    VhipAsst,
    VhipUtil
}