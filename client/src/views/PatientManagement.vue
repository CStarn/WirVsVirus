<template>
    <v-container>
        <v-container v-if="selectedPatient">
            <new-appointment-dialog :patient="selectedPatient"></new-appointment-dialog>
        </v-container>
        <v-card class="mt-6">
            <v-card-title>
                Patient Management
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" v-on="on">New Patient</v-btn>
            </v-card-title>
        <v-data-table :headers="headers" :items="patients" :search="search">
            <template v-slot:item.actions="{ item }">
                <v-icon
                        medium
                        class="mr-2"
                        @click="sendMessage(item)"
                >
                    mdi-message
                </v-icon>
                <v-icon
                        medium
                        class="mr-2"
                        @click="createAppointment(item)"
                >
                    mdi-calendar
                </v-icon>
                <v-icon
                        medium
                        class="mr-1"
                        @click="editPatient(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        medium
                        @click="deletePatient(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    import NewAppointmentDialog from "../components/NewAppointmentDialog";

    const headers = Object.freeze([
        {text: 'Name', value: 'name', align: 'start'},
        {text: 'Number', value: 'telNumber'},
        {text: 'Birthday', value: 'birthday'},
        { text: 'Actions', value: 'actions', sortable: false, filterable: false, align: 'end' },
    ]);

    export default {
        name: "PatientManagement",
        components: {
            NewAppointmentDialog
        },
        data() {
            return {
                search: '',
                headers,
                selectedPatient: null
            }
        },
        computed: {
            patients() {
                return this.$store.getters["patients"]
                    .map(p => (
                        {
                            ...p,
                            name: `${p.firstname} ${p.lastname}`,
                        }
                        )
                    );
            }
        }
    }
</script>
