<template>
  <div class="col-10 p-5">
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
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p>
      Haven't set up an account yet?
      <router-link to="/register" class="link-light"
        >register an account now</router-link
      >
    </p>
  </div>
</template>
