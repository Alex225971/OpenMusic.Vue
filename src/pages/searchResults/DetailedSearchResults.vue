<script setup>
import ModalComponent from "../../components/layout/modal/Modal.vue";
import { defineEmits } from "vue";

const emit = defineEmits(["play-song"]);
</script>

<template>
    <div class="col-10 p-5 pb-0 overflow-auto 100vh">
        <div v-if="searchResults.songs.length == 0 && searchResults.albums.length == 0 && searchResults.artists.length == 0 && searchResults.playlists.length == 0">
            <div class="row">
                <h3>Awkward, no results found...</h3>
            </div>
        </div>
        <div v-if="searchResults?.songs.length > 0" class="songs">
            <div class="row">
                    <div class="col-1">
                        <h3>Songs</h3>
                    </div>
                    <div class="col-9 align-content-center">
                        <h4>Title</h4>
                    </div>
                    <div class="col-2 align-content-center">
                        <h4>Release Date</h4>
                </div>
            </div>
            <hr/>

            <div v-for="song in searchResults.songs" :key="song.id" class="playlist-row row d-flex align-content-center mt-3">
                <div class="col-1">
                </div>
                <div class="col-9 align-content-center">
                    <h4 class="mb-0">
                        <a @click="getSongsAndPlay(song)" class="link-light text-decoration-none">{{ song.title }}</a> - 
                        <router-link v-if="song.artistId" :to="{path: '/artist/' + song.artistId}" class="link-light text-decoration-none">{{ song.artistName }}</router-link>
                        <span v-if="!song.artistName">Unknown Artist</span> - 
                        <router-link v-if="song.albumId" :to="{path: '/album/' + song.albumId}" class="link-light text-decoration-none">{{ song.albumTitle }}</router-link>
                        <span v-if="!song.albumTitle">(Single)</span>
                    </h4>
                </div>
                <div class="col-1 align-content-center">
                    <p class="mb-0">{{ song.releaseDate }}</p>
                </div>
                <div class="col-1 align-content-center">
                    <div class="dropdown">
                        <a class="dropdown-toggle link-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots-vertical options-menu"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" @click="openModal(song.id)">Add to playlist</a></li>
                            <li v-if="song.albumId"><router-link :to="{path: '/album/' + song.albumId}" class="dropdown-item">Go to album</router-link></li>
                            <li v-if="song.artistId"><router-link :to="{path: '/artist/' + song.artistId}" class="dropdown-item">Go to artist</router-link></li>
                            <li><a class="dropdown-item" href="#">Play next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
        <div v-if="searchResults?.albums.length > 0" class="albums">
            <div class="row">
                    <div class="col-1">
                        <h3>Albums</h3>
                    </div>
                    <div class="col-9 align-content-center">
                        <h4 >Title</h4>
                    </div>
                    <div class="col-1 align-content-center">
                        <h4>Release Year</h4>
                    </div>
            </div>
            <hr/>

            <div v-for="album in searchResults?.albums" :key="album.id" class="playlist-row row d-flex align-content-center">
                <div class="col-1 album-cover">
                    <img class="w-100 h-100 p-3" :src="album.image" alt="">
                    <div v-if="album.songs.length > 0" @click="emitAndSetQueue(album)" class="play-icon">
                        <i class="bi bi-play-fill text-white fs-1"></i>
                    </div>
                </div>
                <div class="col-9 align-content-center">
                    <h4 class="mb-0">
                        <router-link :to="{path: '/album/' + album.id}" class="link-light text-decoration-none">{{ album.title }}</router-link>
                         - 
                        <router-link v-if="album.artistId" :to="{path: '/artist/' + album.artistId}" class="link-light text-decoration-none">{{ album.artistName }}</router-link>
                        <span v-if="!album.artistName">Unknown Artist</span>
                    </h4>
                </div>
                <div class="col-1 align-content-center">
                    <p class="mb-0">{{ album.year }}</p>
                </div>
                <div class="col-1 align-content-center">
                    <div class="dropdown">
                        <a class="dropdown-toggle link-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots-vertical options-menu"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link :to="{path: '/album/' + album.id}" class="dropdown-item">Go to album</router-link></li>
                            <li v-if="album.artistId"><router-link :to="{path: '/artist/' + album.artistId}" class="dropdown-item">Go to artist</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
        <div v-if="searchResults?.artists.length > 0" class="artists">
            <h3>Artists</h3>
            <hr/>
            
            <div v-for="artist in searchResults.artists" :key="artist.id" class="playlist-row row d-flex align-content-center">
                <div class="col-2">
                    <h4><router-link v-if="artist.name" :to="{path: '/artist/' + artist.id}" class="link-light text-decoration-none">{{ artist.name }}</router-link> </h4>
                </div>
                <div class="col-9 align-content-center">
                    <p>{{ artist.bio }}</p>
                </div>
                <div class="col-1 align-content-center">
                    <div class="dropdown">
                        <a class="dropdown-toggle link-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots-vertical options-menu"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li v-if="artist.id"><router-link :to="{path: '/artist/' + artist.id}" class="dropdown-item">Go to artist</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="searchResults?.playlists.length > 0" class="playlists">
            <h3>Playlists</h3>
            <hr/>
            
            <div v-for="playlist in searchResults?.playlists" :key="playlist.id" class="playlist-row row d-flex align-content-center">
                <div class="col-1">
                    <img class="w-100 h-100 p-3" :src="playlist.imageUrl" alt="">
                </div>
                <div class="col-11 align-content-center">
                    <h4><router-link :to="{path: '/playlist/' + playlist.id}" class="link-light text-decoration-none">{{ playlist.name }}</router-link></h4>
                </div>
            </div>

        </div>

        <modal-component :currentSong="selectedSongId" :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
            <template #header>
                <h4 class="mb-2">Save to playlist</h4>
                <i @click="closeModal" class="bi bi-x fs-3 modal-close-button"></i>
            </template>
            <template #content>
                <div class="row playlist-modal-row" v-for="playlist in userPlaylists" :key="playlist.id">
                    <div class="col-2">
                        <img class="w-100 h-100" :src="playlist.imageUrl" alt="">
                    </div>
                    <div class="col-9">
                        {{ playlist.name }}
                    </div>
                    <div class="col-1 fs-3 playlist-add-button" @click="putPlaylist(playlist)">
                        <i class="bi bi-plus"></i>
                    </div>
                </div>
            </template>
            <template #footer>
            </template>
        </modal-component>

    </div>
    <Player v-if="showPlayer" :songUrl="selectedSongUrl" :key="playerKey"/>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref } from "vue";
