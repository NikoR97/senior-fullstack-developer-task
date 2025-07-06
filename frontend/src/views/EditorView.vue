<template>
  <div class="editor">
    <h1>Editor Dashboard</h1>
    <div class="user-info">
      <p class="welcome">Welcome {{ username }}!</p>
      <div class="user-details">
        <p><strong>Roles:</strong> {{ userRoles.join(", ") }}</p>
        <p><strong>Status:</strong> {{ userStatus }}</p>
      </div>
    </div>

    <div class="editor-content">
      <h2>Content Management</h2>
      <div class="editor-cards">
        <div class="editor-card">
          <h3>📝 Content Editor</h3>
          <p>Create and edit website content</p>
          <button class="editor-btn">Edit Content</button>
        </div>

        <div class="editor-card">
          <h3>📄 Articles</h3>
          <p>Manage articles and blog posts</p>
          <button class="editor-btn">Manage Articles</button>
        </div>

        <div class="editor-card">
          <h3>🖼️ Media Library</h3>
          <p>Upload and manage images and files</p>
          <button class="editor-btn">Media Library</button>
        </div>

        <div class="editor-card">
          <h3>📋 Drafts</h3>
          <p>Review and publish draft content</p>
          <button class="editor-btn">View Drafts</button>
        </div>
      </div>
    </div>

    <div class="role-info">
      <h3>Editor Privileges</h3>
      <ul>
        <li>✅ Content creation and editing</li>
        <li>✅ Article management</li>
        <li>✅ Media library access</li>
        <li>✅ Draft management</li>
        <li v-if="isAdmin">✅ Admin privileges (inherited)</li>
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
const isAdmin = computed(() => store.getters.isAdmin);
</script>

<style scoped>
.editor {
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
  color: #007bff;
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

.editor-content {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.editor-content h2 {
  margin-top: 0;
  color: #333;
}

.editor-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.editor-card {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.editor-card h3 {
  margin-top: 0;
  color: #495057;
}

.editor-card p {
  color: #6c757d;
  margin: 1rem 0;
}

.editor-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.editor-btn:hover {
  background-color: #0056b3;
}

.role-info {
  background: #d1ecf1;
  border: 1px solid #b8daff;
  border-radius: 8px;
  padding: 1.5rem;
}

.role-info h3 {
  margin-top: 0;
  color: #004085;
}

.role-info ul {
  list-style: none;
  padding: 0;
}

.role-info li {
  padding: 0.5rem 0;
  color: #004085;
}
</style>
