import { hiprint, defaultElementTypeProvider } from 'vue-plugin-hiprint';
import $ from 'jquery';

/**
 * 创建元素分组，将元素划分到分组下
 * @param {String} groupName 元素分组名称，使用 Simple Build 将会显示该名称
 * @param {Array} elements 元素数组
 * @returns {Object} PrintElementTypeGroup 
 */
function createElemsGroup(groupName, elements) {
    // 将函数转换成字符串
    function replacer(key, value) {
        if (typeof value === 'function') {
            return value.toString();
        }
        return value;
    }

    return new hiprint.PrintElementTypeGroup(
        groupName,
        JSON.parse(JSON.stringify(elements, replacer, 2))
    );
}

/**
 * 创建 Provider
 * @param {String} providerName provider 名称，建议使用英文
 * @param  {...any} groups 元素分组，
 * @returns {Object} provider
 */
function createProvider(providerName, ...groups) {
    return {
        addElementTypes: function (context) {
            context.removePrintElementTypes(providerName);
            context.addPrintElementTypes(providerName, groups);
        }
    }
}

/**
 * 初始化元素提供程序
 * @param {object | object[]} providers 元素提供程序数组, 当具有多个时应使用数组
 * @param {boolean} [initDefault=true]  是否初始化默认元素 Provider, 默认为 true
 */
function initProviders(providers, initDefault = true) {
    let providerArr = [];
    if (Array.isArray(providers)) {
        providerArr = providers
    } else if (providers) {
        providerArr.push(providers);
    }
    if (initDefault) {
        providerArr.push(defaultElementTypeProvider())
    }
    hiprint.init({
        providers: providerArr,
    });
}

/**
 * 构建元素. 该方式会将元素构建到指定容器上，是一种简单是构建方式
 * @param {String} providerName 提供程序名称 
 * @param {String} containerKey 容器元素标识，它可以是元素 class 或 id 的值（指定时需要带有符号），推荐使用 id，默认为 #vhip-element-box.
 */
function buildElemsByUlist(providerName, containerKey) {
    if ($(containerKey).length == 0) {
        throw new Error("[Vhip Error] 未找到指定元素，无法完成构建");
    }
    $(containerKey).empty();
    hiprint.PrintElementTypeManager.build($(containerKey), providerName);
}

/**
 * 构建元素. 该方式将元素构建到 class 为 .ep-draggable-item 的元素上，元素的渲染关系通过 tid 对应. 
 */
function buildElemsByHtml() {
    hiprint.PrintElementTypeManager.buildByHtml($(".ep-draggable-item"));
}

/**
 * 创建打印核心对象实例 hiprintTemplate
 * @param {Object} options 参数选项，例如 settingContainer, template, onImageChooseClick等，
 * 选项默认添加  settingContainer 属性，其默认值为 #vhip-setting-box，如果想指定容器请重写该属性. 
 * @returns hiprintTemplate
 */
function createCoreObj(options = {}) {
    if (!options.onImageChooseClick) {
        options.onImageChooseClick = (target) => {
            let input = document.createElement("input");
            input.setAttribute("type", "file");
            input.click();
            input.onchange = function () {
                var file = this.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function () {
                        target.refresh(reader.result);
                    }
                }
            }
            input.remove();
        }
    }
    return new hiprint.PrintTemplate(options)
}

/**
 * 模板设计
 * @param {Object} hiprintTemplate hiprintTemplate 对象实例
 * @param {String} containerKey 画布容器标识
 * @param {Boolean} showGrid 是否显示网格，默认为 true
 */
function design(hiprintTemplate, containerKey, showGrid = true) {
    if (!containerKey) {
        throw new Error(`[Vhip Error] 未指定画布容器`)
    }
    if (!($(containerKey).length)) {
        throw new Error(`[Vhip Error] 未找到指定元素 ${containerKey}.`);
    }
    $(containerKey).empty();
    hiprintTemplate.design(containerKey, { grid: showGrid });
}

// 局部导入
export const builder = {
    createElemsGroup,
    createProvider,
    initProviders,
    buildElemsByUlist,
    buildElemsByHtml,
    createCoreObj,
    design,
}

