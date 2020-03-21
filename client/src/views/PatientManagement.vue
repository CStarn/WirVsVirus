<template>
    <v-container>
        <v-autocomplete clearable=true label="Search" class="mt-10" :items="patients"
                        v-model="selectedPatient" outlined>
            <template v-slot:selection="{ item }">
                {{item.firstname+" "+item.lastname}}
            </template>
            <template v-slot:item="{ item }">
                {{item.firstname+" "+item.lastname}}
            </template>
        </v-autocomplete>
        <v-container v-if="selectedPatient">
            <new-appointment-dialog :patient="selectedPatient"></new-appointment-dialog>
        </v-container>
        <v-dialog></v-dialog>
        <v-data-table :headers="headers" :items="patients">
            <template
                    v-slot:item.name="{ item }">
                {{ item.firstname + " " + item.lastname }}
            </template>
        </v-data-table>
    </v-container>
</template>

<script>

    import NewAppointmentDialog from "../components/NewAppointmentDialog";

    const headers = Object.freeze([
        {text: 'Name', value: 'name', align: 'start'},
        {text: 'Number', value: 'telNumber'},
    ]);

    export default {
        name: "PatientManagement",
        components: {
            NewAppointmentDialog
        },
        data() {
            return {
                headers,
                selectedPatient: null
            }
        },
        computed: {
            patients() {
                let getter = this.$store.getters["patients"];
                // eslint-disable-next-line no-console
                console.log(getter);
                return getter;
            }
        }
    }
</script>

