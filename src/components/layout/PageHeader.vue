<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">OpenMusic</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <form class="d-flex col-4" @submit.prevent="executeSearch">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search songs, albums, artists"
            aria-label="Search"
          />
          <button class="btn btn-outline-light" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
        <div class="user-link">
          <router-link class="link-light" to="/login" v-if="!isLoggedIn"
            >Log in/Register</router-link
          >
          <a @click="logout" class="link-light me-2" to="/profile" v-if="isLoggedIn"
            >Welcome back {{ getUserName }}</a
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    getUserName() {
      return this.$store.getters['user/userName'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
  methods: {
    executeSearch() {
      this.$store.dispatch('search/executeSearch');
    },
    logout() {
      this.$store.dispatch('user/logoutUser');
    },
  },
};
</script>
