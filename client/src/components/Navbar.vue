<template>
    <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase font-weight-bold">DiWa</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-for="item in menu" :key="item.title">
            <v-btn text :to="item.link">
                <v-icon left>{{ item.icon }}</v-icon>
                {{ item.title }}
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
    export default {
        data: () => ({
            "menu": [
                {
                    title: "Today's Patients",
                    link: "/todaysPatients",
                    icon: "mdi-calendar-today"
                },
                {
                    title: "Patient Management",
                    link: "/patientManagement",
                    icon: "mdi-account-multiple"
                }
            ]
        })
    }
</script>
