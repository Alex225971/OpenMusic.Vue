<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form @submit.prevent="putSong(getSong.id)">
    <div class="row">
      <div class="col-6">
        <h5 class="mb-3">Artist details</h5>
        <label for="artist" class="form-label">Artist (select)</label>
        <select class="dropdown mb-3 form-select" v-if="artists && artists.length > 0" v-model="getSong.artistName" @change="selectArtist(getSong.artistName)">
          <option class="dropdown-toggle" name="artist" type="button" data-bs-toggle="dropdown" aria-expanded="false" ref="artistName">
            Unknown Artist (empty)
          </option>
          <option class="dropdown-item" v-for="artist in artists" :key="artist.id" @click="selectArtist(artist.id)">{{ artist.name }}</option>
        </select>

        <hr/>

        <h5 class="mb-3">Album details</h5>
        <label for="album" class="form-label">Album (select)</label>
        <select class="dropdown mb-3 form-select" v-if="albums && albums.length > 0" v-model="getSong.albumTitle" @change="selectAlbum(getSong.albumTitle)">
          <option class="dropdown-toggle" name="album" type="button" data-bs-toggle="dropdown" aria-expanded="false" ref="albumTitleNull" value="Unknown Album (single)">
            Unknown Album (single)
          </option>
          <option class="dropdown-item" v-for="album in albums" :key="album.id" @click="selectAlbum(album.id)">{{ album.title }}</option>
        </select>

        <hr/>

        <h5 class="mb-3">Song details</h5>
        <label for="songTitle" class="form-label">Song title <span class="text-danger">*</span></label>
        <input type="text" class="form-control mb-3" placeholder="Title" id="songTitle" name="songTitle" v-model="getSong.title">

        <label for="releaseDate" class="form-label">Song release date</label>
        <input type="date" class="form-control mb-3" id="releaseDate" min="1" v-model="getSong.releaseDate">

        <label for="songGenre" class="form-label">Genres</label>
        <input type="text" class="form-control mb-3" placeholder="Genres, separated by commas" id="songGenre">

        <div class="alert alert-warning"><i class="bi bi-info-circle me-2"></i> Song files cannot be changed once uploaded (yet)</div>

        <button class="btn btn-light">Submit</button>
      </div>
    </div>
    </form>
  </div>
</template>
<script>
export default {
  async created() {
    await this.$store.dispatch('songs/loadInDetail', {id: this.$route.params.id,});
    this.$store.dispatch('albums/getAlbumsByArtist', this.getSong.artistId);
    this.$store.dispatch('artists/getArtistsForSelect');
    if(!this.getSong.albumTitle) {
      this.getSong.albumTitle = 'Unknown Album (single)'
    }
  },
  onMounted() {
    console.log("GETTING ALBUMS BY ARTIST")
    this.$store.dispatch('albums/getAlbumsByArtist', this.getSong.artistId);
    this.onArtistSelect();
  },
  computed: {
    artists() {
      return this.$store.getters['artists/getArtistsForSelect'];
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
    selectArtist(artistName) {
      var artistId = this.$store.getters['artists/getArtistsForSelect'].find(artist => artist.name === artistName).id;
      if(artistId) {
        this.$refs.artistName.innerHTML = this.$store.getters['artists/getArtistsForSelect'].find(artist => artist.name === artistName).name;
        this.$store.dispatch('artists/selectArtist', artistId);
        this.$store.dispatch('albums/getAlbumsByArtist', artistId);
      } else {
        this.$refs.artistName.innerHTML = 'Unknown Artist (empty)';
      }
      this.$store.dispatch('artists/selectArtist', artistId);
    },
    selectAlbum(albumTitle) {
      if(this.getSong.albumTitle === 'Unknown Album (single)') {
        console.log("HOORAY");
        this.$store.dispatch('albums/deSelectAlbum');
      } else {
        var albumId = this.$store.getters['albums/getAlbums'].find(album => album.title === albumTitle).id;
        this.$store.dispatch('albums/selectAlbum', albumId);
      }
    },
    putSong(songId) {
      console.log("SONG: " + JSON.stringify(songId))
      this.$store.dispatch('songs/putSong', {
        id: songId,
        title: this.getSong.title,
        artistId: this.$store.getters['artists/currentArtistId'],
        albumId: this.$store.getters['albums/currentAlbumId'],
        releaseDate: this.getSong.releaseDate
      });
    }
  },
};
</script>
