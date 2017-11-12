# STEAM KEY ONLINE REDEEM

[->中文文档<-](README.zh-CN.md)

You can redeem steam game keys automatically in local or remote.

For example:

- Deploy server in other countries to redeem keys in that region.
- Redeem a key-bundle by just one click

HongKong demo server: <https://steamis.me> .
Thanks [Htroy (@FsHtroy)](https://github.com/FsHtroy) for supporting this server.

## 1.2.1 (2017/11/10)

0. Fix bugs on Node.js 6
1. More export filting options.
2. Retry "DoesNotOwnRequiredApp" later automatically.
3. Wait 1 hour for continuing redeem when rate limited.
4. Display server information.
5. Add security information.

[CHANGELOG.md](CHANGELOG.md)

## Screenshot

![](screenshots/screenshot.png)


## How to use

### Installing Node.js Environment

At least
[Node.js](https://nodejs.org/en/)
6.0

### Installing dependencies, Configuring 

1. Execute command `npm install --only=production`
2. Rename file `serverconfig.example.json` to `serverconfig.json`
3. [Optional] Configure `serverconfig.json`

### Launching(Local)

1. Execute command `npm start`
2. Open in browser(Default port is 3999)

### Launching(Deploy in server)

1. Execute command `npm install pm2 -g`
2. Execute command `npm run deploy`
3. Open in browser(Default port is 3999)

## License

[MIT](LICENSE)

## Authors

[LiuYue (@hangxingliu)](https://github.com/hangxingliu)

This project is based on [zyfworks/steam-key][ORIGINAL_REPO].

Original author: [Makazeu (@zyfworks)](https://github.com/zyfworks)



[ORIGINAL_REPO]: https://github.com/zyfworks
