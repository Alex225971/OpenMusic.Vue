<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/home">OpenMusic</a>
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
            class="form-control search-bar"
            type="search"
            placeholder="Search songs, albums, artists"
            aria-label="Search"
            v-on:keyup="executePreSearch($event.target.value)"
            ref="search"
          />
          <div class="search-results col-4">
            <div class="row my-2" v-if="searchResults">
              <div class="col-12 ms-3 m-2">
                <router-link @click="fillSearch(this.$refs.search.value)" :to="{ path: '/search', name: 'search', params: { queryString: this.$refs.search.value }}"><i class="bi bi-search p-1 pe-2"></i> {{ this.$refs.search.value }}</router-link>
              </div>
              <div class="col-12 ms-3 m-2" v-for="playlist in searchResults.playlists" :key="playlist.id">
                <router-link @click="fillSearch(playlist.name)" :to="{ path: '/search', name: 'search', params: { queryString: playlist.name }}"><i class="bi bi-search p-1 pe-2"></i> {{ playlist.name }}</router-link>
              </div>
            </div>
          </div>
          <button class="btn btn-outline-light search-button" type="submit">
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
  data() {
    return {
      searchResultsData: this.$store.getters['searchResults/searchResults']
    };
  },
  computed: {
    getUserName() {
      return this.$store.getters['user/userName'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
    searchResults() {
      return this.$store.getters['searchResults/searchResults'];
    },
  },
  methods: {
    executePreSearch(input) {
      return this.$store.dispatch('searchResults/executePreSearch', input);
    },
    detailedSearch() {
      console.log("Search!")
    },
    logout() {
      this.$store.dispatch('user/logoutUser');
    },
    fillSearch(input) {
      this.$refs.search.value = input;
    }
  },
};
</script>
<style lang="scss">
@import './PageHeader.scss';
</style>