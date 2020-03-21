import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import vuetify from './plugins/vuetify';
import firebase from "firebase/app"

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    const firebaseConfig = {
      apiKey: "AIzaSyA-GJwcuAlgGX85lF9wuCoxWZ1WYu8xlLw",
      authDomain: "wirvsvirus-19373.firebaseapp.com",
      databaseURL: "https://wirvsvirus-19373.firebaseio.com",
      projectId: "wirvsvirus-19373",
      storageBucket: "wirvsvirus-19373.appspot.com",
      messagingSenderId: "466419990592",
      appId: "1:466419990592:web:45e558854b370e1f97dfa5",
      measurementId: "G-KW9PSHTH71"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}).$mount('#app');
