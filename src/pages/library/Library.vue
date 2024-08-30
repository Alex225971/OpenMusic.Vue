<template>
    <div class="col-10 p-5 pb-0">
        <h1>Welcome to your library</h1>
        <p>Here you can find your created playlists and your liked artists, songs, albums and playlists</p>
        <hr/>
        <h3 class="mt-3">Your playlists</h3>
        <div class="row">
            <div v-for="playlist in playlists" :key="playlist.id" class="card text-light playlist-card border border-light bg-dark col-xl-2 col-lg-4 col-md-6 m-3">
                <img :src="playlist.imageUrl" class="card-img-top playlist-thumbnail" :alt="playlist.name + 'thumbnail image'">
                <div class="card-body">
                    <h5 class="card-title">{{ playlist.name }}</h5>
                    <p class="card-text">{{ playlist.description }}</p>
                </div>
            </div>
        </div>
        <hr/>
        <h3 class="mt-3">Liked playlists</h3>
        <p>Coming soon!</p>
        <hr/>
        <h3 class="mt-3">Liked artists</h3>
        <p>Coming soon!</p>
        <hr/>
        <h3 class="mt-3">Liked songs</h3>
        <p>Coming soon!</p>
        
    </div>
</template>
<script>
export default {
  data() {
    return {
      playlistData: this.$store.getters['playlists/playlistDetails']
    };
  },
  methods: {
    loadPlaylists() {
      this.$store.dispatch('playlists/getUserPlaylists', {
        token: localStorage.getItem('token'),
        creatorId: localStorage.getItem('userId'),
      });
    },
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
@import './Library.scss';
</style>