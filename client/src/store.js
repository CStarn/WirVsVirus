import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase";
import "firebase/firestore"
import config from "./config"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false
    },
    mutations: {},
    actions: {
        // eslint-disable-next-line no-unused-vars
        addPatient( { commit } , payload) {
            const newPatient = {
                firstname: payload.firstname,
                lastname: payload.lastname,
                telNumber: payload.telNumber
            };
            // eslint-disable-next-line no-console
            console.log(newPatient);
            firebase.firestore().collection(config.patientCollection)
                .add(newPatient)
                // eslint-disable-next-line no-console
                .catch(err => console.log(err));
        }
    },
    getters: {}
});
