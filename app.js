var bodyParser = require('koa-bodyparser');
var Cookies = require('cookies');
var koa = require('koa');
var mongoose = require('mongoose');
var router = require('koa-router')();
var serve = require('koa-static');
var WebSocket = require('ws');

var routerController = require('./controllers/router');

var app = new koa();

// --- mongoose --- //
// --- 当使用 mLab MongoDB 时，链接地址需做相应修改
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(serve('./static/'))
app.use(bodyParser());

// --- router --- //
router.get('/', routerController.getRoot());
router.get('/login', routerController.getLogin());
router.get('/logout', routerController.getLogout());
router.get('/user/:username/mood/:index', routerController.getMood());
router.get('/user/:username/log/:index', routerController.getLog());
router.get('/chatroom', routerController.getChatRoom());

router.post('/login', routerController.postLogin());
router.post('/logup', routerController.postLogup());
router.post('/user/:username/mood/:index', routerController.postMood());
router.post('/del/mood', routerController.delMood());
router.post('/user/:username/log', routerController.postLog());
router.post('/del/log', routerController.delLog());
router.post('/edit/log', routerController.editLog());
app.use(router.routes());


// --- process.env.PORT 是 mLab MongoDB的参数
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Server running on http://localhost:3000/');
});

var wss = new WebSocket.Server({
    server: server
});

wss.broadcast = function(data) {
    wss.clients.forEach(function(client) {
        client.send(data);
    });
};

wss.on('connection', function (ws) {
    let name = new Cookies(ws.upgradeReq, null).get('name');
    if (!name) {
        ws.close(4001, 'Invalid user');
    }
    console.log(name);
    // console.log(ws.upgradeReq);
    console.log(`[SERVER] connection()`);
    ws.on('message', function(message) {
        console.log(`[SERVER] Received: ${message}`);
        wss.broadcast(JSON.stringify({
            name: name,
            message:message
        }));
    })
});

// function chatTimer() {
//     wss.broadcast("123456");
//     // console.log(1234);
    
//     setTimeout(chatTimer, 3000);
// }
// setTimeout(chatTimer, 3000);