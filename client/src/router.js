import Vue from "vue";
import Router from "vue-router";
import TodaysPatients from "./views/TodaysPatients";
import PatientManagement from "./views/PatientManagement";
import NewPatient from "./views/patient/NewPatient";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/todaysPatients",
      name: "todaysPatients",
      component: TodaysPatients
    },
    {
      path: "/patientManagement",
      name: "patientManagement",
      component: PatientManagement
    },
    {
      path: "/newPatient",
      name: "newPatient",
      component: NewPatient
    },
    {
      path: "*",
      component: TodaysPatients
    }
  ]
})

