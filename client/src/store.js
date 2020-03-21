import config from "./config"
import Vue from 'vue';
import Vuex from 'vuex';
import { db } from './firebase/firebase';

Vue.use(Vuex);

const patientsRef = db.collection(config.patientCollection);
const appointmentsRef = db.collection(config.appointmentCollection);

const mutations = {
    STORE_PATIENTS: "STORE_PATIENTS",
    ADD_PATIENT: "ADD_PATIENT",
    STORE_APPOINTMENTS: "STORE_APPOINTMENTS",
    ADD_APPOINTMENT: "ADD_APPOINTMENT",
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
        [mutations.STORE_PATIENTS](state, patients) {
            state.patients = patients;
        },
        [mutations.ADD_APPOINTMENT](state, appointment) {
            state.appointments.push(appointment);
        },
        [mutations.STORE_APPOINTMENTS](state, appointments) {
            state.appointments = appointments;
        },
        [mutations.ADD_APPOINTMENT](state, appointment) {
            state.appointments.push(appointment);
        },
        [mutations.SET_LOADING](state, isLoading) {
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
                commit(mutations.ADD_PATIENT, newPatient)
            } catch (e) {
                alert(e);
            }
            commit(mutations.SET_LOADING, false);
        },
        async addAppoinment({commit}, payload) {
            commit(mutations.SET_LOADING, true);
            const newAppointment = {
                patientId: payload.patientId,
                doctorId: payload.doctorId,
                datetime: payload.datetime
            };
            try {
                await appointmentsRef.add(newAppointment);
                commit(mutations.ADD_PATIENT, newAppointment);
            } catch (err) {
                alert(err);
            }
            commit(mutations.SET_LOADING, false);
        },
        async getPatients(ctx) {
            try {
                const patientsSnapshot = await patientsRef.get();
                ctx.commit(mutations.STORE_PATIENTS, patientsSnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            } catch (err) {
                alert(err);
            }
        },
        async getAppointments(ctx) {
            try {
                const appointmentSnapshot = await appointmentsRef.get();
                ctx.commit(mutations.STORE_APPOINTMENTS, appointmentSnapshot.docs.map(doc => doc.data()));
            } catch (err) {
                alert(err);
            }
        }
    },
});
