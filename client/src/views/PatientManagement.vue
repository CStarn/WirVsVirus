<template>
  <v-container>  <v-data-table :headers="headers" :items="patients"></v-data-table>
  </v-container>
</template>

<script>

  const headers = Object.freeze([
    {text: 'Name', value: 'name', align: 'start'},
    {text: 'Number', value: 'number'},
  ]);

  export default {
    name: "PatientManagement",
    data() {
      return {
        headers
      }
    },
    computed: {
      patients() {
        return this.$store.getters["patients"];
      }
    }
  }
</script>

