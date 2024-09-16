<template>
  <page-header></page-header>
  <div class="container-fluid">
    <div class="row bg-dark text-light d-flex flex-grow-1">
      <sidebar></sidebar>
      <router-view @play-song="handlePlaySong"></router-view>
    </div>
  </div>
  <player :show-player="showPlayer" :volume="volume" :current-song-url="currentSongUrl" v-show="showPlayer" :key="currentSongUrl" @play-next="handlePlayNext"></player>
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
      songKey:null
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
      this.showPlayer = true;
      this.volume = this.$store.getters['player/volume'];
      this.currentSongUrl = song.songUrl;
      this.songKey++;
    },
    handlePlayNext(song) {
      console.log("PLAY NEXT EMITTED" + JSON.stringify(song))
      this.showPlayer = true;
      this.volume = this.$store.getters['player/volume'];
      this.currentSongUrl = song.songUrl;
    }
  }
};
</script>
