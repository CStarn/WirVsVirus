<template>
  <v-app>
    <navbar></navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <page-footer/>
  </v-app>
</template>

<script>
  import Navbar from './components/Navbar';
  import PageFooter from "./components/PageFooter";

  export default {
    name: 'App',
    components: {
      PageFooter,
      Navbar
    },
    created() {
        this.$store.dispatch("getPatients");
        this.$store.dispatch("getAppointments");
    }
  };
</script>

<style>
    html, body {
        overflow-y: auto !important;
    }
</style>
