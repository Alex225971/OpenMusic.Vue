<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form @submit.prevent="putSong">
    <div class="row">
      <div class="col-6">
        <h5 class="mb-3">Artist details</h5>
        <p>{{ getSong.artistName || 'Unknown Artist'}}</p>
        <hr/>

        <h5 class="mb-3">Album details</h5>
        <p>{{ getSong.albumTitle || 'Single' }}</p>
        <hr/>

        <h5 class="mb-3">Song details</h5>
        <label for="songTitle" class="form-label">Song title <span class="text-danger">*</span></label>
        <input type="text" class="form-control mb-3" placeholder="Title" id="songTitle" name="songTitle" v-model="getSong.title">

        <label for="releaseDate" class="form-label">Song release date</label>
        <input type="date" class="form-control mb-3" id="releaseDate" min="1" v-model="getSong.releaseDate">

        <label for="songGenre" class="form-label">Genres</label>
        <input type="text" class="form-control mb-3" placeholder="Genres, separated by commas" id="songGenre">

        <p class="form-label">Song files cannot be changed once uploaded</p>

        <button class="btn btn-light">Submit</button>
      </div>
    </div>
    </form>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('songs/loadInDetail', {id: this.$route.params.id,});
    this.$store.dispatch('artists/getArtists');
  },
  onMounted() {
    this.$store.dispatch('albums/getAlbumsByArtist', this.getSong.artistId);
    this.onArtistSelect();
  },
  computed: {
    artists() {
      return this.$store.getters['artists/getArtists'];
    },
    albums() {
      return this.$store.getters['albums/getAlbums'];
    },
    getSong() {
      return this.$store.getters['songs/currentSong'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
  methods: {
    onArtistSelect(event) {
        if(event.target.value === '') {
            console.log("SINGLE SELECTED")
        } else {
            const selectedArtistId = event.target.value;
            this.$store.dispatch('albums/getAlbumsByArtist', selectedArtistId);
        }
        
    },
    selectArtist(artistId) {
        console.log("ARTIST ID: " + artistId);
      if(artistId != null) {
        this.$refs.artistName.innerHTML = this.$store.getters['artists/getArtists'].find(artist => artist.id === artistId).name;
        this.$store.dispatch('artists/selectArtist', artistId);
        this.$store.dispatch('albums/getAlbumsByArtist', artistId);
      } else {
        this.$refs.artistName.innerHTML = 'Unknown Artist (empty)';
      }
      this.$store.dispatch('artists/selectArtist', artistId);
    },
    putSong(song) {
      this.$store.dispatch('songs/putSong', song);
    }
  },
};
</script>
