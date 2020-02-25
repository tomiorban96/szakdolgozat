<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="product in products"
        :key="product._id"
        :cols="3"
      >
        <v-card
          outlined
          :loading="cardsLoading"
        >
          <v-card-title class="headline">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle>
            <p>
              {{ product.description }}
            </p>
            <p>
              Price: {{ product.price }} EUR
            </p>
            <p>
              Stock: {{ product.stock }}
            </p>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn text>
              View
            </v-btn>
            <v-spacer />
            <v-btn v-if="loggedIn" icon>
              <v-icon>mdi-cart-arrow-down</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import {
  listAll
} from '../../requests/catalogRequest';

export default {
  components: {

  },
  data: () => ({
    products: null,
    cardsLoading: true,
  }),
  computed: {
    ...mapState('UserStore', ['loggedIn']),
  },
  created() {
    this.cardsLoading = true;
    listAll()
      .then((result) => {
        this.products = result;
      })
      .catch((error) => {
      })
      .finally(() => {
        this.cardsLoading = false;
      });
  },
  methods: {

  }
}
</script>

<style>

</style>