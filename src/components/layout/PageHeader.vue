<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">OpenMusic</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <form class="d-flex col-4">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search songs, albums, artists"
            aria-label="Search"
          />
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
        <div class="user-link">
          <router-link class="link-light" to="/login">Username</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
