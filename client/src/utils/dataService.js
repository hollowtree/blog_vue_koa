// import axios from 'axios'
let axios = require('axios')

const prefix = 'v1/'

let get = (api, options) => {
    options = options || {}
    let params = options.params || {}
    axios.get(prefix + api, {
        params: params
    }).then((res) => {
        if (res.data.code === 0) {
            options.callback0 && options.callback0(res.data.data)
        }
        if (res.data.code === 1001) {
            options.callback1001 && options.callback1001(res.data.data)
        }
    })
}
let post = (api, options) => {
    options = options || {}
    let params = options.params || {}
    axios.post(prefix + api, {
        params: params
    }).then((res) => {
        if (res.data.code === 0) {
            options.callback0 && options.callback0(res.data.data)
        }
        if (res.data.code === 1001) {
            options.callback1001 && options.callback1001(res.data.data)
        }
    })
}
let del = (api, options) => {
    options = options || {}
    let params = options.params || {}
    axios.delete(prefix + api, {
        params: params
    }).then((res) => {
        if (res.data.code === 0) {
            options.callback0 && options.callback0(res.data.data)
        }
        if (res.data.code === 1001) {
            options.callback1001 && options.callback1001(res.data.data)
        }
    })
}

exports.postSignUp = (options) => {
    return post('api/sign_up', options)
}

exports.postLogIn = (options) => {
    return post('api/log_in', options)
}

exports.getTemp = (options) => {
    return get('api/temp', options)
}
exports.getArticle = (options) => {
    return get('api/get_article', options)
}
exports.postArticle = (options) => {
    return post('api/post_article', options)
}

exports.deleteArticle = (options) => {
    return del('api/delete_article', options)
}