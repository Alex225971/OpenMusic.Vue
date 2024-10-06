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
        <form class="d-flex col-4" v-on:keyup.enter="detailedSearch(this.$refs.search.value, true)" @submit.prevent="detailedSearch(this.$refs.search.value, true)">
          <input
            class="form-control search-bar"
            type="search"
            placeholder="Search songs, albums, artists"
            aria-label="Search"
            v-on:keyup="executePreSearch($event.target.value)"
            ref="search"
            @focus="setActive"
            @blur="setInactive"
          />
          <div class="search-results col-4" :class="{ active: isActive, hidden: isActive == false }" v-show="this.isActive">
            <div class="row my-2" v-if="searchResults">
                <router-link class="col-11 p-2 mx-3 search-results-item" @click="fillSearch(this.$refs.search.value)" :to="{ path: '/search', name: 'search', query: { queryString: this.$refs.search.value }}"><i class="bi bi-search p-1 pe-2"></i> {{ this.$refs.search.value }}</router-link>
                
                <router-link v-for="playlist in searchResults.playlists" :key="playlist.id" class="col-11 p-2 mx-3 search-results-item" @click="fillSearch(playlist.name)" :to="{ path: '/search', name: 'search', query: { queryString: playlist.name }}"><i class="bi bi-search p-1 pe-2"></i> {{ playlist.name }}</router-link>
                
                <router-link v-for="album in searchResults.albums" :key="album.id" class="col-11 p-2 mx-3 search-results-item" @click="fillSearch(album.title)" :to="{ path: '/search', name: 'search', query: { queryString: album.title }}"><i class="bi bi-search p-1 pe-2"></i> {{ album.title }}</router-link>
                
                <router-link v-for="artist in searchResults.artists" :key="artist.id" class="col-11 p-2 mx-3 search-results-item" @click="fillSearch(artist.name)" :to="{ path: '/search', name: 'search', query: { queryString: artist.name }}"><i class="bi bi-search p-1 pe-2"></i> {{ artist.name }}</router-link>
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
              <li v-if="userRole == 'Admin'"><router-link to="/artist/menu" class="dropdown-item">Admin-artist menu</router-link></li>
              <li v-if="userRole == 'Admin'"><router-link to="/album/menu" class="dropdown-item">Admin-albums menu</router-link></li>
              <li v-if="userRole == 'Admin'"><router-link to="/song/menu" class="dropdown-item">Admin-songs menu</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import router from '../../router.js';

export default {
  data() {
    return {
      searchResultsData: this.$store.getters['searchResults/searchResults'],
      isActive: false,
      isHidden: true,
      usingSubmit: false,
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
      return this.$store.getters['user/userRole'];
    },
    currentSearch() {
      return this.$store.getters['searchResults/currentSearch'];
    }
  },
  methods: {
    setActive() {
      console.log("SEARCH ACTIVE")
      this.isActive = true;
    },
    setInactive() {
      setTimeout(() => {
        console.log("SEARCH INACTIVE")
          this.isActive = false;
      }, 100);
    },
    executePreSearch(input) {
      return this.$store.dispatch('searchResults/executePreSearch', input);
    },
    detailedSearch(input, submitUsed) {
      console.log("EXECUTING DETAILED SEARCH WITH DATA: " + input);
      this.$store.dispatch('searchResults/setCurrentSearch', input);

      if(submitUsed) {
        //this.handleLinkClick();
        console.log("SUBMIT WAS USED");
        this.$router.push({ 
          name: 'search', 
          query: { queryString: input }
        });
      }
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
      this.$store.dispatch('searchResults/setCurrentSearch', input);
      //this.handleLinkClick();
      if(this.$refs.searchResults) {      
        this.$refs.searchResults.$el.classList.add('hidden')
      }
      return this.$store.dispatch('searchResults/executePreSearch', input);
    },
    // clearSearchBox() {
    //   console.log("CLEARING SEARCH")
    //   this.fillSearch(null);
    // },
  },
};
</script>
<style lang="scss">
@import './PageHeader.scss';
</style>