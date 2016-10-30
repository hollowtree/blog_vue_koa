# README

dem:1: 部署在VPS上，[http://demo.smalltree.me:3000/](http://demo.smalltree.me:3000/)，如果访问不了可能需要翻墙。

demo2（备用）: 部署在Heroku上，[https://hollowtree-koa-blog.herokuapp.com/](https://hollowtree-koa-blog.herokuapp.com/)。

### 启动
环境：Node && MongoDB
```
node start.js
```

### 简介
这个博客的框架采用了Koa，数据库采用了MongoDB，模板引擎用的是Nunjucks，前端获取数据采用的是Fetch，聊天室的前后端通信采用的是WebSocket。

博客中用了以下npm包：
```
"dependencies": {
    "babel-core": "^6.18.0",
    "babel-preset-stage-3": "^6.17.0",
    "koa": "^2.0.0-alpha.7",
    "koa-bodyparser": "^3.2.0",
    "koa-router": "^7.0.1",
    "koa-static": "^2.0.0",
    "marked": "^0.3.6",
    "mongoose": "^4.6.5",
    "nunjucks": "^2.5.2",
    "ws": "^1.1.1"
}
```