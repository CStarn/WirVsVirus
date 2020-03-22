<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <slot v-bind:on="on"></slot>
        </template>
        <v-card>
            <v-card-title>Edit Patient {{patient.firstname}} {{patient.lastname}}</v-card-title>
            <v-card-text>
                <v-text-field
                        label="First Name"
                        v-model="form.firstname">
                </v-text-field>
                <v-text-field
                        label="Last Name"
                        v-model="form.lastname">
                </v-text-field>
                <v-text-field
                        label="Birthday"
                        v-model="form.birthday">
                </v-text-field>
                <v-text-field
                        label="Mobile Number"
                        v-model="form.telNumber">
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn text @click="closeDialog">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'EditPatientDialog',
        props: {
            patient: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                dialog: false,
                form: {
                    firstName: "",
                    lastName: "",
                    telNumber: "",
                    birthday: ""
                }
            }
        },
        watch: {
            dialog(newValue) {
                if(newValue){
                    this.form = {...this.patient};
                }
            }
        },
        methods: {
            onSaveChanges() {
                this.$store.dispatch('editPatient', {patientId: this.patient.id, form: this.form});
                this.closeDialog();
            },
            closeDialog() {
                this.dialog = false;
                this.resetForm();
            },
            resetForm() {
                this.form = {
                    firstname: "",
                    lastname: "",
                    telNumber: "",
                    birthday: ""
                }
            }
        }
    }
</script>
