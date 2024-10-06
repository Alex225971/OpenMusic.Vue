<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form @submit.prevent="createAlbum">
    <div class="row">
      <div class="col-6">
        <label for="artist" class="form-label">Artist (select)</label>
        <select class="dropdown mb-3 form-select" v-if="artists && artists.length > 0" v-model="selectedArtistName"  @change="selectArtist(selectedArtistName)">
          <option value="null" class="dropdown-toggle" name="artist" type="button" data-bs-toggle="dropdown" aria-expanded="false" ref="artistName">
            Unknown Artist (empty)
          </option>
          <option class="dropdown-item" v-for="artist in artists" :value="artist.name" :key="artist.id">{{ artist.name }}</option>
        </select>



        <label for="albumTile" class="form-label">Album title <span class="text-danger">*</span></label>
        <input type="text" class="form-control mb-3" placeholder="Title" id="albumTile" v-model="albumTitle">

        <label for="albumYear" class="form-label">Album year</label>
        <input type="number" class="form-control mb-3" placeholder="2024" id="albumYear" min="1" v-model="albumYear">

        <label for="albumCover" class="form-label">Album cover image</label>
        <input class="form-control mb-3" name="albumCover" type="file" id="image" @change="onAlbumCoverSelected"/>

        <button class="btn btn-light">Submit</button>
      </div>
      <div class="col-6">
        <div class="form-group mb-3" v-for="(song, index) in songs" :key="index">
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
</template>

<script>

export default {
    data() {
      return {
        selectedArtistName: null,
        selectedFile: null,
        songFiles: [],
        songs: []
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
      addSong() {
        this.songs.push({ 
          title: '', 
          releaseDate: null,
          songFile: null
        });
      },
      onAlbumCoverSelected(event) {
        this.selectedFile = event.target.files[0];
      },
      onFileSelected(event, index) {
        this.songs[index].songFile = event.target.files[0];
      },
      createAlbum() {
        this.$store.dispatch('albums/createAlbum', {
          title: this.albumTitle,
          year: this.albumYear,
          image: this.selectedFile,
          artistId: '',
          songs: this.songs
        });
      },
      selectArtist(artistName) {
        if(artistName != null) {
          var newId = this.artists.find(artist => artist.name === artistName).id;
          console.log("NEW ID: " + newId)
          this.$store.dispatch('artists/selectArtist', newId);
        } else {
          this.$refs.artistName.innerHTML = 'Unknown Artist (empty)';
        }
        this.$store.dispatch('artists/selectArtist', newId);
      },
    }
}
</script>
