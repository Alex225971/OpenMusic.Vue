<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form>
    <div class="row">
      <div class="col-6">
        <label for="songTitle" class="form-label">Song title <span class="text-danger">*</span></label>
        <input type="text" class="form-control mb-3" placeholder="Title" id="songTitle">
        <label for="releaseDate" class="form-label">Song release date</label>
        <input type="date" class="form-control mb-3" id="releaseDate" min="1">
        <label for="playlistCover" class="form-label">Song file</label>
        <input name="songFile" class="form-control mb-3" type="file" id="songFile" @change="onFileSelected"/>
        <label for="songGenre" class="form-label">Genres</label>
        <input type="text" class="form-control mb-3" placeholder="Genres, separated by commas" id="songGenre">
        <button class="btn btn-light">Submit</button>
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
