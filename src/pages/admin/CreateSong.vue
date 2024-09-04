<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form @submit.prevent="createSong">
    <div class="row">
      <div class="col-6">
        <h5 for="artist" v-if="artists && artists.length > 0">Artist</h5>
        <div class="dropdown mb-3" v-if="artists && artists.length > 0">
          <a class="dropdown-toggle btn btn-outline-light" name="artist" type="button" data-bs-toggle="dropdown" aria-expanded="false" ref="artistName" v-bind="artistName">
            Unknown Artist (empty)
          </a>
          <ul class="dropdown-menu">
            <li v-if="currentArtistId"><a class="dropdown-item"  @click="selectArtist(null)">Unknown Artist (empty)</a></li>
            <li><a class="dropdown-item" v-for="artist in artists" :key="artist.id" @click="selectArtist(artist.id)">{{ artist.name }}</a></li>
          </ul>
        </div>
        <hr v-if="artists && artists.length > 0"/>

        <h5 class="mb-3">Song details</h5>
        <label for="songTitle" class="form-label">Song title <span class="text-danger">*</span></label>
        <input type="text" class="form-control mb-3" placeholder="Title" id="songTitle" name="songTitle">

        <label for="releaseDate" class="form-label">Song release date</label>
        <input type="date" class="form-control mb-3" id="releaseDate" min="1">

        <label for="songFile" class="form-label">Song file</label>
        <input @change="onFileSelected" name="songFile" class="form-control mb-3" type="file" id="songFile"/>

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
    selectArtist(artistId) {
      if(artistId != null) {
        this.$refs.artistName.innerHTML = this.$store.getters['artists/getArtists'].find(artist => artist.id === artistId).name;
      } else {
        this.$refs.artistName.innerHTML = 'Unknown Artist (empty)';
      }
      this.$store.dispatch('artists/selectArtist', artistId);
    },
    createSong() {
      this.$store.dispatch('songs/createSong');
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
  }
}
</script>
