import Vuex from 'vuex'
import Vue from 'vue'
import person from './modules/person'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  modules: {
    person
  },
  plugins: [vuexLocal.plugin]
})

export default store
