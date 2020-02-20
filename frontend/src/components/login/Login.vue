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
          {{registerFormIsOpen ? 'Register' : 'Login'}}
          <v-spacer />
          <v-btn icon @click="onClose" class="close-button" :disabled="loginLoading">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div>
          <v-text-field :rules="emailRules" v-model="email" required label="Email" name="email"
            :prepend-icon="registerFormIsOpen ? undefined : 'mdi-account'" type="email" />
          <v-text-field :rules="passwordRules" v-model="password" required id="password" label="Password"
            name="password" :prepend-icon="registerFormIsOpen ? undefined : 'mdi-lock'" type="password" />
          </div>
          <div v-if="registerFormIsOpen">
            <v-text-field :rules="passwordVerifyRules" v-model="verifyPassword" required id="verifyPassword" label="Verify Password"
            name="verify password" prepend-icon="" type="password" />
            <v-text-field :rules="nameRules" v-model="firstName" required id="firstName" label="First Name"
            name="firstname" prepend-icon="" type="text" />
            <v-text-field :rules="nameRules" v-model="lastName" required id="lastName" label="Last Name"
            name="lastname" prepend-icon="" type="text" />
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn v-if="!registerFormIsOpen" :disabled="openRegisterIsDisabled" @click="onRegisterFormOpened" color="primary" text>
            Register
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="!registerFormIsOpen" color="primary" :loading="loginLoading" type="submit" :disabled="!formIsValid">
            Login
          </v-btn>
          <v-btn v-else @click="register" color="primary" :loading="registerLoading" type="submit" :disabled="!formIsValid">
            Register
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    authenticate
  } from '../../requests/authRequest';

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
      showLoginDialog: false,
      loginLoading: false,
      cardTitle: "Login",
      registerFormIsOpen: false,
      verifyPassword: null,
      firstName: null,
      lastName: null,
      registerLoading: false,
      nameRules: [
        v => !!v || 'Field is required'
      ],
      passwordVerifyRules: [
        v => !!v || 'Field is required'
      ],
      openRegisterIsDisabled: false,
    }),
    methods: {
      loginClicked() {
        this.openRegisterIsDisabled = true;
        authenticate(this.email, this.password)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
        this.loginLoading = !this.loginLoading;
      },
      onRegisterFormOpened() {
        this.registerFormIsOpen = true;
        this.cardTitle = "Register";
      },
      onClose() {
        this.showLoginDialog = false;
        this.registerFormIsOpen = false;
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