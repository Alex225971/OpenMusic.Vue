<template>
  <div class="col-10 p-5">
    <form @submit.prevent="submitPlaylist">
      <div class="mb-3">
        <label for="playlistTitle" class="form-label"
          >Playlist Title <span class="text-danger">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="playlistTitle"
          placeholder="Title"
          v-model="name"
        />
      </div>
      <div class="mb-3">
        <label for="playlistDescription" class="form-label">Description</label>
        <textarea
          class="form-control"
          placeholder="Let other users know what your playlist is like"
          id="playlistDescription"
          rows="3"
          v-model="description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="playlistCover" class="form-label"
          >Playlist cover photo</label
        >
        <input name="image" class="form-control" type="file" id="image" @change="onFileSelected"/>
      </div>
      <button class="btn btn-outline-light">Create playlist</button>
    </form>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        console.log("File selected: ", this.selectedFile.name);  // Log for debugging
        console.log("File size: ", this.selectedFile.size);  // e.g., 93485 (in bytes)
        console.log("File type: ", this.selectedFile.type);
      }
    },
    submitPlaylist() {
      if (this.name === '') {
        this.formIsValid = false;
        return;
      }
      this.$store.dispatch(
        'playlists/createPlaylist',
        {
          name: this.name,
          description: this.description,
          creatorId: localStorage.getItem('userId'),
          image: this.selectedFile,
        },
        this.$store.getters['user/token']
      );
    },
  },
};
</script>
