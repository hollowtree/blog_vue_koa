import Vue from 'vue'
import Vuex from 'vuex'

// import data from './modules/data'

Vue.use(Vuex)
console.log()


export default new Vuex.Store({
    state: {
        showEditor: false
    }
    // modules: {
    //     data
    // }
})