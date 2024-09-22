<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="my-0 m-auto col-12 p-5">
      <form @submit.prevent="putAlbum">
    <div class="row">
      <div class="col-6">
        <label for="artist" class="form-label">Artist (select)</label>
        <select class="dropdown mb-3 form-select" v-if="artists && artists.length > 0" v-model="getAlbum.artistName" @change="selectArtist(getAlbum.artistName)">
          <option class="dropdown-toggle" name="artist" type="button" data-bs-toggle="dropdown" aria-expanded="false" ref="artistName">
            Unknown Artist (empty)
          </option>
          <option class="dropdown-item" v-for="artist in artists" :key="artist.id" @click="selectArtist(artist.id)">{{ artist.name }}</option>
        </select>

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
                <input type="date"  class="form-control" :id="'releaseDate-' + index" min="1" v-model="song.releaseDate">
              </div>
              <div class="col-4">
                <label class="form-label" :for="'songFile-' + index">Song file</label>
                <input  @change="onFileSelected($event, index)" name="songFile" class="form-control" type="file" :id="'songFile-' + index"/>
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
  data() {
      return {
        selectedFile: null,
        songFiles: [],
        songs: []
      };
    },
  created() {
    this.loadAlbumInDetail();
    this.$store.dispatch('artists/getArtists');
  },
  computed: {
    artists() {
      return this.$store.getters['artists/getArtists'];
    },
    getAlbum() {
      return this.$store.getters['albums/currentAlbum'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
    currentArtistId() {
      return this.$store.getters['artists/currentArtistId'];
    }
  },
  methods: {
    addSong() {
        this.getAlbum.songs.push({ 
          title: '', 
          releaseDate: null,
          songFile: null
        });
      },
    loadAlbumInDetail() {
      this.$store.dispatch('albums/loadInDetail', {
        id: this.$route.params.id,
      });
    },
    onFileSelected(event, index) {
      this.getAlbum.songs[index].songFile = event.target.files[0];
    },
    selectArtist(artistName) {
      //Find the artist id based on the name (don't have access to both at the same time)
      const selectedArtist = this.artists.find(artist => artist.name === artistName);
      if (selectedArtist) {
        const artistId = selectedArtist.id;
        this.$store.dispatch('artists/selectArtist', artistId);
      } else {
        console.error("Artist not found:", artistName);
      }
    },
    putAlbum() {
      this.album = {
        id: this.getAlbum.id,
        title: this.getAlbum.title,
        year: this.getAlbum.year,
        artistId: this.$store.getters['artists/currentArtistId'],
        songs: this.getAlbum.songs
      }
      console.log("PUT ALBUM: " + JSON.stringify(this.album))
      this.$store.dispatch('albums/putAlbum', this.album);
    }
  },
};
</script>
