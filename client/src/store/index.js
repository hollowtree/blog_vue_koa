import Vue from 'vue'
import Vuex from 'vuex'

import data from './modules/data'
import editor from './modules/editor'
import music from './modules/music'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        data,
        editor,
        music
    }
})