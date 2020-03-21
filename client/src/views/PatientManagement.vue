<template>
    <v-container>
        <v-autocomplete label="Search" class="mt-10" :items="patientWithFullname" item-text="fullname" item-value="id"
                        v-model="selectePatientId" outlined>
        </v-autocomplete>
        <v-data-table :headers="headers" :items="patients">
            <template
                    v-slot:item.name="{ item }">
                {{ item.firstname + " " + item.lastname }}
            </template>
        </v-data-table>
    </v-container>
</template>

<script>

    const headers = Object.freeze([
        {text: 'Name', value: 'name', align: 'start'},
        {text: 'Number', value: 'telNumber'},
    ]);

    export default {
        name: "PatientManagement",
        data() {
            return {
                headers,
                selectePatientId: ""
            }
        },
        computed: {
            patients() {
                return this.$store.getters["patients"];
            },
            patientWithFullname() {
                return this.$store.getters["patients"].map(patient => ({
                    ...patient, "fullname": patient.firstname + " " + patient.lastname
                }));
            }
        }
    }

</script>

