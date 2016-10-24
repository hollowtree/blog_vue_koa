var moment = require('moment-timezone');

var env = require('./env').env;

var nameModel = require('../models/mname');
var moodModel = require('../models/mmood');

// 加密
function enbase(temp) {
    return Buffer.from(JSON.stringify(temp)).toString('base64');
};
// 解密
function debase(temp) {
    return JSON.parse(Buffer.from(temp, 'base64').toString());
}
exports.getRoot = () => {
    return async(ctx, next) => {
        var name = ctx.cookies.get('name');
        ctx.body = env.render('main.html', {
            name: name
        });
    };
}

exports.getLogin = () => {
    return async(ctx, next) => {
        ctx.body = env.render('login.html', {
            title: '登录 / 注册'
        });
    };
};
exports.getLogout = () => {
    return async(ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.cookies.set('flag', '');
        ctx.redirect('/')
    }
}

exports.getJson = () => {
    return async(ctx, next) => {
        // console.log(ctx.params.type);
        // console.log(ctx.params.index);
        console.log('ctx.requset', ctx.requset);


    }
}

exports.postLogin = () => {
    return async(ctx, next) => {
        console.log('ctx.request.body:\n', ctx.request.body, '\n\n');
        await nameModel.find({
            name: ctx.request.body.name
        }, (err, docs) => {
            if (docs[0].password = ctx.request.body.password) {
                console.log("password is true");
                ctx.cookies.set('name', ctx.request.body.name);
                var temp = {
                    name: ctx.request.body.name,
                    salt: docs[0].salt
                };
                ctx.cookies.set('flag', enbase(temp));
            }
        });
        ctx.redirect('/');
    }
}

exports.postLogup = () => {
    return async(ctx, next) => {
        console.log('ctx.request.body:\n', ctx.request.body, '\n\n');
        var flag = 1;
        await nameModel.find({
            name: ctx.request.body.name
        }, (err, docs) => {
            if (docs[0]) {
                flag = 0;
            }
        });
        await nameModel.find({
            email: ctx.request.body.email
        }, (err, docs) => {
            if (docs[0]) {
                flag = 0;
            }
        });
        if (flag) {
            var nameEntity = new nameModel({
                name: ctx.request.body.name,
                email: ctx.request.body.email,
                password: ctx.request.body.password,
            });
            nameEntity.save(() => {
                console.log("name saved!");
            });
        }
        ctx.body = env.render('login.html')
    }
}


// --- dynamic routes --- //
exports.getMood = () => {
    return async(ctx, next) => {
        var user = ctx.params.username,
            index = parseInt(ctx.params.index),
            name = ctx.cookies.get('name');
        console.log('name-----------------', name);

        console.log("user-----------------", user);
        await moodModel.find({
            name: user
        }).sort({
            createDate: -1
        }).skip(
            (index - 1) * 10
        ).limit(
            11
        ).exec((err, docs) => {
            console.log('length:', docs.length);
            ctx.body = env.render('mood.html', {
                name: name,
                user: user,
                index: index,
                length: docs.length,
                data: docs
            });
        });

    };
};

exports.postMood = () => {
    return async(ctx, next) => {
        if (ctx.request.body.mood) {
            var flag = debase(ctx.cookies.get('flag'));
            console.log(flag);
            await nameModel.find({
                name: flag.name
            }, (err, docs) => {
                if (docs[0].salt == flag.salt) {
                    console.log('user ');
                    var moodEntity = new moodModel({
                        name: flag.name,
                        mood: ctx.request.body.mood
                    });
                    moodEntity.save(() => {
                        console.log("mood saved!");
                    });
                }
            });
        }
        var name = ctx.params.name,
            index = parseInt(ctx.params.index);
        console.log("user", name);
        await moodModel.find({
            name: name
        }).sort({
            createDate: -1
        }).skip(
            (index - 1) * 10
        ).limit(
            11
        ).exec((err, docs) => {
            console.log('length:', docs.length);
            ctx.body = env.render('mood.html', {
                name: name,
                index: index,
                length: docs.length,
                data: docs
            });
        });
    }
}