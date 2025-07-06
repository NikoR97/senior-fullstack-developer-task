import {createStore} from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    userRoles: (state) => state.user?.roles || [],
    username: (state) => state.user?.username || "",
    userStatus: (state) => state.user?.status || "",
    isLoading: (state) => state.loading,
    error: (state) => state.error,

    isAdmin: (state) => {
      return state.user?.roles?.includes("Admin") || false;
    },

    isEditor: (state) => {
      return state.user?.roles?.includes("Editor") || false;
    },

    canAccessEditor: (state) => {
      if (!state.isAuthenticated || state.user?.status !== "Enabled")
        return false;
      const roles = state.user?.roles || [];
      return roles.includes("Editor") || roles.includes("Admin");
    },

    canAccessAdmin: (state) => {
      if (!state.isAuthenticated || state.user?.status !== "Enabled")
        return false;
      return state.user?.roles?.includes("Admin") || false;
    },
  },

  mutations: {
    setLoading(state, status) {
      state.loading = status;
    },

    setError(state, error) {
      state.error = error;
    },

    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
      state.error = null;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  actions: {
    async login({commit}, username) {
      try {
        commit("setLoading", true);
        commit("setError", null);

        const response = await axios.post(`/api/users/login/${username}`);

        if (response.data) {
          commit("setUser", response.data);
          return {success: true, user: response.data};
        }
      } catch (error) {
        const message =
          error.response?.data?.message || "Login failed. Please try again.";
        commit("setError", message);
        return {success: false, error: message};
      } finally {
        commit("setLoading", false);
      }
    },

    logout({commit}) {
      commit("logout");
    },

    clearError({commit}) {
      commit("setError", null);
    },
  },
});
