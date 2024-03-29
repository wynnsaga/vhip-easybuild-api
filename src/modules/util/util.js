/**
 * 选择本地图片渲染
 * @param {Object} target 被图片渲染的目标元素
 */
function chooseImage(target) {
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

/**
 * 导出数据到文件
 * @param {*} data 被导出的数据
 * @param {string} filetype 文件类型(后缀名)
 * @param {string} [filename] 文件名
 */
function saveDataToFile(data, filetype, filename) {
    if (!filename) {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        filename = `file_${timestamp}_${randomString}` + '.' + filetype; // 根据规则生成文件名
    }
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

export const util = {
    chooseImage,
    saveDataToFile
}