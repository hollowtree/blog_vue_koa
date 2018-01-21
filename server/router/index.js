const crypto = require('crypto');
const ArticleModel = require('./db/article')
const UserModel = require('./db/user')

const checkToken = async (ctx) => {
    const token = ctx.cookies.get('token')
    const user = await UserModel.where({ token: token }).findOne()
    if (user) {
        return true
    }
    return
}

exports.getTemp = () => {
    return async (ctx, next) => {
        console.log(ctx.query)
        ctx.body = {
            data: {
                title: '登录 / 注册'
            },
            code: 0
        };
    };
};

exports.signUp = () => {
    return async (ctx, next) => {
        console.log(ctx.request.body.params.content)
        const cryptoPasswd = crypto.createHmac('sha512', ctx.request.body.params.passwd).digest('hex')
        let user = new UserModel({
            username: ctx.request.body.params.username,
            email: ctx.request.body.params.email,
            passwd: cryptoPasswd
        })
        await user.save(function (err, user) {
            if (err) {
                console.error(err)
                ctx.body = {
                    code: 500
                }
            }
            user.success()
            ctx.body = {
                code: 0
            }
        })
    }
}

exports.logIn = () => {
    return async (ctx, next) => {
        const cryptoPasswd = crypto.createHmac('sha512', ctx.request.body.params.passwd).digest('hex')
        let userInfo = await UserModel.where({
            email: ctx.request.body.params.email,
            passwd: cryptoPasswd
        }).findOne().exec()
        if (userInfo && userInfo.passwd === cryptoPasswd) {
            let updatedTime = userInfo.updatedAt.getTime(),
                now = (new Date()).getTime(),
                token = ctx.cookies.get('token')

            if (now - updatedTime > 1000 * 3600 * 12) {
                const token = crypto.createHmac('sha1', ctx.request.body.params.email + cryptoPasswd.slice(0, 10) + (new Date()).getTime()).digest('hex')
                userInfo.token = token
                userInfo.save()
                ctx.cookies.set('token', token, {
                    // httpOnly: false 
                })
                ctx.body = {
                    code: 0,
                    data: {
                        code: 0
                    }
                }
            } else if (!token) {
                let token = userInfo.token
                if (!token) {
                    token = crypto.createHmac('sha1', ctx.request.body.params.email + cryptoPasswd.slice(0, 10) + (new Date()).getTime()).digest('hex')
                    userInfo.token = token
                    userInfo.save()
                }
                ctx.cookies.set('token', token, {
                    // httpOnly: false 
                })
                ctx.body = {
                    code: 0,
                    data: {
                        code: 0
                    }
                }
            } else {
                ctx.body = {
                    code: 0,
                    data: {
                        code: 0
                    }
                }
            }
        } else {
            ctx.body = {
                code: 0,
                data: {
                    meg: 'something is wrong'
                }
            }
        }


    }
}

exports.getArticle = () => {
    return async (ctx, next) => {
        const articles = await ArticleModel.find({}).sort({ 'createdAt': -1 })
        let data = []
        articles.forEach(function (val) {
            if (val.kind !== 1) return
            data.push({
                createdAt: val.createdAt,
                author: val.author,
                title: val.title,
                content: val.content,
                id: val.id
            })
        })
        ctx.body = {
            code: 0,
            data: data
        }
    }

}

exports.postArticle = () => {
    return async (ctx, next) => {
        const isUser = await checkToken(ctx)
        if (!isUser) {
            ctx.body = {
                code: 0,
                data: {
                    code: 0,
                    msg: 'user error'
                }
            }
            return
        }
        let article = new ArticleModel({
            title: ctx.request.body.params.title,
            content: ctx.request.body.params.content,
            author: 'hollowtree'
        })
        if (ctx.request.body.params.id) {
            await ArticleModel.findByIdAndUpdate(ctx.request.body.params.id, {
                title: ctx.request.body.params.title,
                content: ctx.request.body.params.content,
            })
            ctx.body = {
                code: 0
            }
        } else {
            await article.save(function (err, article) {
                if (err) {
                    console.error(err)
                    ctx.body = {
                        code: 500
                    }
                }
                article.success()
                ctx.body = {
                    code: 0
                }
            })
        }
    }
}
exports.deleteArticle = () => {
    return async (ctx, next) => {
        const isUser = await checkToken(ctx)
        if (!isUser) {
            ctx.body = {
                code: 0,
                data: {
                    code: 0,
                    msg: 'user error'
                }
            }
            return
        }
        await ArticleModel.findByIdAndUpdate(ctx.request.query.id, { kind: 0 })
        ctx.body = {
            code: 0
        }
    }
}
