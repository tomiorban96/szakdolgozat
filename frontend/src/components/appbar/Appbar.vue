<template>
    <v-app-bar app color="primary" dark>

        <v-toolbar-title>Rocky webshop</v-toolbar-title>

        <v-spacer></v-spacer>

        <Login />
    </v-app-bar>
</template>

<script>
    import Login from '../login/Login';
    export default {
        components: {
            Login,
        },
    }
</script>

<style>

</style>