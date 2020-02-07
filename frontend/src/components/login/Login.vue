<template>
  <v-dialog v-model="showLoginDialog" :persistent="loginLoading" width="500">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form v-model="formIsValid" @submit.prevent="loginClicked">
        <v-card-title class="headline primary headline-text" primary-title>
          Login
          <v-spacer />
          <v-btn icon @click="showLoginDialog = false" class="close-button" :disabled="loginLoading">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field :rules="emailRules" v-model="email" required label="Email" name="email"
            prepend-icon="mdi-account" type="email" />
          <v-text-field :rules="passwordRules" v-model="password" required id="password" label="Password"
            name="password" prepend-icon="mdi-lock" type="password" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text :loading="loginLoading" type="submit" :disabled="!formIsValid">
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      email: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: null,
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      formIsValid: false,
      showLoginDialog: true,
      loginLoading: false,
    }),
    methods: {
      loginClicked() {
        this.loginLoading = !this.loginLoading;
      }
    }
  }
</script>

<style>
  .headline-text {
    color: white !important
  }

  .close-button {
    color: white !important
  }
</style>