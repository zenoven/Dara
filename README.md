# Dara

Another download APP based on aria2 with electron, dva and antd

## Roadmap

### v0.1

- [] 整体布局
  - [] header
  - [] content
- [] 添加下载任务
- [] 下载列表
  - [] 正在下载
  - [] 已暂停
  - [] 已完成/已取消
- 下载详情


## 使用

### 开发

```bash
npm run dev
npm start
```

## 目录结构

采用 [Two package.json Structure](https://www.electron.build/tutorials/two-package-structure)

```
+ app
  + dist              // src 目录打包完放这里，分 main 和 renderer
  - package.json      // 生产依赖，存 dependencies
+ build               // background.png, icon.icns, icon.ico
+ dist                // pack 完后的输出，.dmg, .exe, .zip, .app 等文件
+ src
  + main              // main
  + renderer          // renderer
- package.json        // 开发依赖，存 devDependencies
- webpack.config.js   // 给 main 用的 webpack 配置
```

## 打包
```shell
npm run pack

# 不打 dmg、exe 包，本地验证时用
npm run pack:dir

# 不重复做 webpack 层的构建和 rebuild，本地验证打包流程用
npm run pack:dirOnly
```


## 参考

* [umi-example-electron
](https://github.com/umijs/umi-example-electron)
* [Electron 应用实战 (架构篇)](https://github.com/sorrycc/blog/issues/13)
* https://github.com/sorrycc/dva-boilerplate-electron
* https://www.electron.build/configuration/configuration
