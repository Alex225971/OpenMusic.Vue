<template>
  <div class="col-10 p-5">
    <h1 class="mb-5">{{ submitButtonCaption }}</h1>
    <div>
      <div class="d-flex justify-content-center" v-if="isLoading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <form class="col-sm-12 col-md-8 col-lg-4 mb-4" @submit.prevent="submitForm">
      <div>
        <label
          for="exampleInputEmail1"
          class="form-label"
          v-if="mode == 'register'"
          >First name</label
        >
        <input
          type="name"
          class="form-control mb-3"
          id="firstName"
          placeholder="First name"
          aria-describedby="name"
          v-model.trim="firstName"
          v-if="mode == 'register'"
        />
        <label
          for="exampleInputEmail1"
          class="form-label"
          v-if="mode == 'register'"
          >Last name</label
        >
        <input
          type="name"
          class="form-control mb-3"
          id="lastName"
          placeholder="Last name"
          aria-describedby="name"
          v-model.trim="lastName"
          v-if="mode == 'register'"
        />
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control mb-3"
          id="exampleInputEmail1"
          placeholder="example@example.com"
          aria-describedby="emailHelp"
          v-model.trim="email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control mb-3"
          placeholder="Password"
          id="exampleInputPassword1"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ submitButtonCaption }}
      </button>
    </form>
    <p v-if="!formIsValid" class="text-danger">
      Please enter a valid email and password.
    </p>
    <p>
      <a @click="switchMode" href="#" class="link-light pe-auto">{{
        switchModeButtonCaption
      }}</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      formIsValid: true,
      mode: 'register',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Register';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Register an account';
      } else {
        return 'Switch to login';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
      console.log(formData);
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('user/loginUser', {
            email: this.email,
            password: this.password
          });
        } else {
          await this.$store.dispatch('user/registerUser', formData);
        }
      } catch (error) {
        this.error = new Error(error.message || 'Authentication failed');
      }

      this.isLoading = false;
    },
    switchMode() {
      if (this.mode === 'login') {
        this.mode = 'register';
      } else {
        this.mode = 'login';
      }
    },
  },
};
</script>
