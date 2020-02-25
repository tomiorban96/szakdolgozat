<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-toolbar-title>Rocky webshop</v-toolbar-title>
    <v-spacer />
    <v-btn
      v-if="loggedIn"
      icon
    >
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <login v-if="!loggedIn" />
    <profile-dropdown v-else />
  </v-app-bar>
</template>

<script>
  import Login from '../login/Login';
  import ProfileDropdown from './ProfileDropdown';
  import { mapState, mapGetters } from 'vuex';
  import { getUser } from '../../requests/authRequest';
  export default {
    components: {
      Login,
      ProfileDropdown,
    },
    computed: {
      ...mapState('UserStore', ['user', 'loggedIn']),
    },
    methods: {
      
    },
  }
</script>

<style>

</style>