import Player from "../../components/layout/player/Player.vue";

export default {
    components: {
        Player,
    },
    data() {
        return {
            isModalOpened: ref(false),
            showPlayer: false,
            selectedSongUrl: null,
            playerKey: 0
        }
    },
    created() {
        this.logQuery();
    },
    computed: {
        currentSearch() {
            return this.$store.getters['searchResults/currentSearch'];
        },
        currentQueryString() {
            return this.$route.query.queryString;
        },
        searchResults() {
            return this.$store.getters['searchResults/searchResults'];
        },
        userPlaylists() {
            return this.$store.getters['playlists/playlistDetails'];
        }
    },
    watch: {
        '$route.query.queryString': {
            immediate: true,
            handler(newQuery) {
                this.$store.dispatch('searchResults/executePreSearch', newQuery)
            }
        }
    },
    methods: {
        emitAndSetQueue(album) {
            this.$store.dispatch("queue/updateQueue", album.songs);
            this.$emit("play-song",album.songs[0]);
        },
        logQuery() {
            //let myParam = this.currentSearch
            let myParam = this.currentQueryString
            this.$store.dispatch('searchResults/executePreSearch', myParam)
        },
        openModal(id) {
            this.selectedSongId = id;
            this.getUserPlaylists();
            this.isModalOpened = true;
        },
        closeModal() {
            this.isModalOpened = false;
        },
        submitHandler() {
            console.log("Modal submitted")
        },
        getUserPlaylists() {
            this.$store.dispatch('playlists/getUserPlaylists');
        },
        putPlaylist(playlist) {
            //TODO - dispatch an action, or do it on modalClose?
            console.log(JSON.stringify(playlist.id));
            console.log(this.selectedSongId);
            this.$store.dispatch('playlists/addSongToPlaylist', {id: playlist.id, songId: this.selectedSongId });
        },
        getSongsAndPlay(song) {

            if (song.artistId) {
                console.log("Dispatch result:", this.$store.dispatch('songs/getArtistSongsAndSetQueue', song.artistId));
                this.$store.dispatch('songs/getArtistSongsAndSetQueue', song.artistId)
                .then(() => { // Ensure the store is updated before emitting the event
                    this.$emit("play-song", song);
                })
                .catch(error => {
                    console.error("Error fetching artist songs:", error);
                    // Handle the error gracefully, maybe show a user-friendly message
                });
            } else {
                console.warn("Queue not set because no artist was found", song);
                this.$emit("play-song", song);
            }
        }
    }
}
</script>
<style lang="scss">
@import './DetailedSearchResults.scss';
</style>