<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form>
        <label for="albumName" class="form-label">Album name</label>
        <input type="email" class="form-control" id="albumName">
    </form>
  </div>
</template>
<script>
export default {
    created() {
        
    },
    computed: {
        artists() {
            return this.$store.getters['artists/getArtists'];
        }
    },
    methods: {

    }
}
</script>
