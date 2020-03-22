<template>
  <v-card>
    <v-row align="center">

      <v-col cols="1" style="display: grid; align-content: center">
        <v-checkbox :value="checkboxValue" @change="selectCheckbox" color="primary" class="mx-0 ml-6 mb-1"></v-checkbox>
      </v-col>

      <v-col  cols="11">
        <v-card-title>
          <v-row justify="space-between">
            <v-col cols="9" class="pt-0">
              <div style="display: grid; align-content: center; height: 100%">
              {{ appointment.patientFirstName +' '+ appointment.patientLastName}}
              </div>
            </v-col>
            <v-col class="pt-0 text-right" cols="3">
              {{ appointment.time | formatTime }}
              <div class=" font-weight-bold title delay text-right" v-if="isDelayed">
                {{ difference | formatDelay}}
              </div>
            </v-col>
          </v-row>
        </v-card-title>
      </v-col>

    </v-row>
  </v-card>
</template>

<script>
    import formatDelay from "../filter/formatDelay";
    import {formatTime} from "../filter/dateTimeFormatter";

    export default {
        name: 'patient-card',
        data: () => ({
            selected: false
        }),
        filters:
            {
                formatDelay,
                formatTime
            },
        props: {
            appointment: {
              type: Object,
              required: true
            }
        },
        computed: {
            difference() {
                const date = new Date(this.appointment.time);
                const difference = Date.now() - date;
                return Math.ceil(difference / 60000);
            },
            isDelayed() {
                return this.difference > 0;
            },
            checkboxValue() {
              return this.$store.getters.selectedUpcomingAppointments.includes(this.appointment.id);
            }
        },
        methods: {
          selectCheckbox(){
            this.$store.dispatch("selectUpcomingAppointment", this.appointment.id)
          }
        }
    }
</script>

<style scoped>

  .delay {
    color: red;
    font-max-size: 50%;
  }

</style>
