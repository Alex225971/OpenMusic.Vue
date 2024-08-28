<template>
  <div class="my-0 m-auto col-6 p-5">
    <div class="row">
      <p>{{ getPlaylist }}</p>
      <div class="col-lg-4">
        <img class="w-100 h-auto" :src="getPlaylist.imageUrl" />
        <h3 class="mt-3 text-center">{{ getPlaylist.name }}</h3>
        <p class="mt-2 text-center">{{ getPlaylist.description }}</p>
      </div>
      <div class="col-lg-8">
        <h4 class="text-center">Songs</h4>
        <p v-if="getPlaylist.songs.length == 0" class="text-center">No songs yet, add some!</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.loadPlaylistInDetail();
    console.log('ON CREATED WAS TRIGGERED');
  },
  onUpdated() {
    console.log('ON UPDATE WAS TRIGGERED');
  },
  onMounted() {
    console.log('ON MOUNTED WAS TRIGGERED');
  },
  computed: {
    getPlaylist() {
      console.log(
        'Returning: ' + this.$store.getters['playlists/currentPlaylist']
      );
      return this.$store.getters['playlists/currentPlaylist'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
  methods: {
    loadPlaylistInDetail() {
      console.log('Discovered ID: ' + this.$route.params.id);
      this.$store.dispatch('playlists/loadInDetail', {
        id: this.$route.params.id,
      });
    },
  },
};
</script>
