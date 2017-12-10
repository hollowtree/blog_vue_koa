
var hljs = require('highlight.js')

let vueHljs = {}

vueHljs.install = (Vue) => {
    Vue.directive('highlight', (el, binding) => {
        let codes = el.querySelectorAll('pre code')
        Array.prototype.forEach.call(codes, hljs.highlightBlock)
    })
}

module.exports = vueHljs
