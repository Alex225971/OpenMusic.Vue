<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <h1 class="mt-5 ms-5">{{ getArtist.name }}</h1>
    <p class="mt-2 ms-5">{{ getArtist.bio }}</p>
    <hr/>
    <div class="row mt-2 ms-5" v-if="getArtist.songs.length > 0">
      <div class="col-12 ">
        <h2>Songs</h2>
        <div class="row" v-for="song in getArtist.songs" :key="song.id">
          <div class="col-3">
            <h5>{{ song.title }}</h5>
          </div>
          <div class="col-2">
            <h5>{{ song.artistName }}</h5>
          </div>
          <div class="col-2">
            <h5>{{ song.albumName || 'Single' }}</h5>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row mt-2 ms-5" v-if="getArtist.albums.length > 0">
      <h2>Albums</h2>
      <div v-for="album in getArtist.albums" :key="album.id" class="col-1">
        <img :src="album.image" :alt="album.name" class="mt-3 img-thumbnail">
        <h5 class="mt-2">{{ album.title }}</h5>
        <p>{{ album.year }}</p>
      </div>
    </div>
    <hr/>
  </div>
</template>
<script>
export default {
  created() {
    this.loadArtistInDetail();
  },
  computed: {
    getArtist() {
      return this.$store.getters['artists/currentArtist'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
  methods: {
    loadArtistInDetail() {
      this.$store.dispatch('artists/loadInDetail', {
        id: this.$route.params.id,
      });
    },
  },
};
</script>
