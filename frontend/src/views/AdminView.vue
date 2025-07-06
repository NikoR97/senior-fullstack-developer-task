<template>
  <div class="admin">
    <h1>Admin Dashboard</h1>
    <div class="user-info">
      <p class="welcome">Welcome {{ username }}!</p>
      <div class="user-details">
        <p><strong>Roles:</strong> {{ userRoles.join(", ") }}</p>
        <p><strong>Status:</strong> {{ userStatus }}</p>
      </div>
    </div>

    <div class="admin-content">
      <h2>Administrative Functions</h2>
      <div class="admin-cards">
        <div class="admin-card">
          <h3>⚙️ System Settings</h3>
          <p>Configure system-wide settings and preferences</p>
          <button class="admin-btn">Manage Settings</button>
        </div>

        <div class="admin-card">
          <h3>👥 User Management</h3>
          <p>Manage user accounts, roles, and permissions</p>
          <button class="admin-btn">Manage Users</button>
        </div>

        <div class="admin-card">
          <h3>📊 Analytics</h3>
          <p>View system analytics and performance metrics</p>
          <button class="admin-btn">View Analytics</button>
        </div>

        <div class="admin-card">
          <h3>🔐 Security</h3>
          <p>Security settings and access controls</p>
          <button class="admin-btn">Security Settings</button>
        </div>
      </div>
    </div>

    <div class="role-info">
      <h3>Admin Privileges</h3>
      <ul>
        <li>✅ Full system access</li>
        <li>✅ User management</li>
        <li>✅ System configuration</li>
        <li>✅ Analytics and reporting</li>
        <li>✅ Security management</li>
      </ul>
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
.admin {
  padding: 2rem;
  max-width: 1200px;
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
  color: #dc3545;
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

.admin-content {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.admin-content h2 {
  margin-top: 0;
  color: #333;
}

.admin-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.admin-card {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.admin-card h3 {
  margin-top: 0;
  color: #495057;
}

.admin-card p {
  color: #6c757d;
  margin: 1rem 0;
}

.admin-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.admin-btn:hover {
  background-color: #c82333;
}

.role-info {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 1.5rem;
}

.role-info h3 {
  margin-top: 0;
  color: #155724;
}

.role-info ul {
  list-style: none;
  padding: 0;
}

.role-info li {
  padding: 0.5rem 0;
  color: #155724;
}
</style>
