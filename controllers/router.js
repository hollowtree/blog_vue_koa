var marked = require('marked');
var crypto = require('crypto');


var env = require('./env').env;

var nameModel = require('../models/m-name');
var moodModel = require('../models/m-mood');
var logModel = require('../models/m-log');

marked.setOptions({
  sanitize: true
});
var md5 = crypto.createHash('md5');
//  md5.update(des).digest('hex');
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


// --- mood --- //
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
            console.log(ctx.request.body);
            await nameModel.find({
                name: flag.name
            }, (err, docs) => {
                if (docs[0].salt == flag.salt) {
                    console.log('user ');
                    var temp = new Date();
                    var moodEntity = new moodModel({
                        name: flag.name,
                        mood: ctx.request.body.mood,
                    });
                    moodEntity.save(() => {
                        console.log("mood saved!");
                    });
                }
            });
        }
        ctx.redirect(ctx.request.header.referer);
    }
}

exports.delMood = () => {
    return async (ctx, next) => {
        console.log(ctx.request.header.referer);
        
        console.log(ctx.query);
        await moodModel.find({ _id: ctx.query.id }).exec( (err, docs)=> {
            if (docs[0]) {
                docs[0].remove((err) => { console.log(err); });
            }
        });
        ctx.redirect(ctx.request.header.referer);
    }
}


exports.getLog = () => {
    return async(ctx, next) => {
        var user = ctx.params.username,
            index = parseInt(ctx.params.index),
            name = ctx.cookies.get('name');
        await logModel.find({
            name: user
        }).sort({
            createDate: -1
        }).skip(
            (index - 1) * 10
        ).limit(
            11
        ).exec((err, docs) => {
            console.log('length:', docs.length);
            ctx.body = env.render('log.html', {
                name: name,
                user: user,
                index: index,
                length: docs.length,
                data: docs
            });
        });

    };
};
exports.postLog = () => {
    return async (ctx, next) => {
        if (ctx.request.body.title) {
            var flag = debase(ctx.cookies.get('flag'));
            console.log(ctx.request.body);
            await nameModel.find({
                name: flag.name
            }).exec((err, docs) => {
                if (docs[0].salt == flag.salt) {
                    logModel.findOne({
                        name: flag.name,
                        title: ctx.request.body.title
                    }).exec((err, doc) => {
                        console.log(doc);

                        if (doc) {
                            doc.log = ctx.request.body.logtext,
                                doc.logHtml = marked(ctx.request.body.logtext),
                                doc.save((err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('Update Log Succeeded');
                                    }
                                });
                        } else {
                            var logEntity = new logModel({
                                name: flag.name,
                                title: ctx.request.body.title,
                                log: ctx.request.body.logtext,
                                logHtml: marked(ctx.request.body.logtext),
                            });
                            logEntity.save((err) => {
                                console.log("log saved!");
                            });
                        }
                    })
                }
            });
        }
        ctx.redirect(ctx.request.header.referer);
    }
}

exports.editLog = () => {
    return async(ctx, next) => {
        console.log(ctx.request.header.referer);
        console.log(ctx.query);
        await logModel.find({
            _id: ctx.query.id
        }).exec((err, docs) => {
            // if (docs[0]) {
            //     docs[0].remove((err) => { console.log(err); });
            // };
            ctx.body = {
                info: docs[0]
            }
        });
    }
};

exports.delLog = () => {
    return async(ctx, next) => {
        console.log(ctx.request.header.referer);
        console.log(ctx.query);
        await logModel.find({
            _id: ctx.query.id
        }).exec((err, docs) => {
            if (docs[0]) {
                docs[0].remove((err) => {
                    console.log(err);
                });
            }
        });
        ctx.redirect(ctx.request.header.referer);
    }
};

exports.getChatRoom = () => {
    return async (ctx, next) => {
        var name= ctx.cookies.get('name');
        ctx.body=env.render('chatroom.html',{
                name: name
            });
    }
}
