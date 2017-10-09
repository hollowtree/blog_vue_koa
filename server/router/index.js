const ArticleModel = require('./db/article')

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

exports.getArticle = () => {
    return async (ctx, next) => {
        const articles = await ArticleModel.find(function (err, articles) { })
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
        console.log(ctx.request.body.params.content)
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
        await ArticleModel.findByIdAndUpdate(ctx.request.query.id, { kind: 0 })
        ctx.body = {
            code: 0
        }
    }
}
