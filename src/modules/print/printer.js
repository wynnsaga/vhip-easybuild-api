/**
 * 浏览器打印. 函数调用浏览器窗口完成打印，函数接收一个可选的参数用来批量打印，数量默认为 1.
 * @param {Object} hiprintTemplate 打印实例对象
 * @param {Object} printData 数据
 * @param {number} [batchNum=1] 批量数量，默认为 1
 */
const browserPrint = function (hiprintTemplate, printData, batchNum = 1) {
    if (batchNum < 1 || !Number.isInteger(batchNum)) {
        throw new Error("[Vhip Error] The batchNum must be a positive integer.");
    }
    if (!printData) {
        printData = {};
    }
    const dataArray = Array.from({ length: batchNum }, () => printData);
    hiprintTemplate.print(dataArray);
}

/**
 * 客户端打印. 函数调用打印客户端进行打印，这意味着你需要提前准备好打印客户端. 函数接收一个可选的参数用来批量打印，数量默认为 1.
 * @param {Object} hiprintTemplate 打印实例对象
 * @param {Object} printData 数据
 * @param {number} [batchNum=1] 批量数量，默认为 1
 */
const clientPrint = function (hiprintTemplate, printData, batchNum = 1) {
    if (batchNum < 1 || !Number.isInteger(batchNum)) {
        throw new Error("[Vhip Error] The batchNum must be a positive integer.");
    }
    if (!printData) {
        printData = {};
    }
    const dataArray = Array.from({ length: batchNum }, () => printData);
    hiprintTemplate.print2(dataArray);
}

/**
 * 导出为 PDF. 函数用于导出内容为 PDF, 可以指定文件名，如果不，则会按内置规则生成文件名.
 * @param {Object} hiprintTemplate 打印实例对象
 * @param {Object} printData 数据
 * @param {string} filename 文件名 
 * @param {Object} options 配置项
 */
const exportToPDF = function (hiprintTemplate, printData, filename, options = {}) {
    if (!printData) {
        printData = {};
    }
    if (!filename) {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        filename = `file_${timestamp}_${randomString}`; // 根据规则生成文件名
    }
    hiprintTemplate.toPdf(printData, filename, options);
}

/**
 * 设置纸张类型
 * @param {Object} hiprintTemplate 打印实例对象
 * @param {string} paperType 纸张类型，取值：A[1,8] B[1,8]，忽略大小写
 * @throws {RangeError} 取值不在可选范围内
 * @example
 * // set A4 paper
 * setPaperType(hiprintTemplate, 'A4')
 */
const setPaperType = function (hiprintTemplate, paperType) {
    const pattern = /^(A|B)[1-8]$/i;
    if (!pattern.test(paperType)) {
        throw new RangeError("[Vhip Error] The paperType must be A[1,8] or B[1,8].");
    }
    hiprintTemplate.setPaper(paperType);
}

/**
 * 设置纸张尺寸. 对于纸张类型无法满足要求可以设置宽高
 * @param {Object} hiprintTemplate 打印实例对象
 * @param {number} width 宽
 * @param {number} height 高
 * @throws {TypeError} 必需指定宽和高
 * @example
 * //  A4 paper: width - 210 height - 297
 * setPaperSize(hiprintTemplate, 210, 297)
 */
const setPaperSize = function (hiprintTemplate, width, height) {
    if (!width || !height) {
        // 抛出异常，宽高必需都存在
        throw new TypeError("[Vhip Error] The width and height must be exist.");
    }
    hiprintTemplate.setPaper(width, height);
}

/**
 * 更新模板
 * @param {Object} hiprintTemplate 打印实例对象
 * @param {Object} template 模板对象
 */
const updateTemplate = function (hiprintTemplate, template) {
    hiprintTemplate.update(template);
}

/**
 * 清空纸张. 函数会清空画布上的内容，但并不更换纸张大小
 * @param {Object} hiprintTemplate 打印实例对象
 */
const clearCanvas = function (hiprintTemplate) {
    hiprintTemplate.clear();
}

/**
 * 旋转纸张
 * @param {Object} hiprintTemplate 打印实例对象
 */
const rotatePaper = function (hiprintTemplate) {
    hiprintTemplate.rotatePaper();
}

/**
 * 放缩内容. 函数实现放缩元素功能，接收一个可选参数表示是否保存放缩，开启会在打印时以放缩结果显示，默认为 true
 * @param {Object} hiprintTemplate 打印实例对象
 * @param {number} scale 尺寸规模 
 * @param {boolean} save 是否保存放缩 
 */
const scaleContent = function (hiprintTemplate, scale, save = true) {
    hiprintTemplate.zoom(scale, save);
}

export const printer = {
    browserPrint,
    clientPrint,
    exportToPDF,
    setPaperType,
    setPaperSize,
    updateTemplate,
    clearCanvas,
    rotatePaper,
    scaleContent,
}