<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-img
            class="profile-picture"
            max-width="35px"
            max-height="35px"
            :src="user.avatarUrl"
          />
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          :key="1"
          @click="logout"
        >
          <v-list-item-title>View profile</v-list-item-title>
        </v-list-item>
        <v-list-item
          :key="2"
          @click="logout"
        >
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { logOut } from '../../requests/authRequest';
export default {
  computed: {
    ...mapState('UserStore', ['user']),
  },
  methods: {
    viewProfile() {},
    logout() {
      this.$store.commit('UserStore/clearStore');
      logOut();
    },
  },
}
</script>

<style>
  .profile-picture {
    border-radius: 50%;
  }
</style>