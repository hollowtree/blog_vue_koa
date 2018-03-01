const BodyParser = require('koa-bodyparser')
// const Cookies = require('cookies')
const Koa = require('koa')
const KoaRouter = require('koa-router')()
const KoaStatic = require('koa-static')
const Mongoose = require('mongoose')

const routerController = require('./router')
const config = require('../config')

const app = new Koa()
const dbTableName = require('../config').dbTableName || 'blog'

// --- mongoose --- //
Mongoose.connect('mongodb://localhost/' + dbTableName)
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("we're connected!\n")
});

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})

app.use(KoaStatic(__dirname + '/dist/'))
app.use(BodyParser())

KoaRouter.post('/v1/api/sign_up', routerController.signUp())
KoaRouter.post('/v1/api/log_in', routerController.logIn())


KoaRouter.get('/v1/api/temp', routerController.getTemp())
KoaRouter.get('/v1/api/get_article', routerController.getArticle())
KoaRouter.post('/v1/api/post_article', routerController.postArticle())
KoaRouter.delete('/v1/api/delete_article', routerController.deleteArticle())
app.use(KoaRouter.routes())

var port = config.port || 4000
const server = app.listen(port, function () {
    console.log('Server running on http://localhost:' + port)
    console.log(`This process's pid is ${process.pid}`);
})