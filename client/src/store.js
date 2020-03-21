import config from "./config"
import Vue from 'vue';
import Vuex from 'vuex';
import { db } from './firebase/firebase';

Vue.use(Vuex);

const patientsRef = db.collection(config.patientCollection);
const appointmentsRef = db.collection(config.appointmentCollection);

const mutations = {
    STORE_PATIENTS: "STORE_PATIENTS",
    STORE_APPOINTMENTS: "STORE_APPOINTMENTS",
    SET_LOADING: "SET_LOADING"
};

export default new Vuex.Store({
    state: {
        loading: false,
        patients: [],
        appointments: []
    },
    getters: {
        patients: state => state.patients,
        appointments: state => state.appointments
    },
    mutations: {
        [mutations.STORE_PATIENTS](state, patients){
            state.patients = patients;
        },
        [mutations.STORE_APPOINTMENTS](state, appointments){
            state.appointments = appointments;
        },
        [mutations.SET_LOADING](state, isLoading){
            state.loading = isLoading;
        }
    },
    actions: {
        async addPatient({commit}, payload) {
            commit(mutations.SET_LOADING, true);
            const newPatient = {
                firstname: payload.firstname,
                lastname: payload.lastname,
                telNumber: payload.telNumber
            };
            try {
                await patientsRef.add(newPatient);
            } catch (e) {
                alert(e);
            }
            commit(mutations.SET_LOADING, false);
        },
        async getPatients(ctx){
            try {
                const patientsSnapshot = await patientsRef.get();
                ctx.commit(mutations.STORE_PATIENTS, patientsSnapshot.docs.map(doc => doc.data()));
            } catch(err) {
                alert(err);
            }
        },
        async getAppointments(ctx){
            try {
                const appointmentSnapshot = await appointmentsRef.get();
                ctx.commit(mutations.STORE_APPOINTMENTS, appointmentSnapshot.docs.map(doc => doc.data()));
            } catch(err) {
                alert(err);
            }
        }
    },
});
