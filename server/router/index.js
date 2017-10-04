const postArticleModel = require('./db/postArticle')

exports.getTemp = () => {
    return async (ctx, next) => {
        console.log(ctx.query)
        ctx.body = {
            title: '登录 / 注册'
        };
    };
};

exports.postArticle = () => {
    return async (ctx, next) => {
        console.log(ctx.request.body.params.content)
        let article = new postArticleModel({
            content: ctx.request.body.params.content,
            author: 'Tr5656ee'
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