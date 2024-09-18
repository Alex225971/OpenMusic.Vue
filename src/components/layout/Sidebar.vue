<template>
  <div class="sidebar sidebar-dark bg-dark col-2 border-end border-secondary flex-grow-1">
    <div class="sidebar-list text-light">
      <ul>
        <li>
          <router-link to="/home" class="link-light mb-2"
            ><i class="bi bi-house-door-fill me-2"></i> Home</router-link
          >
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/library" class="link-light"
            ><i class="bi bi-cassette-fill me-2"></i> My library</router-link
          >
        </li>
      </ul>
    </div>
    <hr />
    <h5 v-if="isLoggedIn" class="text-center">Playlists</h5>
    <div class="sidebar-list text-light">
      <ul>
        <li v-if="isLoggedIn">
          <router-link to="/playlist/new" class="btn btn-outline-success text-light mb-2">
            <i class="bi bi-plus me-2"></i> Create a new playlist
          </router-link>
        </li>
        <router-link @click="getNewPlaylist(playlist.id)" class="link-light mb-2" v-for="playlist in playlists" :key="playlist.id" :to="{path: '/playlist/' + playlist.id}">{{ playlist.name }}</router-link>
      </ul>
    </div>

    <p v-if="!isLoggedIn">
      You need to
      <router-link class="link-light" to="/login">log in</router-link> to create
      a playlist
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: this.$store.getters['playlists/playlistDetails'],
      playlistData: this.$store.getters['playlists/playlistDetails']
    };
  },
  created() {
    //TODO - make sure user is logged in before making request for playlists
    if(this.isLoggedIn) {
      this.loadPlaylists();
    }
  },
  methods: {
    loadPlaylists() {
      this.$store.dispatch('playlists/getUserPlaylists', {
        token: localStorage.getItem('token'),
        creatorId: localStorage.getItem('userId'),
      });
    },
    getNewPlaylist(id) {
      this.$store.dispatch('playlists/loadInDetail', {
        id: id
      });
    }
  },
  computed: {
    playlists() {
      return this.$store.getters['playlists/playlistDetails'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
};
</script>

<style lang="scss">
@import './Sidebar.scss';
</style>
