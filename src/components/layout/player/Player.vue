<template>
    <div class="player-container border-light border-top bg-dark">
        
        <audio id="player" ref="player" autoplay @timeupdate="updateTimeline">
            <source :src="songUrl" type="audio/ogg">
        </audio>
        <div class="player-buttons me-3">
            <div>
                <button class="btn btn-outline-success border-0" @click="togglePlay"><i v-if="!isPlaying" class="bi bi-play-fill"></i><i v-else class="bi bi-pause-fill"></i></button> 
                <input class="ms-2 slider" type="range" min="1" max="100" value="50" onchange="document.getElementById('player').volume = this.value / 100" />
            </div>
        </div>
        <div class="player-timeline-container me-4" ref="timelineContainer" @click="handleClick" @mousedown="startSeek" @mouseup="stopSeek" @mousemove="seek">
          <div class="player-timeline">
            <div class="timeline-bar" ref="timelineBar">
              <div class="player-dot"></div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    songUrl: {
      type: String,
      required: true, // Or make it optional if needed
    },
  },
  data() {
    return {
      isPlaying: true,
    };
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.player.pause();
      } else {
        this.$refs.player.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    updateTimeline() {
      const progressBar = this.$refs.timelineBar;
      const progressPercent = (this.$refs.player.currentTime / this.$refs.player.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
    },
    handleClick(event) {
      if (!this.isSeeking) { // Only handle clicks when not dragging
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
  },
  computed: {
    playerState() {
      console.log("playerState: " + this.$refs.player)
      return this.$refs.player;
    }
  }
};
</script>

<style lang="scss">
@import './Player.scss';
</style>