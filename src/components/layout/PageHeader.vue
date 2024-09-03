<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/home">OpenMusic</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <form class="d-flex col-4" v-on:keyup.enter="detailedSearch(this.$refs.search.value)" @submit.prevent="executePreSearch(this.$refs.search.value)">
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
          <router-link class="link-light" to="/login" v-if="!isLoggedIn">
            Log in/Register
          </router-link>

          <div class="dropdown" v-if="isLoggedIn">
            <a class="dropdown-toggle link-light me-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Welcome back {{ getUserName }}
            </a>

            <ul class="dropdown-menu">
              <li><router-link to="/profile" class="dropdown-item" href="#">Profile</router-link></li>
              <li><a class="dropdown-item" @click="logout" href="#">Log out</a></li>
              <li v-if="userRole == 'Admin'"><router-link to="/artist/new" class="dropdown-item">Admin - create artist</router-link></li>
              <li v-if="userRole == 'Admin'"><router-link to="/album/new" class="dropdown-item">Admin - create album</router-link></li>
              <li v-if="userRole == 'Admin'"><router-link to="/song/new" class="dropdown-item">Admin - create song</router-link></li>
            </ul>
          </div>
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
    userRole() {
      console.log("USER ROLE: " + this.$store.getters['user/userRole']);
      return this.$store.getters['user/userRole'];
    }
  },
  methods: {
    executePreSearch(input) {
      return this.$store.dispatch('searchResults/executePreSearch', input);
    },
    detailedSearch(input) {      
      this.$store.dispatch('searchResults/setCurrentSearch', input)
      console.log("Search!")
      //this.$router.replace('/search?queryString=' + input);
      this.clearSearchBox();
    },
    logout() {
      let text = "Are you sure you want tom log out?";
      if (confirm(text) == true) {
        this.$store.dispatch('user/logoutUser');
      } else {
        return;
      }
    },
    fillSearch(input) {
      this.$refs.search.value = input;
      this.$store.dispatch('searchResults/setCurrentSearch', input)
      return this.$store.dispatch('searchResults/executePreSearch', input);
    },
    clearSearchBox() {
      this.fillSearch(null);
    }
  },
};
</script>
<style lang="scss">
@import './PageHeader.scss';
</style>