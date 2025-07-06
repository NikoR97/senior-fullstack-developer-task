<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <h2>HyperGuest</h2>
      </div>

      <div class="nav-links">
        <router-link v-if="canAccessEditor" to="/editor" class="nav-link"
          >Editor</router-link
        >
        <router-link v-if="canAccessAdmin" to="/admin" class="nav-link"
          >Admin</router-link
        >
      </div>

      <div class="nav-user">
        <span class="user-name">{{ username }}</span>
        <span class="user-roles">({{ userRoles.join(", ") }})</span>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const userRoles = computed(() => store.getters.userRoles);
const username = computed(() => store.getters.username);
const canAccessEditor = computed(() => store.getters.canAccessEditor);
const canAccessAdmin = computed(() => store.getters.canAccessAdmin);

function logout() {
  store.dispatch("logout");
  router.push("/");
}
</script>

<style scoped>
.navbar {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-brand h2 {
  margin: 0;
  color: #42b983;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}

.nav-link.router-link-active {
  background-color: #42b983;
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 600;
}

.user-roles {
  font-size: 0.9rem;
  color: #bdc3c7;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background: #c0392b;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-user {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
