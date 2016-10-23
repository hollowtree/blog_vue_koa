var bodyParser = require('koa-bodyparser');
var koa = require('koa');
var mongoose = require('mongoose');
var router = require('koa-router')();
var serve = require('koa-static');

var routerController = require('./controllers/router');

var app = new koa();

// --- mongoose --- //
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    // console.log(ctx.request);

    await next();
});
app.use(serve('./static/'))
app.use(bodyParser());

// --- router --- //
router.get('/', routerController.getRoot());
router.get('/login', routerController.getLogin());
router.get('/user/:name/mood/:index', routerController.getMood());

router.post('/login', routerController.postLogin());
router.post('/logup', routerController.postLogup());
router.post('/user/:name/mood/:index', routerController.postMood());


// router.get('/json/:type/:index', routerController.getJson());

app.use(router.routes());
app.listen(3000, function () {
    console.log('Server running on https://localhost:3000');
});