<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form>
          <div class="col-6">
            <label for="artistName" class="form-label">Artist name <span class="text-danger">*</span></label>
            <input type="text" class="form-control mb-3" id="artistName" placeholder="Name">
          </div>
        <div class="col-6">
          <label for="artistName" class="form-label">Bio</label>
          <textarea type="text" class="form-control mb-3" placeholder="Write a short bio for the artist" id="artistName"></textarea>
        </div>

        <div class="row">
          <div class="col-3">
            <label for="startDate" class="mb-2">Start date:</label>
            <input class="form-control" type="date" id="startDate" name="artistStart" value="2018-07-22"/>
          </div>
          <div class="col-3 pe-0">
            <label for="endDate" class="mb-2">End date:</label>
            <input class="form-control mb-3" type="date" id="endDate" name="artistEnd" value="2018-07-22"/>
          </div>
        </div>
        <button class="btn btn-light" type="submit">Submit</button>
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
        createSongInputElement() {
          
        }
    }
}
</script>
