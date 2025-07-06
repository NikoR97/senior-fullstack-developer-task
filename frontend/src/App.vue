<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import Navbar from "./components/Navbar.vue";

const route = useRoute();
const store = useStore();

const showNavbar = computed(
  () => route.path !== "/" && store.getters.isLoggedIn
);
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

#app {
  min-height: 100vh;
}

.main-content {
  padding: 2rem;
}

/* Simple form styling */
input,
button,
select {
  font-family: inherit;
}

button {
  cursor: pointer;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}
</style>
