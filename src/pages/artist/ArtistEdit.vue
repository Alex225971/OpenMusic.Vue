<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <form @submit.prevent="createArtist">
          <div class="col-6">
            <label for="artistName" class="form-label">Artist name<span class="text-danger">*</span></label>
            <input type="text" class="form-control mb-3" id="artistName" placeholder="Name" v-model="artist.name">
          </div>
        <div class="col-6">
          <label for="artistBio" class="form-label">Bio</label>
          <textarea type="text" class="form-control mb-3" placeholder="Write a short bio for the artist" id="artistBio" v-model="artist.bio"></textarea>
        </div>

        <div class="row">
          <div class="col-3">
            <label for="startDate" class="mb-2">Start date:</label>
            <input class="form-control" type="date" id="startDate" name="artistStart" value="2024-01-01" v-model="this.startedDate"/>
          </div>
          <div class="col-3 pe-0">
            <label for="endDate" class="mb-2">End date:</label>
            <input class="form-control mb-3" type="date" id="endDate" name="artistEnd" value="2024-01-01" v-model="this.endedDate"/>
          </div>
        </div>
        <button class="btn btn-light" type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
export default {
    computed: {
        artist() {
          return this.$store.getters['artists/currentArtist'];
        },
        startedDate() {
          return this.sqlToJsDate(JSON.stringify(this.artist.started));
        },
        endedDate() {
          return this.sqlToJsDate(JSON.stringify(this.artist.ended));
        }
    },
    created() {
      this.loadArtist();
      //this.sqlToJsDate(this.artist);
    },
    mounted() {
      console.log("ARTIST STARTED: " + this.startedDate);
      console.log("ARTIST ENDED: " + this.endedDate);
    },
    methods: {
        loadArtist() {
            this.$store.dispatch('artists/getArtist', {
              id: this.$route.params.id,
            });
        },
        putArtist() {
          this.$store.dispatch('artists/putArtist', {
            name: this.artistName,
            bio: this.artistBio,
            startDate: this.startDate,
            endDate: this.endDate
          });
        }
    },
}
</script>
