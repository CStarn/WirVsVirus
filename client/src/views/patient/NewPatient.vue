<template>
    <v-form class="ma-10">
        <v-text-field
                label="Firstname"
                outlined
                v-model="this.firstname"
        ></v-text-field>
        <v-text-field
                label="Lastname"
                outlined
                v-model="this.lastname"
        ></v-text-field>
        <v-text-field
                label="Telephone Number"
                outlined
                v-model="this.telNumber"
        ></v-text-field>
        <v-btn color="succes" @click="submit()"></v-btn>
    </v-form>
</template>

<script>
    export default {
        name: "NewPatient",
        data: () => ({
            firstname: "John",
            lastname: "Johnson",
            telNumber: "016540654545"
        }),
        methods: {
            submit() {
                this.$store.dispatch("addPatient",
                    {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        telNumber: this.telNumber
                    });
            }
        }

    }
</script>

<style scoped>

</style>