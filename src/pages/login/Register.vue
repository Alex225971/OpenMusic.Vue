<template>
  <div class="col-10 p-5">
  <h1 class="mb-5">Register</h1>
    <form class="col-sm-12 col-md-8 col-lg-4 mb-4" @submit.prevent="submitForm">
      <div>
        <label for="exampleInputEmail1" class="form-label">First name</label>
        <input
          type="name"
          class="form-control mb-3"
          id="firstName"
          placeholder="First name"
          aria-describedby="name"
          v-model.trim="firstName"
        />
        <label for="exampleInputEmail1" class="form-label">Last name</label>
        <input
          type="name"
          class="form-control mb-3"
          id="lastName"
          placeholder="Last name"
          aria-describedby="name"
          v-model.trim="lastName"
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
        <div id="emailHelp" class="form-text mb-3 text-light">
          We'll never share your email with anyone else.
        </div>
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
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <p>
      Already have an account?
      <router-link to="/login" class="link-light">log in instead</router-link>
    </p>
  </div>
</template>

<script>
export default {
    data() {
        return {
            firstName:'',
            lastName:'',
            email:'',
            password:''
        }
    },
    methods: {
        submitForm() {
            const formData = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            };
            console.log(formData)
            this.$store.dispatch('users/registerUser', formData)
        }
    }
}
</script>
