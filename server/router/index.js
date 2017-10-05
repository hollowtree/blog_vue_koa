const postArticleModel = require('./db/article')

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

exports.postArticle = () => {
    return async (ctx, next) => {
        console.log(ctx.request.body.params.content)
        let article = new postArticleModel({
            content: ctx.request.body.params.content,
            author: 'hollowtree'
        })
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

exports.getArticle = () => {
    return async (ctx, next) => {
        const articles = await postArticleModel.find(function (err, articles) { })
        let data = []
        articles.forEach(function (val) {
            data.push({
                createdAt: val.createdAt,
                author: val.author,
                content: val.content,
            })
        })
        ctx.body = {
            code: 0,
            data: data
        }
    }

}