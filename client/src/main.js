import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import vuetify from './plugins/vuetify';
import firebase from "firebase/app"

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV !== "production";

export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
