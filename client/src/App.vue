<template>
    <v-app>
        <navbar></navbar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <pageFooter/>
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
