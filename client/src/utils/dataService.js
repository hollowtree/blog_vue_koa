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
            params.callback0 && params.callback0(res)
        }
        if (res.data.code === 1001) {
            params.callback1001 && params.callback1001(res)
        }
    })
}

exports.getTemp = (options) => {
    return get('api/temp', options)
}