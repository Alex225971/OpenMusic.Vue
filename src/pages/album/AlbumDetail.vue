<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["play-song"]);
</script>

<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="my-0 m-auto col-6 p-5">
      <div class="row">
        <div class="col-lg-4">
          <img class="w-100 h-auto" :src="getAlbum.image" />
          <h3 class="mt-3 text-center">{{ getAlbum.title }}</h3>
          <p class="mt-2 text-center">{{ getAlbum.artistName || 'Unknown artist'}}</p>
          <p class="mt-2 text-center">{{ getAlbum.year + ' - ' + getAlbum.songs.length + ' songs' }}</p>

          <div class="detail-button-group text-center d-flex align-items-center justify-content-center">
            <a class="link-light me-2" type="button" aria-expanded="false">
              <i class="bi bi-share"></i>
            </a>
            <a class="link-light me-2 fs-1" type="button" aria-expanded="false" @click="emitAndSetQueue(getAlbum)">
              <i class="bi bi-play-fill"></i>
            </a>
            <div class="dropdown">
                <a class="dropdown-toggle link-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical options-menu"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item" @click="shuffleQueue"><i class="bi bi-shuffle"></i> Shuffle play</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bi bi-music-note-list"></i> Play next</a></li>
              </ul>
            </div>
          </div>

        </div>
        <div class="col-lg-8">
          <h4 class="text-center">Songs</h4>
          <p v-if="getAlbum.songs.length == 0" class="text-center">
            No songs in this album, strange...
          </p>
          <div class="row" v-for="song in getAlbum.songs" :key="song.id">
            <div class="col-10">
              <p class="m-2">{{ song.title }}</p>
            </div>
            <div class="col-1">
              <i class="bi bi-plus m-2"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.loadAlbumInDetail();
  },
  computed: {
    getAlbum() {
      return this.$store.getters['albums/currentAlbum'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
  methods: {
    loadAlbumInDetail() {
      this.$store.dispatch('albums/loadInDetail', {
        id: this.$route.params.id,
      });
    },
    emitAndSetQueue(album) {
      this.$store.dispatch("queue/updateQueue", album.songs);
      this.$emit("play-song",album.songs[0]);
    },
    shuffleQueue() {
      this.$store.dispatch("queue/updateQueue", this.getAlbum.songs);
      this.$store.dispatch("queue/shuffleQueue");
      this.emitAndSetQueue(this.getAlbum);
    }
  },
};
</script>
