<template>
    <v-form class="ma-10">
        <v-text-field
                label="Firstname"
                outlined
                v-model="firstname"
        ></v-text-field>
        <v-text-field
                label="Lastname"
                outlined
                v-model="lastname"
        ></v-text-field>
        <v-text-field
                label="Telephone Number"
                outlined
                v-model="telNumber"
        ></v-text-field>
        <v-btn color="success"
               @click="submit()"
               :loading="loading"
        >Submit
        </v-btn>
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

        computed: {
            loading() {
                return this.$store.getters.loading;
            },
        },

        methods: {
            submit() {
                this.$store.dispatch("addPatient",
                    {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        telNumber: this.telNumber
                    });
            },
        }
    }
</script>

<style scoped>

</style>