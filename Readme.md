# vhip-easybuild-api

二次封装的用于构建vue-plugin-hiprint打印套件的函数库，简化你的代码

## Demo 地址
- [Vue2 项目](https://finneganwx.github.io/vhip-demo-vue2/)
    - vue2 + element ui
    - vue2 + tailwind css

- [Vue3 项目]()
    - 即将上线...

## 安装

```bash
npm install vhip-easybuild-api
```

## 导入

### 全局使用

全局导入会导入所有函数，在 `main.js` 中添加如下代码：

```js
// 1. 全部导入：一次性导入所有函数
import { EasyVhip } from 'vhip-easybuild-api';
Vue.use(EasyVhip, { autoConnect: false }); // autoConnect 是否自动连接打印客户端，默认true

// 2. 按需导入：有选择地导入需要使用地模块 
// VhipBuilder, VhipPrinter, VhipAsst, VhipUtil
import { VhipBuilder } from 'vhip-easybuild-api';
Vue.use(VhipBuilder);

// 我们提供了另一种方式，你可以通过参数进行配置
import { EasyVhip } from 'vhip-easybuild-api';
Vue.use(EasyVhip, {
    modules: ['build','print','assist','util'], // 需要导入的模块，默认全部导入
    autoConnect: false // autoConnect 是否自动连接打印客户端，默认true
});
```

### 局部导入

局部导入可以避免全局函数名污染，在组件 `<script>` 中添加如下代码：

```js
import { VhipBuilder, VhipPrinter, VhipAsst, VhipUtil } from 'vhip-easybuild-api';

// 局部导入无法一次性导入所有函数，下面的局部导入是无效的：
import { EasyVhip } from 'vhip-easybuild-api';
```


> 导入成功后就可以使用函数编写你的程序了，具体函数详情请参考文档 API 部分 ~

## API

> 全局引入时，函数名具有 `$` 前缀，你可以通过 `this.$functionName()` 的形式进行调用，例: `this.$createCoreObj()` .

### Builder

 | 函数名  | 返回值 | 备注 |
 | ------  | ------ | ------ |
 | createElemsGroup(groupName,elements) |  PrintElementTypeGroup 对象实例  | 创建元素分组 |
 | createProvider(providerName,...groups) |  Provider  | 创建初始化可用的 Provider |
 | initProviders(providers, initDefault = true) |  -  | 初始化元素提供程序，initDefault 控制是否初始化默认元素 |
 | buildElemsByUlist(providerName, containerKey) |  -  | 构建元素 |
 | buildElemsByHtml() |  -  | 构建元素 |
 | createCoreObj(options) |  PrintTemplate 对象实例 | 创建核心对象，可以通过 options 传入配置选项 |
 | design(hiprintTemplate,canvasContainer,options) |  -  | 创建核心对象，通过传入 html 构建 |


### Printer

 | 函数名  | 返回值 | 备注 |
 | ------  | ------ | ------ |
 | browserPrint(hiprintTemplate, printData, batchNum = 1) |  -  | 调用浏览器打印 |
 | clientPrint(hiprintTemplate, printData, batchNum = 1) |  -  | 调用客户端打印 |
 | exportToPDF(hiprintTemplate, printData, filename, options = {}) |  -  | 导出为 PDF |
 | setPaperType(hiprintTemplate,paperType) |  -  | 设置纸张类型 |
 | setPaperSize(hiprintTemplate, width, height) |  -  | 设置纸张尺寸 |
 | updateTemplate(hiprintTemplate, template) |  -  | 更新模板 |
 | clearCanvas(hiprintTemplate) |  -  | 清空画布 |
 | rotatePaper(hiprintTemplate) |  -  | 旋转纸张 |
 |scaleContent(hiprintTemplate, scale, save = true) |  -  | 缩放，save 控制是否在打印时保持缩放效果 |


 ### Assistant

| 函数名  | 返回值 | 备注 |
| ------  | ------ | ------ |
| getPrintHTML(hiprintTemplate, printData, options = {}) |  jquery对象 | 获取被打印的HTML|
| getPrintHTMLStr(hiprintTemplate, printData, options = {}) | string | 获取被打印的HTML元素字符串|
| getTemplateObj(hiprintTemplate) | Object | 获取模板对象 |
| exportTemplateJson(template, filename) | - | 导出模板对象的json到文件|

### Util

| 函数名  | 返回值 | 备注 |
| ------  | ------ | ------ |
| chooseImage(target) | - | 选择图片 |
| saveDataToFile(data, filetype, filename) | - | 保存数据到文件 |