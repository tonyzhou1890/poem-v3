# poem-v3

> poem v3

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目说明

&emsp;&emsp;一个简单的诗词网站。功能不多，比较适合练手。词库来源于网络。

- 首页随机诗词

- 可根据作者、标题、内容搜索

- 可查看诗词列表

- 可查看作者列表

- 可查看作者诗词列表

- 可查看诗词详情

## 版本说明

### v3.0.0

1. 将多页网站（2.0）变成 spa 网站。所以页面文件前端管理，不再需要后端读取。

2. 真正做到前后端分离。前端负责页面，后端提供 api。

### v3.0.1

1. 添加 favicon.ico

2. 添加 v-loading 指令

### v3.1.0

1. 将点击 js 跳转换成 router-link