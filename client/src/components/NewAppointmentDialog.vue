<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <slot v-bind:on="on"></slot>
        </template>
        <v-card>
            <v-card-title>Create Appointment for {{patient.firstname +" "+patient.lastname}}</v-card-title>
            <v-card-text>
                <v-text-field
                        label="Doctor"
                        v-model="doctor">
                </v-text-field>
                <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="date"
                                label="Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
                <v-menu
                        ref="menuTime"
                        v-model="menuTime"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="time"
                                label="Time"
                                prepend-icon="mdi-clock"
                                readonly
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-time-picker
                            v-if="menuTime"
                            v-model="time"
                            full-width
                            format="24hr"
                            @click:minute="$refs.menuTime.save(time)"
                    ></v-time-picker>
                </v-menu>
                <v-textarea
                        label="Notes"
                        v-model="notes">
                </v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn text @click="dialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'NewAppointmentDialog',
        props: ['patient'],
        data() {
            return {
                dialog: false,
                menu: false,
                menuTime: false,
                doctor: "",
                date: new Date().toISOString().slice(0, 10),
                time: new Date().toISOString().slice(11, 16),
                notes: ""
            }
        },
        computed: {
            submittableDateTime() {
                const date = new Date(this.date);
                const hours = this.time.match(/^(\d+)/)[1];
                const minutes = this.time.match(/:(\d+)/)[1];
                date.setHours(Number(hours));
                date.setMinutes(Number(minutes));
                return date.toISOString()
            },
        },
        methods: {
            onSaveChanges() {
                this.dialog = false;
                this.$store.dispatch('addAppointment', {
                    patientId: this.patient.id,
                    patientFirstName: this.patient.firstname,
                    patientLastName: this.patient.lastname,
                    doctorId: this.doctor,
                    datetime: this.submittableDateTime,
                    notes: this.notes
                })
            }
        }
    }
</script>

<style scoped>

</style>
