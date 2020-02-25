<template>
  <v-app>
    <Appbar />

    <v-content>
      <Catalog />
    </v-content>
  </v-app>
</template>

<script>
import Appbar from './components/appbar/Appbar';
import Catalog from './components/catalog/Catalog';
import store from './store';
import { getUser } from './requests/authRequest';

export default {
  name: 'App',
  store,
  components: {
    Appbar,
    Catalog,
  },

  data: () => ({
    
  }),
  created() {
    getUser()
      .then((result) => {
        this.$store.commit('UserStore/setUser', result.data);
      })
      .catch((error) => {
        this.$store.commit('UserStore/clearStore');
      })
  },
};
</script>
