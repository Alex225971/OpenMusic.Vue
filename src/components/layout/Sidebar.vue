<template>
    <div class="sidebar sidebar-dark bg-dark col-2 border-end border-secondary">
        <div class="sidebar-list text-light">
            <ul>
                <li><router-link to="/home" class="link-light"><i class="bi bi-house-door-fill me-2"></i> Home</router-link></li>
                <li><router-link to="/" class="link-light"><i class="bi bi-cassette-fill me-2"></i> My library</router-link></li>
            </ul>
        </div>
        <hr>
        <p>You need to <router-link class="link-light" to="/login">log in</router-link> to create a playlist</p>
    </div>
    
</template>

<style lang="scss">
    @import "./Sidebar.scss";
</style>