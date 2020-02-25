<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-toolbar-title>Rocky webshop</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon @click="user">mdi-cart</v-icon>
    </v-btn>
    <Login />
  </v-app-bar>
</template>

<script>
  import Login from '../login/Login';
  import { getUser } from '../../requests/authRequest';
  export default {
    components: {
      Login,
    },
    methods: {
      user() {
        getUser()
          .then((result) => {
            //console.log(result);
          })
          .catch((error) => {
            //console.log(error);
          })
      }
    },
  }
</script>

<style>

</style>