<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1>Welcome to HyperGuest Test</h1>
        <p>Please enter your username to continue</p>
      </div>

      <div class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter username"
            @keyup.enter="handleLogin"
            :disabled="isLoading"
          />
        </div>

        <button
          @click="handleLogin"
          :disabled="!username.trim() || isLoading"
          class="login-button"
        >
          {{ isLoading ? "Logging in..." : "Login" }}
        </button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="demo-section">
        <h3>Demo Users (click to login quickly)</h3>
        <div class="demo-users">
          <button
            @click="quickLogin('admin_user')"
            class="demo-btn"
            :disabled="isLoading"
          >
            admin_user - Admin Role
          </button>
          <button
            @click="quickLogin('editor_user')"
            class="demo-btn"
            :disabled="isLoading"
          >
            editor_user - Editor Role
          </button>
          <button
            @click="quickLogin('regular_user')"
            class="demo-btn"
            :disabled="isLoading"
          >
            regular_user - User Role
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();

const username = ref("");

const isLoading = computed(() => store.getters.isLoading);
const error = computed(() => store.getters.error);

async function handleLogin() {
  if (!username.value.trim()) return;

  const result = await store.dispatch("login", username.value.trim());

  if (result.success) {
    router.push("/home");
  }
}

async function quickLogin(demoUsername) {
  username.value = demoUsername;
  await handleLogin();
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f5f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e8ed;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  min-height: 600px;
}

.login-header {
  text-align: center;
  margin-bottom: 3rem;
}

.login-header h1 {
  color: #2f3542;
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.login-header p {
  color: #747d8c;
  margin: 0;
  font-size: 1.1rem;
}

.login-form {
  margin-bottom: 3rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  color: #2f3542;
  font-weight: 600;
  font-size: 1.1rem;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd6fe;
  border-radius: 6px;
  font-size: 1.1rem;
  transition: border-color 0.3s;
  background: #fafbfc;
}

.form-group input:focus {
  outline: none;
  border-color: #57606f;
  background: white;
}

.form-group input:disabled {
  background: #f1f2f6;
  cursor: not-allowed;
}

.login-button {
  width: 100%;
  background: #2f3542;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover:not(:disabled) {
  background: #1e2328;
}

.login-button:disabled {
  background: #a4b0be;
  cursor: not-allowed;
}

.error-message {
  background: #ff6b6b;
  color: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 2rem;
  text-align: center;
}

.demo-section {
  text-align: center;
}

.demo-section h3 {
  color: #2f3542;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.demo-users {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.demo-btn {
  padding: 0.75rem 1rem;
  border: 2px solid #42b983;
  background: transparent;
  color: #42b983;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.demo-btn:hover:not(:disabled) {
  background: #42b983;
  color: white;
}

.demo-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
