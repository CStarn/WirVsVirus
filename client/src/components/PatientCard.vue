<template>
  <v-card>
    <v-row align="center">

      <v-col class="align-center" cols="1">
        <v-checkbox v-model="selected"></v-checkbox>
      </v-col>

      <v-col  cols="11">
        <v-card-title>
          <v-row justify="space-between">
            <v-col cols="9" class="pt-0">
              {{ appointment.patientFirstName +' '+ appointment.patientLastName}}
            </v-col>
            <v-col class="pt-0 text-right" cols="3">
              {{ appointment.time | formatTime }}
              <div class=" font-weight-bold title delay text-right" v-if="isDelayed">
                {{ difference | formatDelay}}
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="error">Notify</v-btn>
        </v-card-actions>
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
            appointment: {}
        },
        computed: {
            difference() {
                const date = new Date(this.appointment.time);
                const difference = Date.now() - date;
                return Math.ceil(difference / 60000);
            },
            isDelayed() {
                return this.difference > 0;
            }
        },
        methods: {}
    }
</script>

<style scoped>

  .delay {
    color: red;
    font-max-size: 50%;
  }

</style>

