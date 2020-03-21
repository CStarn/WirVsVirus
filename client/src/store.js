import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        patients: [{number: "3283823", name: "Paul Schaaf"}]
    },
    getters: {
        patients: state => state.patients
    },
    mutations: {
    },
    actions: {
    },
})
