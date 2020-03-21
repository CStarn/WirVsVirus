<template>
    <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>DiWa</span>
            <router-link
                    to="/PatientManagement"
            >
                <span>Patient Management</span>
            </router-link>
            <router-link
                    to="/TodaysPatients"
            >
                <span>Today's Patients</span>
            </router-link>
        </v-toolbar-title>
    </v-app-bar>
</template>
