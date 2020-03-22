import config from "./config"
import Vue from 'vue';
import Vuex from 'vuex';
import { db } from './firebase/firebase';
import { sendComeInSMS } from "./firebase/api";

Vue.use(Vuex);

const patientsRef = db.collection(config.patientCollection);
const appointmentsRef = db.collection(config.appointmentCollection);

const mutations = {
    STORE_PATIENTS: "STORE_PATIENTS",
    ADD_PATIENT: "ADD_PATIENT",
    STORE_APPOINTMENTS: "STORE_APPOINTMENTS",
    ADD_APPOINTMENT: "ADD_APPOINTMENT",
    SET_LOADING: "SET_LOADING",
    UNSELECT_UPCOMING_APPOINTMENT: "UNSELECT_UPCOMING_APPOINTMENT",
    SELECT_UPCOMING_APPOINTMENT: "SELECT_UPCOMING_APPOINTMENT",
    UNSELECT_ALL_UPCOMING_APPOINTMENTS: "UNSELECT_ALL_UPCOMING_APPOINTMENTS"
};

export default new Vuex.Store({
    state: {
        loading: false,
        patients: [],
        appointments: [],
        selectedUpcomingAppointments: []
    },
    getters: {
        patients: state => state.patients,
        appointments: state => state.appointments,
        loading: state => state.loading,
        selectedUpcomingAppointments: state => state.selectedUpcomingAppointments
    },
    mutations: {
        [mutations.STORE_PATIENTS](state, patients) {
            state.patients = patients;
        },
        [mutations.ADD_APPOINTMENT](state, appointment) {
            state.appointments = [...state.appointments, appointment];
        },
        [mutations.STORE_APPOINTMENTS](state, appointments) {
            state.appointments = appointments;
        },
        [mutations.ADD_PATIENT](state, patient) {
            state.patients = [...state.patients, patient];
        },
        [mutations.SET_LOADING](state, isLoading) {
            state.loading = isLoading;
        },
        [mutations.UNSELECT_UPCOMING_APPOINTMENT](state, appointmentId) {
            state.selectedUpcomingAppointments = state.selectedUpcomingAppointments.filter(id => id !== appointmentId);
        },
        [mutations.SELECT_UPCOMING_APPOINTMENT](state, id) {
            state.selectedUpcomingAppointments = [...state.selectedUpcomingAppointments, id];
        },
        [mutations.UNSELECT_ALL_UPCOMING_APPOINTMENTS](state) {
            state.selectedUpcomingAppointments = [];
        },

    },
    actions: {
        async addPatient({commit}, payload) {
            commit(mutations.SET_LOADING, true);
            const newPatient = {
                firstname: payload.firstName,
                lastname: payload.lastName,
                telNumber: payload.telNumber,
                birthday: payload.birthday
            };
            try {
                await patientsRef.add(newPatient);
                commit(mutations.ADD_PATIENT, newPatient)
            } catch (e) {
                alert(e);
            }
            commit(mutations.SET_LOADING, false);
        },
        async editPatient({commit, dispatch}, patient){
            commit(mutations.SET_LOADING, true);
            try {
                await patientsRef.doc(patient.patientId).update(patient.form);
            } catch (e) {
                alert(e);
            }
            await dispatch('getPatients');
            commit(mutations.SET_LOADING, false);
        },
        async addAppointment({commit}, payload) {
            commit(mutations.SET_LOADING, true);
            const newAppointment = {
                patient: "/patients/" + payload.patientId,
                doctor: payload.doctorId,
                time: payload.datetime,
                patientFirstName: payload.patientFirstName,
                patientLastName: payload.patientLastName
            };
            try {
                await appointmentsRef.add(newAppointment);
                commit(mutations.ADD_APPOINTMENT, newAppointment);
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
                ctx.commit(mutations.STORE_APPOINTMENTS, appointmentSnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            } catch (err) {
                alert(err);
            }
        },
        async sendComeInMessage(ctx, payload){
            try{
                await sendComeInSMS(payload.telNumber, `${payload.firstname} ${payload.lastname}`)
            } catch (e) {
                alert(e);
            }
        },
        selectUpcomingAppointment(ctx, appointment){
            ctx.commit(mutations.SELECT_UPCOMING_APPOINTMENT, appointment);
        },
        unselectUpcomingAppointment(ctx, appointmentId){
            ctx.commit(mutations.UNSELECT_UPCOMING_APPOINTMENT, appointmentId);
        },
        unselectAllUpcomingAppointments(ctx){
            ctx.commit(mutations.UNSELECT_ALL_UPCOMING_APPOINTMENTS);
        }
    },
});
