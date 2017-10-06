import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Article from '@/components/Article'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Article',
            component: Article
        },
        {
            path: '/',
            name: 'Article',
            component: Article
        }
    ]
})
