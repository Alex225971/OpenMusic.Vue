<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form>
        <label for="artistName" class="form-label">Artist name</label>
        <input type="email" class="form-control" id="artistName">
    </form>
  </div>
</template>
<script>
export default {
    created() {
        
    },
    computed: {
        artists() {
            return this.$store.getters['artists/artists'];
        }
    },
    methods: {
        loadArtists() {
            this.$store.dispatch('artists/getArtists', {
                token: localStorage.getItem('token')
            });
        },
    }
}
</script>
