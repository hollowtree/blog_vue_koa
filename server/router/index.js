exports.getTemp = () => {
    return async (ctx, next) => {
        ctx.body = {
            title: '登录 / 注册'
        };
    };
};