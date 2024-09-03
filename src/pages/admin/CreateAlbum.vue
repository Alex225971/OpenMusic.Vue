<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form>
    <div class="row">
      <div class="col-6">
        <label for="albumTile" class="form-label">Album title <span class="text-danger">*</span></label>
        <input type="text" class="form-control mb-3" placeholder="Title" id="albumTile">
        <label for="albumYear" class="form-label">Album year</label>
        <input type="number" class="form-control mb-3" placeholder="2024" id="albumYear" min="1">
        <label for="playlistCover" class="form-label">Playlist cover photo</label>
        <input name="image" class="form-control mb-3" type="file" id="image" @change="onFileSelected"/>
        <button class="btn btn-light">Submit</button>
      </div>
      <div class="col-6">
        <h5 id="songButton">Songs</h5>
        <button class="btn btn-light" type="button" @click="generateSongField"><i class="bi bi-plus"></i></button>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
export default {
    created() {
        
    },
    computed: {
        artists() {
            return this.$store.getters['artists/getArtists'];
        }
    },
    methods: {
      generateSongField() {
        
      }
    }
}
</script>
