<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form @submit.prevent="createAlbum">
    <div class="row">
      <div class="col-6">
        <label for="artist" class="form-label">Artist (select)</label>
        <div class="dropdown mb-3" v-if="artists && artists.length > 0">
          <a class="dropdown-toggle btn btn-outline-light" name="artist" type="button" data-bs-toggle="dropdown" aria-expanded="false" ref="artistName" v-bind="artistName">
            Unknown Artist (empty)
          </a>
          <ul class="dropdown-menu">
            <li v-if="currentArtistId"><a class="dropdown-item"  @click="selectArtist(null)">Unknown Artist (empty)</a></li>
            <li><a class="dropdown-item" v-for="artist in artists" :key="artist.id" @click="selectArtist(artist.id)">{{ artist.name }}</a></li>
          </ul>
        </div>

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
      },
      currentArtistId() {
        return this.$store.getters['artists/currentArtistId'];
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
      },
      selectArtist(artistId) {
        if(artistId != null) {
          this.$refs.artistName.innerHTML = this.$store.getters['artists/getArtists'].find(artist => artist.id === artistId).name;
        } else {
          this.$refs.artistName.innerHTML = 'Unknown Artist (empty)';
        }
        this.$store.dispatch('artists/selectArtist', artistId);
      },
    }
}
</script>
