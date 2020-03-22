<template>
  <v-container>
      <v-row>
        <v-col v-for="(appointments, key) in Array.from(groupedAppointments)" :key="key">
          <v-row>
            <v-col>
              <v-card>
                <v-card-title>
                  {{"Doctor "+ appointments[0]}}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-for="appointment in appointments[1]" :key="appointment.id">
          <v-col>
            <patient-card :appointment="appointment"/>
          </v-col>
        </v-row>
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
                // eslint-disable-next-line no-console
                console.log(map);
                // eslint-disable-next-line no-console
                console.log(Array.from(map));

                return map;
            }
        }
    }
</script>

<style scoped>


</style>
