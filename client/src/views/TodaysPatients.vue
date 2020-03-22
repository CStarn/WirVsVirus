<template>
  <v-container>
    <v-row>
      <v-col v-for="(appointments, key) in Array.from(groupedAppointments)" :key="key">
          <v-row>
            <v-col>
              <v-card class="secondary lighten-1">
                <v-card-title style="color: white">
                  {{"Doctor "+ appointments[0]}}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        <v-row>
          <v-col>
              <v-btn color="primary" dark class="mb-2" @click="unselectAllCheckboxes">Send New Appointment Time</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2">Archive Appointment</v-btn>
          </v-col>
        </v-row>
        <div class="lighten-2 pa-3 grey round">
          <v-row v-for="appointment in appointments[1]" :key="appointment.id">
            <v-col>
              <patient-card :appointment="appointment"/>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import PatientCard from "../components/PatientCard";

    export default {
        components: {PatientCard},
        filters: {},
        computed: {
            groupedAppointments() {
                return this.groupBy(this.$store.getters["appointments"], app => app.doctor);
            }
        },
        methods: {
            groupBy(list, keyGetter) {
                const map = new Map();
                list.forEach((item) => {
                    const key = keyGetter(item);
                    const collection = map.get(key);
                    if (!collection) {
                        map.set(key, [item]);
                    } else {
                        collection.push(item);
                    }
                });
                return map;
            },
            unselectAllCheckboxes() {
               this.$store.dispatch("unselectAllUpcomingAppointments") ;
            }
        }
    }
</script>

<style scoped>
  .round {
    border-radius: 7px;
  }

</style>
