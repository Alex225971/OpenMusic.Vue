<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="my-0 m-auto col-6 p-5">
      <div class="row">
        <div class="col-lg-4">
          <img class="w-100 h-auto" :src="getAlbum.image" />
          <h3 class="mt-3 text-center">{{ getAlbum.title }}</h3>
          <p class="mt-2 text-center">{{ getAlbum.artistName }}</p>
        </div>
        <div class="col-lg-8">
          <h4 class="text-center">Songs</h4>
          <p v-if="getAlbum.songs.length == 0" class="text-center">
            No songs in this album, strange...
          </p>
          <div class="row" v-for="song in getAlbum.songs" :key="song.id">
            <div class="col-1">
              <p class="m-2">{{ song.id }}</p> 
            </div>
            <div class="col-10">
              <p class="m-2">{{ song.title }}</p>
            </div>
            <div class="col-1">
              <i class="bi bi-plus m-2"></i>
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
    this.loadAlbumInDetail();
  },
  computed: {
    getAlbum() {
      return this.$store.getters['albums/currentAlbum'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
  methods: {
    loadAlbumInDetail() {
      this.$store.dispatch('albums/loadInDetail', {
        id: this.$route.params.id,
      });
    },
  },
};
</script>
