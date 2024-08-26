<template>
  <page-header></page-header>
  <div class="container-fluid">
    <div class="row bg-dark text-light d-flex flex-grow-1">
      <sidebar></sidebar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/layout/PageHeader.vue';
import Sidebar from './components/layout/Sidebar.vue';

export default {
  components: {
    PageHeader,
    Sidebar
  },
};
</script>
