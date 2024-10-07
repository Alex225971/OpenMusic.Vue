<template>
  <page-header></page-header>
  <div class="container-fluid">
    <div class="row bg-dark text-light d-flex flex-grow-1">
      <sidebar></sidebar>
      <router-view @play-song="handlePlaySong"></router-view>
    </div>
  </div>
  <player :show-player="showPlayer" :volume="volume" :current-album="currentAlbum" :current-song-title="currentSongTitle" :current-artist="currentArtist" :current-song-url="currentSongUrl" v-show="showPlayer" :key="currentSongUrl" @play-next="handlePlayNext"></player>
</template>

<script>
import PageHeader from './components/layout/PageHeader.vue';
import Player from './components/layout/player/Player.vue';
import Sidebar from './components/layout/Sidebar.vue';

export default {
  data() {
    return {
      showPlayer: false,
      currentSongUrl: null,
      songKey:null,
      currentArtist: null,
      currentSongName: null,
      currentAlbum: null,
    }
  },
  components: {
    PageHeader,
    Sidebar,
    Player
  },
  created() {
    this.$store.dispatch('user/checkAuth');
  },
  methods: {
    handlePlaySong(song) {
      console.log("SONG DETAILS: " + JSON.stringify(song));
      this.showPlayer = true;
      this.volume = this.$store.getters['player/volume'];
      this.currentSongUrl = song.songUrl;
      this.currentSongTitle = song.title;

      //TODO - these are temporary checks to make sure values exist when played from a playlist, sort out the back end so these don't need to be done
      if(song.albumTitle!=null) {
        this.currentAlbum = song.albumTitle;
      } else if(song.album.title!=null) {
        this.currentAlbum = song.album.title;
      } else {
        this.currentAlbum = "Single";
      }
      
      if(song.artistName!=null) {
        this.currentArtist = song.artistName;
      } else if(song.album.artistName!=null) {
        this.currentArtist = song.album.artistName;
      } else {
        this.currentArtist = "Unknown Artist";
      }
      this.songKey++;
    },
    handlePlayNext(song) {
      console.log("PLAY NEXT EMITTED" + JSON.stringify(song))
      this.showPlayer = true;
      this.volume = this.$store.getters['player/volume'];
      this.currentSongTitle = song.title;
      this.currentArtist = song.artistName;
      this.currentSongUrl = song.songUrl;
    }
  }
};
</script>
