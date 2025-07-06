<template>
  <div class="home">
    <h1>Home Page</h1>
    <div class="user-info">
      <p class="welcome">Welcome {{ username }}!</p>
      <div class="user-details">
        <p><strong>Roles:</strong> {{ userRoles.join(", ") }}</p>
        <p><strong>Status:</strong> {{ userStatus }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();

const username = computed(() => store.getters.username);
const userRoles = computed(() => store.getters.userRoles);
const userStatus = computed(() => store.getters.userStatus);
</script>

<style scoped>
.home {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.user-info {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.welcome {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 1rem;
}

.user-details {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.user-details p {
  margin: 0;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  min-width: 150px;
}
</style>
