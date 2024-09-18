<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["play-song"]);
</script>

<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <h1 class="mt-5 ms-5">{{ getArtist.name }}</h1>
    <p class="mt-2 ms-5">{{ getArtist.bio }}</p>
    <hr/>
    <div class="row mt-2 ms-5" v-if="getArtist.songs.length > 0">
      <div class="col-12 ">
        <h2 class="mb-3">Songs</h2>
        <div class="row" v-for="song in getArtist.songs" :key="song.id">
          <div class="col-3">
            <h5><a @click="emit('play-song', song)" class="link-light text-decoration-none">{{ song.title }}</a></h5>
          </div>
          <div class="col-2">
            <h5>{{ song.artistName }}</h5>
          </div>
          <div class="col-2">
            <h5>
              <router-link v-if="song.albumId" :to="{path: '/album/' + song.albumId}" class="link-light text-decoration-none">{{ song.albumTitle }}</router-link>
              <span v-if="!song.albumTitle">Single</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row mt-2 ms-5" v-if="getArtist.albums.length > 0">
      <h2>Albums</h2>
      <div v-for="album in getArtist.albums" :key="album.id" class="col-1">
        <div class="album-cover">
          <img :src="album.image" :alt="album.name" class="mt-3 img-thumbnail">
          <div v-if="album.songs.length > 0" @click="emitAndSetQueue(album)" class="play-icon">
            <i class="bi bi-play-fill text-white fs-1"></i>
          </div>
        </div>
        
        <h5 class="mt-2"><router-link :to="{path: '/album/' + album.id}" class="link-light text-decoration-none">{{ album.title }}</router-link></h5>
        <p>{{ album.year }}</p>
      </div>
    </div>
    <hr/>
  </div>
  <Player v-if="showPlayer" :songUrl="selectedSongUrl" :key="playerKey"/>
</template>
<script>
import Player from "../../components/layout/player/Player.vue";

export default {
  components: {
    Player,
  },
  data() {
    return {
      showPlayer: false,
      selectedSongUrl: null,
      playerKey: 0
    }
  },
  created() {
    this.loadArtistInDetail();
  },
  computed: {
    getArtist() {
      return this.$store.getters['artists/currentArtist'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
  methods: {
    loadArtistInDetail() {
      this.$store.dispatch('artists/loadInDetail', {
        id: this.$route.params.id,
      });
    },
    emitAndSetQueue(album) {
      this.$store.dispatch("queue/updateQueue", album.songs);
      console.log("song i wanna play: " + JSON.stringify(album.songs[0]));
      this.$emit("play-song",album.songs[0]);
    }
  },
};
</script>
<style lang="scss">
@import './ArtistDetail.scss';
</style>
