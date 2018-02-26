import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Article from '@/components/Article'
import pageMusic from '@/pages/pageMusic'
import ttSign from '@/components/ttSign'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Article',
            component: Article
        },
        {
            path: '/sign',
            name: 'Sign',
            component: ttSign
        },
        {
            path: '/music',
            name: 'Music',
            component: pageMusic
        },
    ]
})
