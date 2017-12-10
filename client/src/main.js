// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import showdown from 'showdown'
import dataService from './utils/dataService'
import hljs from './utils/hljs/'
import './utils/hljs/styles.js'

Vue.config.productionTip = false

Vue.prototype.converter = new showdown.Converter()
Vue.prototype.dataService = dataService

Vue.prototype.converter.setOption('noHeaderId', true)
Vue.prototype.converter.setOption('headerLevelStart', 2)
Vue.prototype.converter.setOption('tables', true)
Vue.prototype.converter.setOption('tasklists', true)
Vue.prototype.converter.setOption('simpleLineBreaks', true)
Vue.prototype.converter.setOption('openLinksInNewWindow', true)
// Vue.prototype.converter.setFlavor('github')


Vue.use(hljs)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
