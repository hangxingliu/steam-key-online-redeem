# Steam Key 在线激活

[->English README.md<-](README.md)

自动化的,可跨区的 Steam Key 在线批量激活工具 

例如:

- 将此程序部署于俄罗斯服务器上即可远程兑换俄区游戏的Key
- 用此程序可以一次性兑换拥有一对游戏Key的大包

位于香港的免费激活服务器: <https://steamis.me> .
感谢 [Htroy (@FsHtroy)](https://github.com/FsHtroy) 提供此演示服务器.

## 预览

![](screenshots/screenshot.png)

## 使用

### 安装 Node.js 相关环境

至少
[Node.js](https://nodejs.org/en/)
6.0

### 安装相关依赖,编辑配置文件

1. 在这个目录下运行`npm install --only=production`命令
2. 修改文件名`serverconfig.example.json`为`serverconfig.json`
3. [可选] 编辑 `serverconfig.json` 文件

### 运行程序(本地)

1. 运行命令`npm start`
2. 浏览器访问(默认3999端口)

### 运行程序(部署在远端)

1. 运行命令`npm install pm2 -g`
2. 运行命令`npm run deploy`
3. 浏览器访问(默认3999端口)


## 开源协议

[MIT](LICENSE)

## 作者

[LiuYue (@hangxingliu)](https://github.com/hangxingliu)

本项目是基于 [zyfworks/steam-key][ORIGINAL_REPO] 开发的

原作者: [Makazeu (@zyfworks)](https://github.com/zyfworks)


[ORIGINAL_REPO]: https://github.com/zyfworks