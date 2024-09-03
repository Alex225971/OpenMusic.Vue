<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form @submit.prevent="createAlbum">
    <div class="row">
      <div class="col-6">
        <label for="albumTile" class="form-label">Album title <span class="text-danger">*</span></label>
        <input type="text" class="form-control mb-3" placeholder="Title" id="albumTile" v-model="albumTitle">

        <label for="albumYear" class="form-label">Album year</label>
        <input type="number" class="form-control mb-3" placeholder="2024" id="albumYear" min="1" v-model="albumYear">

        <label for="albumCover" class="form-label">Album cover image</label>
        <input class="form-control mb-3" name="albumCover" type="file" id="image" @change="onFileSelected" />

        <button class="btn btn-light">Submit</button>
      </div>
      <!-- TODO - add programmatically produced song fields -->
      <!-- <div class="col-6">
        <h5 id="songButton">Songs</h5>
        <button class="btn btn-light" type="button" @click="generateSongField"><i class="bi bi-plus"></i></button>
      </div> -->
    </div>
    </form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        selectedFile: null,
      };
    },
    created() {
      this.$store.dispatch('artists/getArtists');
    },
    computed: {
      artists() {
        return this.$store.getters['artists/getArtists'];
      }
    },
    methods: {
      onFileSelected(event) {
        this.selectedFile = event.target.files[0];
      },
      createAlbum() {
        this.$store.dispatch('albums/createAlbum', {
          title: this.albumTitle,
          year: this.albumYear,
          image: this.selectedFile,
          artistId: ''
        });
      }
    }
}
</script>
