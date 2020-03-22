<template>
    <v-container>
        <v-card class="mt-2">
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
                <new-patient-dialog v-slot:default="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">New Patient</v-btn>
                </new-patient-dialog>
            </v-card-title>
        <v-data-table :headers="headers" :items="patients" :search="search">
            <template v-slot:item.telNumber="{ item } ">
                00{{item.telNumber}}
            </template>
            <template v-slot:item.actions="{ item }">
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-icon
                                medium
                                class="mr-2"
                                v-on="on"
                        >
                            mdi-message
                        </v-icon>
                    </template>
                    <v-list>
                        <v-list-item
                                @click="sendComeInMessage(item)"
                        >
                            <v-list-item-title>Send "Come In" Message</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                @click="sendAppointmentUpdateMessage"
                        >
                            <v-list-item-title>Send "New Appointment Time" Message</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <new-appointment-dialog :patient="item" v-slot:default="{ on }">
                    <v-icon
                        medium
                        class="mr-2"
                        v-on="on"
                >
                    mdi-calendar
                </v-icon>
                </new-appointment-dialog>

                <edit-patient-dialog :patient="item" v-slot:default="{ on }">
                    <v-icon
                            medium
                            class="mr-1"
                            v-on="on"
                    >
                        mdi-pencil
                    </v-icon>
                </edit-patient-dialog>
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
    import NewPatientDialog from "../components/NewPatientDialog";
    import EditPatientDialog from "../components/EditPatientDialog";

    const headers = Object.freeze([
        {text: 'Name', value: 'name', align: 'start'},
        {text: 'Number', value: 'telNumber'},
        {text: 'Birthday', value: 'birthday'},
        { text: 'Actions', value: 'actions', sortable: false, filterable: false, align: 'end' },
    ]);

    export default {
        name: "PatientManagement",
        components: {
            EditPatientDialog,
            NewPatientDialog,
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
        },
        methods: {
            sendComeInMessage(patient){
                this.$store.dispatch("sendComeInMessage", patient);
            },
            sendAppointmentUpdateMessage(){

            },
        }
    }
</script>
