<template>
    <div class="col-10 p-5 pb-0">
        <div v-if="searchResults.songs.length > 0" class="songs">
            <h3>Songs</h3>
            <hr/>
        </div>
        <div v-if="searchResults.albums.length > 0" class="albums">
            <h3>Albums</h3>
            <hr/>
            
            <div v-for="album in searchResults.albums" :key="album.id" class="playlist-row row d-flex align-content-center">
                <div class="col-1">
                    <img class="w-100 h-100 p-3" :src="album.image" alt="">
                </div>
                <div class="col-9 align-content-center">
                    <h4>{{ album.title }}</h4>
                </div>
                <div class="col-2 align-content-center">
                    <p>{{ album.year }}</p>
                </div>
            </div>
        </div>
        <div v-if="searchResults.artists.length > 0" class="artists">
            <h3>Artists</h3>
            <hr/>
            
            <div v-for="artist in searchResults.artists" :key="artist.id" class="playlist-row row d-flex align-content-center">
                <div class="col-3">
                    <h4>{{ artist.name }}</h4>
                </div>
                <div class="col-9 align-content-center">
                    <p>{{ artist.bio }}</p>
                </div>
            </div>
        </div>
        <div v-if="searchResults.playlists.length > 0" class="playlists">
            
            <h3>Playlists</h3>
            <hr/>
            
            <div v-for="playlist in searchResults.playlists" :key="playlist.id" class="playlist-row row d-flex align-content-center">
                <div class="col-1">
                <img class="w-100 h-100 p-3" :src="playlist.imageUrl" alt="">
                </div>
                <div class="col-11 align-content-center">
                    <h4>{{ playlist.name }}</h4>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
//console.log(this.$router.query.queryString);
export default {
    created() {
        this.logQuery();
    },
    computed: {
        currentSearch() {
            return this.$store.getters['searchResults/currentSearch'];
        },
        searchResults() {
            return this.$store.getters['searchResults/searchResults'];
        }
    },
    methods: {
        logQuery() {
            let urlParams = new URLSearchParams(window.location.search);
            let myParam = urlParams.get('queryString');
            console.log("SEARCH: " + this.currentSearch);
            this.$store.dispatch('searchResults/setCurrentSearch', myParam)
        }
    }
}
</script>