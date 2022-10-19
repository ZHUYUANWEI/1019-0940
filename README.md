# DataCube

数据魔方

技术栈: vue3 + pinia + vue-router + TypeScript + Vite + Element-Plus + WindiCSS

- [DataCube](#datacube)
  - [IDE及插件 推荐](#ide及插件-推荐)
  - [自定义配置参考文档](#自定义配置参考文档)
  - [Project Setup](#project-setup)
  - [项目结构 （未完成）](#项目结构-未完成)
  - [约定](#约定)
    - [1. 模块化开发](#1-模块化开发)
    - [2. Element-Plus组件库](#2-element-plus组件库)
    - [3. WindiCss(功能类优先的 CSS 框架)](#3-windicss功能类优先的-css-框架)
      - [关于utility-first CSS framework(功能类优先的 CSS 框架)](#关于utility-first-css-framework功能类优先的-css-框架)
      - [推荐vscode插件：WindiCSS IntelliSense](#推荐vscode插件windicss-intellisense)
    - [4. 项目中使用 `unplugin-auto-import` 依赖](#4-项目中使用-unplugin-auto-import-依赖)
    - [5. 项目中使用 `unplugin-vue-components` 依赖](#5-项目中使用-unplugin-vue-components-依赖)
      - [`element-plus` 自动引入后主题修改](#element-plus-自动引入后主题修改)
    - [6. 项目中多色图标使用SVG，并使用SVG Sprite（雪碧图）进行优化](#6-项目中多色图标使用svg并使用svg-sprite雪碧图进行优化)
      - [`vite-plugin-svg-icons` 优点](#vite-plugin-svg-icons-优点)
    - [7. 项目中单色图标使用 `iconfont`](#7-项目中单色图标使用-iconfont)
    - [8. 项目中UI未提供的单色图标使用 `element-plus/icons` ，自动导入](#8-项目中ui未提供的单色图标使用-element-plusicons-自动导入)
    - [4. 组合式API(Composition-api)](#4-组合式apicomposition-api)
    - [5. 通用请求封装 & 接口请求调用方式](#5-通用请求封装--接口请求调用方式)
    - [6. 路由&菜单配置](#6-路由菜单配置)
    - [7. 项目中引入 `date-fns` 作为时间、日期处理工具集](#7-项目中引入-date-fns-作为时间日期处理工具集)

## IDE及插件 推荐

[VSCode](https://code.visualstudio.com/)

[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (需要禁用Vetur插件)

[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

[WindiCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense)

## 自定义配置参考文档

[Vite Config](https://vitejs.dev/config/)

[TypeScript Config](https://www.typescriptlang.org/zh/tsconfig)

[TypeScript Config](https://windicss.org/guide/configuration.html#example-configuration)

## Project Setup

```sh
# 安装
npm install

# 开发
npm run dev

# 仅打包
npm run build-only

# ts类型检查
npm run type-check

# 打包、ts类型检查
npm run build

# 预览打包的项目，有build后的文件才可正确运行
npm run preview

# lint
npm run lint
```

## 项目结构 （未完成）

    ├── public
    │   ├── index.html
    │   └── assets           - 项目通用的静态资源统一存放于此
    │       ├── images
    │       ├── fonts
    │       └── ...
    ├── src
    │   ├── components       - 公共组件
    │   ├── composables      - 公共组合式函数
    │   ├── modules          - 模块：根据业务逻辑划分的业务模块
    │   ├── router           - 路由
    │   ├── store            - pinia store
    │   ├── style            - 全局样式
    │   ├── utils            - 全局配置，通用辅助方法等
    │   ├── App.vue          - vue根组件
    │   ├── config.js        - 项目配置
    │   └── main.js          - 程序入口
    ├── tests                - 单元测试
    ├── storeCheck.js        - 用于检查store对象是否重复
    ├── vue.config.js        - vue-cli配置
    └── windi.config.js      - windicss配置

## 约定

### 1. 模块化开发

按照业务逻辑将项目拆分为模块，降低不同模块之间的代码耦合程度，UI 与业务数据处理分离，业务数据处理与接口分离，充分利用mvvm架构的特性，优化项目结构。
模块统一放在/src/modules中，一个典型模块的目录结构如下：

    [moduleName]
    ├── store                - pinia store
    ├── views                - 业务逻辑页面
    │   ├── components       - 业务逻辑内部用组件
    │   └── composables      - 使用组合式API时拆分出的各组合式函数
    ├── route.js             - 路由配置，名称须固定
    └── ...                  - 其他文件/文件夹

其中，store文件夹用于存放pinia store文件，不需要遍历引入，因为pinia会自动注册。
views文件夹存放该模块的各个页面文件。其中components文件夹存放仅用于该模块的组件，跨模块使用的组件请存放于/src/components下；composables文件夹用于存放使用组合式API拆分的组合式函数。

另，请注意业务逻辑的拆分粒度，逻辑拆分太粗/太细均会给开发带来不便。

另，modules文件夹可支持模块的嵌套，比如本项目中basic(综合管理)模块，只通过route.js来配置顶部菜单，通过嵌套org、system等子模块来实现多层次的模块划分。

### 2. Element-Plus组件库

项目使用Element-Plus组件库，详见[官网地址](https://element-plus.gitee.io/#/zh-CN)

### 3. WindiCss(功能类优先的 CSS 框架)

项目推荐使用windicss来编写样式，无需编写任何css/scss样式，直接在模版使用各种预定义的功能类。

#### 关于utility-first CSS framework(功能类优先的 CSS 框架)

目前主流的有两个：[tailwind](https://www.tailwindcss.cn/)和[windicss](https://windicss.org/)(官网可能需要科学上网才可访问)，其中windicss完全兼容tailwind，所以API文档只看tailwind也可以。详细用法见官方文档。

#### 推荐vscode插件：WindiCSS IntelliSense

### 4. 项目中使用 `unplugin-auto-import` 依赖

会自动在 `.vue` 文件中引入 `Vite、Vue、vue-route` 的API，相关配置详见 `vite.config.ts` 文件

```vue
// 原写法
import { computed, ref } from 'vue'
import { useRouter } from "vue-router"

const count = ref(0)
const doubled = computed(() => count.value * 2)

const router = useRouter()
router.push({ name: "error" })
```

```vue
// 新写法，不需要手动引入computed, ref, useRouter等
const count = ref(0)
const doubled = computed(() => count.value * 2)

const router = useRouter()
router.push({ name: "error" })
```

- 参考网址：[unplugin-auto-import](https://github.com/antfu/unplugin-vue-components#installation)

### 5. 项目中使用 `unplugin-vue-components` 依赖

会自动引入 `element-plus` 的组件，以及 `src/components` 目录下的组件 ，相关配置详见 `vite.config.ts` 文件

- 参考网址：[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation)
  
#### `element-plus` 自动引入后主题修改

- 参考网址：[官网：自定义主题](https://element-plus.gitee.io/zh-CN/guide/theming.html)
[element-plus 自动引入修改主题色](https://blog.csdn.net/weixin_42074421/article/details/122083789)

### 6. 项目中多色图标使用SVG，并使用SVG Sprite（雪碧图）进行优化

- 为了图标清晰，不会模糊和出现锯齿，项目中多色图标使用SVG，而不是使用图片；
- 为减少网络请求，通过 `vite-plugin-svg-icons` 依赖将所有svg文件生成一张SVG雪碧图只请求一次即可，相关配置详见 `vite.config.ts` 文件；

#### `vite-plugin-svg-icons` 优点

- 预加载 在项目运行时就生成所有图标,只需操作一次 dom
- 高性能 内置缓存,仅当文件被修改时才会重新生成

参考网址：[vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)
[SVG进阶-sprite 雪碧图](https://blog.csdn.net/baidu_38242832/article/details/115220009)

1. 第一步，将svg文件（例如Edit.svg）放到 `public/assets/svgIcons` 目录下；
2. 第二步，在vue文件中引入组件 `import SvgIcon from './components/SvgIcon.vue'`；
3. 第三步，在vue文件中使用组件 `<SvgIcon name="svg-Edit"></SvgIcon>` （dir/icon1.svg => svg-dir-icon1）；

> 注意：因为本项目使用了 `unplugin-vue-components` 依赖所以 `src/components` 目录下的组件会自动引入，所以在本项目中第二步可以省略

### 7. 项目中单色图标使用 `iconfont`

因为使用svg不方便随意更改颜色，所以单色图标通过`iconfont`图标库进行统一管理

1. 上传，需要开发人员从 `figma` 手动下载svg格式图标，上传到 `iconfont` 网站的 `DataCube` 项目(朱元伟);
2. 下载，下载图标库到 `/src/assets/iconfont` 目录下;
3. 引入，在 `index.html` 文件中，`<link rel="stylesheet" href="src/assets/iconfont/iconfont.css">`;
4. 使用，在vue文件中 `<i class="iconfont icon_SignOut="=></i>`;

参考网址：[iconfont](https://www.iconfont.cn/)

### 8. 项目中UI未提供的单色图标使用 `element-plus/icons` ，自动导入

因为项目中使用了自动导入，所以使用方法与官网有所不同

```vue
<template>
  <i-ep-Apple/> // 此处的ep，就是在配置文件中定义的参数
  <el-icon><i-ep-Apple /></el-icon> // 有没有el-icon包裹都可以
</template>
```

参考网址：[element-plus/icons图标 自动导入](https://qstdevelop.yuque.com/docs/share/0e497c94-a437-49d7-a9d6-a3fffac8a4b0?#)

### 4. 组合式API(Composition-api)

项目推荐使用组合式API来编写SFC，将逻辑复杂的组件，通过拆分为多个逻辑关注点，保存在不同的组合式函数中，来实现最大化的逻辑拆分和代码复用。具体见[官方文档](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E5%90%88%E5%BC%8F-api)

### 5. 通用请求封装 & 接口请求调用方式

项目使用了通用的Axios请求封装方法axiosRequest(位于/src/store/utils.js)，该方法自动处理错误提示，并通过各种回调函数处理请求中的各种状态。具体使用请见该方法的注释。代码示例见/src/modules/courseLib/store/courseList.js等。

接口请求统一使用pinia的action方式调用。代码示例见/src/modules/auth/store/auth.js等。

### 6. 路由&菜单配置

根据路由自动生成的菜单功能，相关逻辑都在/src/modules/layout的几个框架组件中。

项目中的常规页面布局均使用DefaultLayout.vue控制，其中包含了Header和Sidebar组件，这三个组件会结合路由的props&meta自定义属性，根据各个moduel的route.js来配置路由，并且自动生成顶部和左侧菜单。

ContentLayout或者ContentSidebarLayout组件带有自动面包屑功能，也是通过读取路由对象并且在meta中增加一些自定义属性来实现。

路由配置中个各自定义字段及注释：

```js
const exampleRoute = [
    {
        path: '/basic',
        props: {
            topMenuScope: 'default', // DefaultLayout根据这个prop属性过滤路由对象, 顶部菜单显示meta.topMenuScope === 'default'的路由
            leftMenuScope: 'basic', // DefaultLayout根据这个prop属性过滤路由对象, 左侧菜单显示meta.leftMenuScope === 'basic' 的路由
        },
        meta: {
            title: '综合管理', // 顶部菜单title
            topMenuScope: 'default', // 顶部菜单匹配标识，与DefaultLayout的props.topMenuScope匹配才会显示到当前顶部菜单上
            topMenuOrder: 1, // 顶部菜单显示的顺序
            pmsModule: 'base', // 所属权限模块
            pmsCode: 2, // 权限码
        },
        component: DefaultLayout,
    },
    {
        path: '/basic/system',
        props: {
            leftMenuScope: 'basic',
            topMenuScope: 'default',
        },
        meta: {
            icon: 'el-icon-setting', // 左侧菜单显示用图标
            title: '系统管理', // 左侧才到显示用标题
            leftMenuScope: 'basic', // 左侧菜单匹配标识，与DefaultLayout的props.leftMenuScope匹配才会显示到当前左侧菜单
            leftMenuOnlyChildren: false, // 是否仅显示Children内容到菜单上
            order: 2, // 菜单顺序号，此处为左侧菜单的顺序号
            pmsModule: 'base', // 对应的权限模块，用于权限过滤
            pmsCode: 256, // 对应的权限码，用于权限过滤
        },
        component: DefaultLayout,
        children: [
            {
                path: 'user',
                name: 'user',
                meta: {
                    icon: 'iconfont menuIcon icon-account-outline',
                    title: '用户管理',
                    breadCrumbLink: false, // 默认false可不写，用于自动面包屑判断是否显示返回按钮，比如当前页面如果有二级页面，则设置breadCrumbLink = true，保证在二级页面时自动面包屑带返回按钮且点击能返回此页面
                    topMenuActivePath: '/basic', // 当前页面对应的顶部菜单高亮的路由地址
                    pmsModule: 'base',
                    pmsCode: 1024,
                },
                component: User,
            },
            {
                path: 'message/messageDetail/:id',
                name: 'messageDetail',
                meta: {
                title: '消息详情',
                leftMenuIgnore: true, // 不在左侧菜单上显示
                topMenuActivePath: '/basic',
                leftMenuActivePath: '/basic/system/message', // 当前页面对应高亮的左侧菜单的路径
                replaceParam: ['id'], // 带路由参数的路径，需要指定对应的参数名称到replaceParam字段，以保证SideBar组件正确匹配高亮菜单
                },
                component: MessageDetail,
            },
        ]
    }
]
```

### 7. 项目中引入 `date-fns` 作为时间、日期处理工具集 

注意：date-fn与标准的标识字母有区别
https://github.com/date-fns/date-fns/blob/main/docs/unicodeTokens.md
https://date-fns.org/v2.29.3/docs/format

import { format } from 'date-fns'

format(1665310221000, "yyyy-MM-dd HH:mm:ss") 
//=> 2022-10-09 18:10:21