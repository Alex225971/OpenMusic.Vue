<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="my-0 m-auto col-6 p-5">
      <div class="row">
        <div class="col-lg-4">
          <img class="w-100 h-auto" :src="getAlbum.image" />
          <h3 class="mt-3 text-center">{{ getAlbum.name }}</h3>
          <p class="mt-2 text-center">{{ getAlbum.description }}</p>
        </div>
        <div class="col-lg-8">
          <h4 class="text-center">Songs</h4>
          <p v-if="getAlbum.songs.length == 0" class="text-center">
            No songs in this album, strange...
          </p>
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
