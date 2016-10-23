# Readme
App 中采用了koa、nunjucks、mongoose、babel等工具。

```
Buffer.from('huil').toString('base64')
Buffer.from('aHVpbA==', 'base64').toString()
require('crypto').createHash('md5').update("hlijmblibi").digest('hex');
```

### 笔记
#### 异步的两种写法
```
app.use(function*() {
    var temp = yield nameModel.find();
    console.log(temp);
    this.body = 'Hi';
})
app.use(async(ctx, next) => {
    var temp = await nameModel.find();
    ctx.response.body = 'Hi';
})
```

#### 静态文件处理
用`koa-static`方便些，不过也可以如下处理：
```
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');
app.use(async(ctx, next) => {
    var url = '/static/',
        dir = __dirname + '/static';
    let rpath = ctx.request.path;
    if (rpath.startsWith(url)) {
        let fp = path.join(dir, rpath.substring(url.length));
        if (await fs.exists(fp)) {
            ctx.response.type = mime.lookup(rpath);
            ctx.response.body = await fs.readFile(fp);
        } else {
            ctx.response.status = 404;
        }
    } else {
        await next();
    }
})
```

#### 重启服务
[nodemon](https://github.com/remy/nodemon/)

### 部署App

#### MongoDB
由于 MongoDB 最新版本不再支持32位 CentOS Linux 系统，所以安装了 MongoDB 2.6 [[说明文档](https://docs.mongodb.com/v2.6/tutorial/install-mongodb-on-red-hat/)]。

###### 配置YUM
创建`/etc/yum.repos.d/mongodb.repo`文件来保存配置信息
```
[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/i686/
gpgcheck=0
enabled=1
```

###### 安装 MongoDB 软件包及相关工具
```
sudo yum install -y mongodb-org
```

###### 配置 SELinux
创建`/etc/selinux/config`文件来关闭 SELinux
```
SELINUX=disabled
```

###### MongoDB 相关命令
启动：`service mongod start`

停止：`service mongod stop`

重启：`service mongod restart`

#### 进程守护
[forever](https://github.com/foreverjs/forever)