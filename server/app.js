const BodyParser = require('koa-bodyparser')
const Cookies = require('cookies')
const Koa = require('koa')
const KoaRouter = require('koa-router')()
const KoaStatic = require('koa-static')
const Mongoose = require('mongoose')

const routerController = require('./router')

const app = new Koa()

// --- mongoose --- //
Mongoose.connect('mongodb://localhost/blog')
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("we're connected!\n")
});

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})

// app.use(KoaStatic('./temp/'))
app.use(BodyParser())

KoaRouter.get('/v1/api/temp', routerController.getTemp())
// KoaRouter.post('/api/sign_up', routerController.signUp())
// KoaRouter.post('/api/send_status', routerController.sendStatus())
app.use(KoaRouter.routes())

const server = app.listen(4000, function () {
    console.log('Server running on http://localhost:4000/')
})