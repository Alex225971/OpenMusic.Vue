<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="row">
      <div class="col-12">
        <router-link to="/song/new" class="btn btn-outline-light">Create new song</router-link>
      </div>
      <div class="col-12 mt-3">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="song in songs" :key="song.id">
              <th scope="row">{{ song.id }}</th>
              <td>{{ song.title }}</td>
              <td>{{ song.genre}}</td>
              <td>{{ song.artistName || '-' }}</td>
              <td>{{ song.albumTitle || '-' }}</td>
              <td>
                <router-link :to="{ path: '/song/' + song.id }" class="btn btn-primary me-2">Details</router-link>
                <router-link :to="{ path: '/song/edit/' + song.id }" class="btn btn-secondary me-2">Edit</router-link>
                <button @click="deleteSong(song.id)" class="btn btn-danger me-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.loadSongs();
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
    songs() {
      return this.$store.getters['songs/songs'];
    },
  },
  methods: {
    loadSongs() {
      return this.$store.dispatch('songs/getAllSongs');
    },
    deleteSong(id) {
      return this.$store.dispatch('songs/deleteSong', id);
    },
  },
};
</script>