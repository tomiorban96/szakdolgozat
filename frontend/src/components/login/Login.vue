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
          <p
            v-if="loginError"
            class="error-msg"
          >
            Username or password is incorrect!
          </p>
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
    authenticate, getUser, register
  } from '../../requests/authRequest';

  export default {
    props: {
      //source: String,
    },
    data: () => ({
      user: {
        email: null,
        password: null,
        verifyPassword: null,
        firstName: null,
        lastName: null
      },
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
      loginError: false,
    }),
    methods: {
      loginClicked() {
        this.loginError = false;
        this.openRegisterIsDisabled = true;
        authenticate(this.email, this.password)
        .then((result) => {
          this.$store.commit('UserStore/setUser', result);
          this.showLoginDialog = false;
        })
        .catch(() => {
          this.loginError = true;
          this.openRegisterIsDisabled = false;
        })
        .finally(() => {
          this.loginLoading = false;
        })
      },
      onRegisterFormOpened() {
        this.loginError = false;
        this.registerFormIsOpen = true;
        this.cardTitle = "Register";
      },
      onClose() {
        this.loginError = false;
        this.showLoginDialog = false;
        this.registerFormIsOpen = false;
      },
      register() {
        this.registerLoading = true;
        register({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        .then((result) => {
          this.$store.commit('UserStore/setUser', result);
          this.registerLoading = false;
          this.showLoginDialog = false;
        })
        .catch((error) => {
          console.log(error);
        });
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

  .error-msg {
    color: red !important
  }
</style>