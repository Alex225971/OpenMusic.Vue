<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["play-song"]);
</script>

<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="my-0 m-auto col-6 p-5">
      <div class="row">
        <div class="col-lg-4">
          <img class="w-100 h-auto" :src="getPlaylist.imageUrl" />
          <h3 class="mt-3 text-center">{{ getPlaylist.name }}</h3>
          <p class="mt-2 text-center">{{ getPlaylist.description }}</p>
          <div class="playlist-button-group text-center d-flex align-items-center justify-content-center">
            <a class="link-light me-2" type="button" aria-expanded="false">
              <i class="bi bi-share"></i>
            </a>
            <a class="link-light me-2 fs-1" type="button" aria-expanded="false" @click="emitAndSetQueue(getPlaylist)">
              <i class="bi bi-play-fill"></i>
            </a>
            <div class="dropdown">
                <a class="dropdown-toggle link-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical options-menu"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item"><i class="bi bi-shuffle"></i> Shuffle play</a></li>
                  <li><a class="dropdown-item" href="#"><i class="bi bi-music-note-list"></i> Play next</a></li>
                  <li><a @click="deletePlaylist(getPlaylist)" class="dropdown-item" href="#"><i class="bi bi-trash"></i> Delete playlist</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <h4 class="text-center">Songs</h4>
          <p v-if="!getPlaylist.songs" class="text-center">
            Songs came back null, sort out the API?
          </p>
          <p v-if="getPlaylist.songs && getPlaylist.songs.length == 0" class="text-center">
            No songs yet, add some!
          </p>
          <div v-for="song in getPlaylist.songs" :key="song.id">
            <div class="row">
              <div class="col-9">
                {{ song.title }} ({{ song.releaseDate }}) - <span v-if="song.artist">{{ song.artist.name}}</span> <span v-else>Unknown Artist</span> <span v-if="song.album">{{ song.album.title}}</span> <span v-else>(Single)</span>
              </div>
              <div class="col-1 align-content-center">
                <div class="dropdown">
                  <a class="dropdown-toggle link-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-three-dots-vertical options-menu"></i>
                  </a>
                  <ul class="dropdown-menu">
                      <li><a class="dropdown-item"><i class="bi bi-trash"></i> Remove from playlist</a></li>
                      <li><a class="dropdown-item" href="#">Play next</a></li>
                  </ul>
                </div>
              </div>
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
    this.loadPlaylistInDetail();
  },
  computed: {
    getPlaylist() {
      return this.$store.getters['playlists/currentPlaylist'];
    },
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
  },
  methods: {
    loadPlaylistInDetail() {
      this.$store.dispatch('playlists/loadInDetail', {
        id: this.$route.params.id,
      });
    },
    deletePlaylist(playlist) {
      let text = "Are you sure you want to delete " + playlist.name + "?";
      if (confirm(text) == true) {
        this.$store.dispatch('playlists/deletePlaylist', playlist.id)
      } else {
        return;
      }
    },
    emitAndSetQueue(playlist) {
      this.$store.dispatch("queue/updateQueue", playlist.songs);
      this.$emit("play-song",playlist.songs[0]);
    },
  },
};
</script>
<style lang="scss">
@import './PlaylistDetail.scss';
</style>

