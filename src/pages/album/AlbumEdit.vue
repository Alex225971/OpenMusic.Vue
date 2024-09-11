<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="my-0 m-auto col-6 p-5">
      <form @submit.prevent="createAlbum">
    <div class="row">
      <div class="col-6">
        <label for="artist" class="form-label">Artist (select)</label>
        <div class="dropdown mb-3" v-if="artists && artists.length > 0">
          <a class="dropdown-toggle btn btn-outline-light" name="artist" type="button" data-bs-toggle="dropdown" aria-expanded="false" ref="artistName">
            Unknown Artist (empty)
          </a>
          <ul class="dropdown-menu">
            <li v-if="currentArtistId"><a class="dropdown-item"  @click="selectArtist(null)">Unknown Artist (empty)</a></li>
            <li><a class="dropdown-item" v-for="artist in artists" :key="artist.id" @click="selectArtist(artist.id)">{{ artist.name }}</a></li>
          </ul>
        </div>

        <label for="albumTile" class="form-label">Album title <span class="text-danger">*</span></label>
        <input type="text" class="form-control mb-3" placeholder="Title" id="albumTile" v-model="getAlbum.title">

        <label for="albumYear" class="form-label">Album year</label>
        <input type="number" class="form-control mb-3" placeholder="2024" id="albumYear" min="1" v-model="getAlbum.year">

        <button class="btn btn-light">Submit</button>
      </div>
      <div class="col-6">
        <div class="form-group mb-3" v-for="(song, index) in getAlbum.songs" :key="index">
            <div class="row">
              <div class="col-4">
                <label class="form-label" :for="'songTitle-' + index">Song {{ index + 1 }} name</label>
                <input class="form-control" v-model="song.title" :id="'songTitle-' + index" type="text" placeholder="Song title" />
              </div>
              <div class="col-4">
                <label class="form-label" :for="'releaseDate-' + index">Release date</label>
                <input type="date" class="form-control" :id="'releaseDate-' + index" min="1" v-model="song.releaseDate">
              </div>
              <div class="col-4">
                <label class="form-label" :for="'songFile-' + index">Song file</label>
                <input @change="onFileSelected($event, index)" name="songFile" class="form-control" type="file" :id="'songFile-' + index"/>
              </div>
            </div>
          </div>

        <button class="btn btn-outline-light" type="button" @click="addSong">Add song<i class="bi bi-plus"></i></button>
      </div>
    </div>
    </form>
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
