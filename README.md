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
### v4.0.1--2020.05.16
1. 解决 pwa 缓存首页导致无法更新网站的问题--全部不缓存
2. 解决布局使用 vh 在移动端 chrome 浏览器的（错位）兼容性问题--改成百分比

### v4.0.0--2020.05.16
1. 改名《品词轩》
2. 主题色改成青色
3. 首页随机
4. 移动端展示方式修改--增加 tab 栏
5. 增加专题和收藏页面
6. 增加 pwa 支持

### v3.3.0--2020.04.11
1. 更改 api -- 后端 api 已经用 node 重写

### v3.2.1
1. 解决路由忘加斜杠的问题。
2. 解决组件复用导致query变化而页面不刷新的问题。

### v3.2.0
1. 将路由模式换成 history 。
2. 首页不再是随机的。
3. 线上请求地址换成 https 。

### v3.1.2
1. 修复搜索结果标题tab和诗词tab颠倒的问题。

### v3.1.1
1. 统一各个页面的padding
2. 将导航栏的 js 跳转换成 router-link

### v3.1.0
1. 将点击 js 跳转换成 router-link

### v3.0.1
1. 添加 favicon.ico
2. 添加 v-loading 指令

### v3.0.0
1. 将多页网站（2.0）变成 spa 网站。所以页面文件前端管理，不再需要后端读取。
2. 真正做到前后端分离。前端负责页面，后端提供 api。