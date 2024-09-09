<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="row">
      <div class="col-12">
        <router-link to="/artist/new" class="btn btn-outline-light">Create new artist</router-link>
      </div>
      <div class="col-12 mt-3">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Bio</th>
              <th>Started</th>
              <th>Ended</th>
              <th>Total Listeners</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="artist in artists" :key="artist.id">
              <th scope="row">{{ artist.id }}</th>
              <td>{{ artist.name }}</td>
              <td>{{ artist.bio }}</td>
              <td>{{ artist.started }}</td>
              <td>{{ artist.ended || '-'}}</td>
              <td>{{ artist.totalListeners }}</td>
              <td>
                <router-link :to="{ path: '/artist/' + artist.id }" class="btn btn-primary me-2">Edit</router-link>
                <button @click="deleteArtist(artist.id)" class="btn btn-danger me-2">Delete</button>
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
    this.loadArtists();
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
    artists() {
      return this.$store.getters['artists/getArtists'];
    },
  },
  methods: {
    loadArtists() {
      return this.$store.dispatch('artists/getAllArtists');
    },
    deleteArtist(id) {
      return this.$store.dispatch('artists/deleteArtist', id);
    },
  },
};
</script>