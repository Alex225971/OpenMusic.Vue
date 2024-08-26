<template>
  <div class="col-10 p-5">
    <h1 class="mb-5">Login</h1>
    <form class="col-sm-12 col-md-8 col-lg-4 mb-4" @submit.prevent="submitForm">
      <div>
        <label for="loginEmail" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control mb-3"
          id="loginEmail"
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
      <button type="submit" class="btn btn-primary">{{ submitButtonCaption }}</button>
    </form>
    <p v-if="!formIsValid" class="text-danger" >Please enter a valid email and password.</p>
    <p>
      Haven't set up an account yet?
      <a @click="switchMode" class="link-light">register an account now</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
    };
  },
  computed: {
    submitButtonCaption() {
      if(this.mode === 'login') {
        return 'Login';
      } else {
        return 'Register'
      }
    },
    switchModeButtonCaption() {
      if(this.mode === 'login') {
        return 'Switch to register';
      } else {
        return 'Switch to login'
      }
    }
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if(this.email === '' || !this.email.includes('@') || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      console.log(formData);
      this.$store.dispatch('users/loginUser', formData);
    },
    switchMode() {
      if(this.mode === 'login') {
        this.mode = 'register';
      } else {
        this.mode = 'login';
      }
    },
  },
};
</script>
