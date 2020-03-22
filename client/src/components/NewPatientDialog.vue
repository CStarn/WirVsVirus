<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <slot v-bind:on="on"></slot>
        </template>
        <v-card>
            <v-card-title>Create new patient</v-card-title>
            <v-card-text>
                <v-text-field
                        label="First Name"
                        v-model="firstName">
                </v-text-field>
                <v-text-field
                        label="Last Name"
                        v-model="lastName">
                </v-text-field>
                <v-text-field
                        label="Birthday"
                        v-model="birthday">
                </v-text-field>
                <v-text-field
                        label="Mobile Number"
                        v-model="telNumber">
                </v-text-field>
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
        name: 'NewPatientDialog',
        data() {
            return {
                dialog: false,
                firstName: "",
                lastName: "",
                telNumber: "",
                birthday: ""
            }
        },
        methods: {
            onSaveChanges() {
                this.dialog = false;
                this.$store.dispatch('addPatient', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    telNumber: this.telNumber,
                    birthday: this.birthday
                })
            }
        }
    }
</script>
