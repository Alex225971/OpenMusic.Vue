<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="my-0 m-auto col-6 p-5">
      <div class="row">
        <div class="col-lg-4">
          <img class="w-100 h-auto" :src="getPlaylist.imageUrl" />
          <h3 class="mt-3 text-center">{{ getPlaylist.name }}</h3>
          <p class="mt-2 text-center">{{ getPlaylist.description }}</p>
        </div>
        <div class="col-lg-8">
          <h4 class="text-center">Songs</h4>
          <p v-if="getPlaylist.songs.length == 0" class="text-center">
            No songs yet, add some!
          </p>
          <div v-for="song in getPlaylist.songs" :key="song.id">
            <div class="row">
              <div class="col-9">
                {{ song.title }} ({{ song.releaseDate }}) - {{ song.artistName || 'Unknown Artist' }} - {{ song.albumTitle || ' (Single)' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.loadPlaylistInDetail();
  },
  computed: {
    getPlaylist() {
      return this.$store.getters['playlists/currentPlaylist'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
  methods: {
    loadPlaylistInDetail() {
      this.$store.dispatch('playlists/loadInDetail', {
        id: this.$route.params.id,
      });
    },
  },
};
</script>
