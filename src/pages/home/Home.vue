<template>
    <div class="col-10 p-5 pb-0">
        <h1>Welcome to OpenMusic</h1>
    </div>
</template>
<script>
export default {
    created() {
        this.$store.dispatch('search/loadInDetail');
    }
}
</script>