<template>
  <div class="my-0 m-auto col-10 p-5 pb-0">
    <div class="row">
      <div class="col-12">
        <router-link to="/album/new" class="btn btn-outline-light">Create new album</router-link>
      </div>
      <div class="col-12 mt-3">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Number of songs</th>
              <th>Artist</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="album in albums" :key="album.id">
              <th scope="row">{{ album.id }}</th>
              <td>{{ album.title }}</td>
              <td>{{ album.songs.length }}</td>
              <td>{{ album.artistName || '-'}}</td>
              <td>{{ album.year }}</td>
              <td>
                <router-link :to="{ path: '/album/' + album.id }" class="btn btn-primary me-2">Details</router-link>
                <router-link :to="{ path: '/album/edit/' + album.id }" class="btn btn-secondary me-2">Edit</router-link>
                <button @click="deleteAlbum(album.id)" class="btn btn-danger me-2">Delete</button>
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
    this.loadAlbums();
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/isAuthenticated'];
    },
    albums() {
      return this.$store.getters['albums/getAlbums'];
    },
  },
  methods: {
    loadAlbums() {
      return this.$store.dispatch('albums/getAllAlbums');
    },
    deleteAlbum(id) {
      return this.$store.dispatch('albums/deleteAlbum', id);
    },
  },
};
</script>