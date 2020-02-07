<template>
    <v-app-bar app color="primary" dark>

        <v-toolbar-title>Rocky webshop</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>
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