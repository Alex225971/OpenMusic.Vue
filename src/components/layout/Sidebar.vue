<template>
  <div class="sidebar sidebar-dark bg-dark col-2 border-end border-secondary">
    <div class="sidebar-list text-light">
      <ul>
        <li>
          <router-link to="/home" class="link-light"
            ><i class="bi bi-house-door-fill me-2"></i> Home</router-link
          >
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/library" class="link-light"
            ><i class="bi bi-cassette-fill me-2"></i> My library</router-link
          >
        </li>
      </ul>
    </div>
    <hr />
    <div class="sidebar-list text-light">
      <ul>
        <li v-if="isLoggedIn">
          <router-link to="/playlist/new" class="link-light"
            ><i class="bi bi-plus me-2"></i> Create a new playlist</router-link
          >
        </li>
      </ul>
    </div>

    <p v-if="!isLoggedIn">
      You need to
      <router-link class="link-light" to="/login">log in</router-link> to create
      a playlist
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      console.log('isloggedin ' + this.$store.getters['user/isAuthenticated']);
      return this.$store.getters['user/isAuthenticated'];
    },
  },
};
</script>

<style lang="scss">
@import './Sidebar.scss';
</style>
