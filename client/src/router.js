import Vue from "vue";
import Router from "vue-router";
import TodaysPatients from "./views/TodaysPatients";
import PatientManagement from "./views/PatientManagement";

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
      path: "*",
      component: TodaysPatients
    }
  ]
})

