import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase";
import "firebase/firestore"
import config from "./config"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        patients: [{number: "3283823", name: "Paul Schaaf"}]
    },

    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
    },

    actions: {
        addPatient({commit}, payload) {
            commit("setLoading", true);
            const newPatient = {
                firstname: payload.firstname,
                lastname: payload.lastname,
                telNumber: payload.telNumber
            };
            firebase.firestore().collection(config.patientCollection)
                .add(newPatient)
            commit("setLoading", false);
        },
    },
    getters: {
        patients: state => state.patients,
        loading: state => state.loading,
        error: state => state.error,
    }
});
