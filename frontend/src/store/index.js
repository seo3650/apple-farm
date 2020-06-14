import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import { favorite } from './favorite.module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        favorite,
    }
})