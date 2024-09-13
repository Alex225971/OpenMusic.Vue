<template>
    <div v-show="showPlayer" class="player-container border-light border-top bg-dark">
        
        <audio id="player" ref="player" autoplay @timeupdate="updateTimeline">
            <source :src="currentSongUrl" type="audio/ogg">
        </audio>
        <div class="player-buttons mx-3">
          <div>
            <button class="btn btn-outline-success border-0 p-1" @click="togglePlay"><i class="bi bi-skip-start-fill"></i></button> 
            <button class="btn btn-outline-success border-0 fs-2 p-1" @click="togglePlay"><i v-if="!isPlaying" class="bi bi-play-fill"></i><i v-else class="bi bi-pause-fill"></i></button>
            <button class="btn btn-outline-success border-0 p-1" @click="togglePlay"><i class="bi bi-skip-end-fill"></i></button> 
            <input class="ms-2 slider" ref="volumeSlider" type="range" min="1" max="100" :value="volume * 100" @change="setVolume" />
            <div class="ms-2 btn btn-outline-success mute-button border-0 fs-2 p-1" @click="toggleMute"><i v-if="!isMuted" class="bi bi-volume-up-fill"></i> <i v-else class="bi bi-volume-mute-fill"></i></div>
          </div>
        </div>
        <div class="player-timeline-container me-4" ref="timelineContainer" @click="handleClick" @mousedown="startSeek" @mouseup="stopSeek" @mousemove="seek">
          <div class="player-timeline">
            <div class="timeline-bar" ref="timelineBar">
              <div class="player-dot"></div>
            </div>
          </div>
        </div>
        <div class="skip-button me-3">
          <div class="btn btn-outline-success border-0">
            <i class="bi bi-shuffle"></i>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    currentSongUrl: {
      type: String,
      default: null
    },
    showPlayer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isPlaying: true,
      isMuted: false
    };
  },
  onMounted() {
    this.$refs.player.volume = this.volume;
  },
  methods: {
    setVolume() {
      this.$refs.player.volume = this.$refs.volumeSlider.value / 100;
      this.$store.dispatch('player/setVolume', this.$refs.player.volume);
    },
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.player.pause();
      } else {
        this.$refs.player.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    toggleMute() {
      this.$refs.player.muted = !this.$refs.player.muted;
      this.isMuted = !this.isMuted;
    },
    updateTimeline() {
      console.log("seekToTime: " + this.$refs.player);
      if(this.$refs.player) {
        const progressBar = this.$refs.timelineBar;
        const progressPercent = (this.$refs.player.currentTime / this.$refs.player.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
      }
    },
    handleClick(event) {
      if (!this.isSeeking) {
        this.seekToTime(event);
      }
    },
    startSeek() {
      this.isSeeking = true;
    },
    stopSeek() {
      this.isSeeking = false;
    },
    seek(event) {
      if (this.isSeeking) {
        this.seekToTime(event);
      }
    },
    seekToTime(event) {
      const timelineContainer = this.$refs.timelineContainer;
      const timelineRect = timelineContainer.getBoundingClientRect();
      const clickX = event.clientX - timelineRect.left;
      const progressPercent = (clickX / timelineRect.width) * 100;
      
      this.$refs.player.currentTime = (progressPercent / 100) * this.$refs.player.duration;
    },
    loadNewSong() {
      const newSongUrl = this.src; 
      this.$refs.player.src = newSongUrl;
      this.$refs.player.play();
    }
  },
  computed: {
    playerState() {
      console.log("playerState: " + this.$refs.player)
      return this.$refs.player;
    },
    volume() {
      return this.$store.getters['player/volume'];
    }
  }
};
</script>

<style lang="scss">
@import './Player.scss';
</style>