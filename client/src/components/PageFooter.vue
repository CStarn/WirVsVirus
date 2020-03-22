<template>
    <v-footer>
        <v-container fill-width>
            <v-row justify="center">
                <v-col cols="3">
                    <div style="display: grid; justify-content: center">
                    <img height="55px" src="@/assets/project_logo.png">
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>
<script>
    export default {
        name: 'pageFooter'
    }
</script>

<style scoped>
    .col-3 {
        padding: 0 !important;
    }

    .container {
        padding: 0 !important;
    }
</style>
