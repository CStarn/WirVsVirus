<template>
  <v-container>
    <v-row>
      <v-col class="">
        <v-container>
          <v-row>
            <v-col>
              <v-card>
                <v-card-title>
                  Doktor Miller
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-for="appointment in appointments" :key="appointment.id">
            <v-col>
              <patient-card :appointment="appointment"/>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col>
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
            appointments() {
                return this.$store.getters["appointments"];
            }
        },
        methods: {}
    }
</script>

<style scoped>


</style>
