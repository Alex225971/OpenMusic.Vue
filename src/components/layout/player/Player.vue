<template>
    <div class="player-container border-light border bg-dark">
        <div class="player-buttons">
            <div>
                <button class="btn btn-outline-success border-0" onclick="document.getElementById('player').play()"><i class="bi bi-play-fill"></i></button> 
                <button class="btn btn-outline-success border-0" onclick="document.getElementById('player').pause()"><i class="bi bi-pause-fill"></i></button>
                <input class="slider" type="range" min="1" max="100" value="50" onchange="document.getElementById('player').volume = this.value / 100" />
            </div>
        </div>
        <audio id="player" autoplay>
            <source :src="songUrl" type="audio/ogg">
        </audio>
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
};
</script>

<style lang="scss">
@import './Player.scss';
</style>