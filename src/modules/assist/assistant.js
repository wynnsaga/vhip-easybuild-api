import { util } from "../utils/util.js";

/**
 * 获取打印 HTML
 * @param {Object} hiprintTemplate hiprintTemplate 对象实例
 * @param {Object | Object[]} printData 打印数据，如果想批量打印则传入数组，如批量打印3份 [printData, printData, printData].
 * @param {Object} [options] hiprint 扩展选项 {@link https://ccsimple.gitee.io/sv-print-docs/config/template.html}
 * @returns 打印 HTML 的 jquery 对象
 */
function getPrintHTML(hiprintTemplate, printData, options = {}) {
    if (printData) {
        return hiprintTemplate.getHtml(printData, options);
    } else {
        console.warn("[Vhip Warning] No print data is available.");
        return hiprintTemplate.getHtml({}, options);
    }
}

/**
* 获取打印 HTML 的字符串表示
* @param {Object} hiprintTemplate hiprintTemplate 对象实例
* @param {Object | Object[]} printData 打印数据，如果想批量打印则传入数组，如批量打印3份 [printData, printData, printData]，不需要数据时传入空对象 {}.
* @param {Object} [options] hiprint 扩展选项 {@link https://ccsimple.gitee.io/sv-print-docs/config/template.html}
* @returns HTML 字符串
*/
function getPrintHTMLStr(hiprintTemplate, printData, options = {}) {
    if (printData) {
        return hiprintTemplate.getHtml(printData, options)[0].innerHTML;
    } else {
        console.warn("[Vhip Warning] No print data is available.");
        return hiprintTemplate.getHtml({}, options)[0].innerHTML;
    }

}

/**
 * 获取模板对象
 * @param {Object} hiprintTemplate  hiprintTemplate 实例对象
 * @returns {Object} 模板对象
 */
function getTemplateObj(hiprintTemplate) {
    return hiprintTemplate.getJson();
}

/**
 * 导出模板对象的 json 格式到文件
 * @param {Object} template 模板对象
 * @param {string} [filename] 文件名，不设置文件名时将按内置规则生成
 */
function exportTemplateJson(template, filename) {
    const data = JSON.stringify(template, null, 4);
    util.saveDataToFile(data, 'json', filename);
}

/**
 * 提取模板中的呀元素为 provider 可用格式
 * @param {Object} templateJson 
 * @returns {Array} 元素数组
 */
function extractElements(templateJson) {
    // 提升属性
    function elevateProperties(obj) {
        const result = {};
        result.tid = '';
        result.text = obj.printElementType.title;
        for (const key in obj.printElementType) {
            result[key] = obj.printElementType[key];
        }
        result.options = obj.options;
        return result;
    }

    // 格式转换
    function convertElement(printElements) {
        let elements = [];
        printElements.forEach(item => {
            let element = elevateProperties(item);
            elements.push(element);
        });
        return elements;
    }

    // 提取元素
    let results = [];
    const panels = templateJson.panels;
    panels.forEach(panel => {
        let result = {};
        result.index = panel.index;
        result.elements = convertElement(panel.printElements);
        results.push(result);
    });
    return results;
}

/**
 * 更新页码位置。该函数用于再纸张宽高发生变化后更新页码的位置，函数返回更新后的坐标，通过参数指定是否进行更新
 * @param {Object} hiprintTemplate 打印实例对象
 * @param {Function} trigger 触发函数，更新页码位置将在触发函数执行后进行
 * @param {Boolean} autoUpdate 是否自动更新，默认为 true
 * @returns 新的页码位置坐标对象 \{ paperNumberLeft, paperNumberTop \}，单位为 pt
 */
function keepPageNumberBottomRight(hiprintTemplate, trigger, autoUpdate = true) {
    const index = hiprintTemplate.editingPanel.index;
    const oldPanel = hiprintTemplate.getJson().panels[index];
    const oldSize = {
        H: oldPanel.height,
        W: oldPanel.width
    };

    // 更新paper
    trigger();

    const newPanel = hiprintTemplate.getJson().panels[index];
    const newSize = {
        H: newPanel.height,
        W: newPanel.width,
    };

    const ratio = oldPanel.paperFooter / oldPanel.height;
    let x = newPanel.paperNumberLeft;
    let y = newPanel.paperNumberTop;
    if (newSize.H > oldSize.H) {
        // H 变大
        // 计算 y 坐标(pt)
        y = newSize.H * ratio - 22;
    }
    if (newSize.W > oldSize.W) {
        // W 变大
        // 计算 x 坐标(pt)
        x = newSize.W * ratio - 30;
    }

    if (autoUpdate) {
        newPanel.paperNumberTop = y;
        newPanel.paperNumberLeft = x;
        newPanel.paperNumberFormat = oldPanel.paperNumberFormat;
        const template = hiprintTemplate.getJson();
        template.panels[index] = newPanel;
        hiprintTemplate.update(template);
    }

    return {
        paperNumberLeft: x,
        paperNumberTop: y
    }
}

export const assistant = {
    getPrintHTML,
    getPrintHTMLStr,
    getTemplateObj,
    exportTemplateJson,
    extractElements,
    keepPageNumberBottomRight
};