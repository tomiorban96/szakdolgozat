<template>
  <v-dialog
    v-model="showLoginDialog"
    :persistent="loginLoading"
    width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form
        v-model="formIsValid"
        @submit.prevent="loginClicked"
      >
        <v-card-title
          class="headline primary headline-text"
          primary-title
        >
          {{ registerFormIsOpen ? 'Register' : 'Login' }}
          <v-spacer />
          <v-btn
            icon
            class="close-button"
            :disabled="loginLoading"
            @click="onClose"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              required
              label="Email"
              name="email"
              :prepend-icon="registerFormIsOpen ? undefined : 'mdi-account'"
              type="email"
            />
            <v-text-field
              id="password"
              v-model="password"
              :rules="passwordRules"
              required
              label="Password"
              name="password"
              :prepend-icon="registerFormIsOpen ? undefined : 'mdi-lock'"
              type="password"
            />
          </div>
          <div v-if="registerFormIsOpen">
            <v-text-field
              id="verifyPassword"
              v-model="verifyPassword"
              :rules="passwordVerifyRules"
              required
              label="Verify Password"
              name="verify password"
              prepend-icon=""
              type="password"
            />
            <v-text-field
              id="firstName"
              v-model="firstName"
              :rules="nameRules"
              required
              label="First Name"
              name="firstname"
              prepend-icon=""
              type="text"
            />
            <v-text-field
              id="lastName"
              v-model="lastName"
              :rules="nameRules"
              required
              label="Last Name"
              name="lastname"
              prepend-icon=""
              type="text"
            />
          </div>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            v-if="!registerFormIsOpen"
            :disabled="openRegisterIsDisabled"
            color="primary"
            text
            @click="onRegisterFormOpened"
          >
            Register
          </v-btn>
          <v-spacer />
          <v-btn
            v-if="!registerFormIsOpen"
            color="primary"
            :loading="loginLoading"
            type="submit"
            :disabled="!formIsValid"
          >
            Login
          </v-btn>
          <v-btn
            v-else
            color="primary"
            :loading="registerLoading"
            type="submit"
            :disabled="!formIsValid"
            @click="register"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    authenticate, getUser
  } from '../../requests/authRequest';

  export default {
    props: {
      //source: String,
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
          this.$store.commit('UserStore/setUser', result);
          this.showLoginDialog = false;
          this.loginLoading = false;
        })
        .catch((err) => {
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