import { createStore } from "vuex";
import axios from "axios";

// Configure axios
axios.defaults.baseURL = "http://localhost:5000";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user") || "null"),
    issues: [],
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_AUTH(state) {
      state.token = "";
      state.user = null;
    },
    SET_ISSUES(state, issues) {
      state.issues = issues;
    },
    ADD_ISSUE(state, issue) {
      state.issues.unshift(issue);
    },
    UPDATE_ISSUE(state, updatedIssue) {
      const index = state.issues.findIndex(
        (issue) => issue._id === updatedIssue._id
      );
      if (index !== -1) {
        state.issues.splice(index, 1, updatedIssue);
      }
    },
  },
  actions: {
    // Register user
    async register({ commit }, userData) {
      try {
        const res = await axios.post("/api/auth/register", userData);
        const { token } = res.data;

        // Get user data
        const userRes = await axios.get("/api/auth/me", {
          headers: { "x-auth-token": token },
        });

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userType", userRes.data.userType);
        localStorage.setItem("user", JSON.stringify(userRes.data));

        // Update state
        commit("SET_TOKEN", token);
        commit("SET_USER", userRes.data);

        return { success: true, userType: userRes.data.userType };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          error: err.response?.data?.msg || "Registration failed",
        };
      }
    },

    // Login user
    async login({ commit }, loginData) {
      try {
        const res = await axios.post("/api/auth/login", loginData);
        const { token, user } = res.data;

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userType", user.userType);
        localStorage.setItem("user", JSON.stringify(user));

        // Update state
        commit("SET_TOKEN", token);
        commit("SET_USER", user);

        return { success: true, userType: user.userType };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          error: err.response?.data?.msg || "Login failed",
        };
      }
    },

    // Logout
    logout({ commit }) {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("user");

      // Update state
      commit("CLEAR_AUTH");
    },

    // Create new issue
    async createIssue({ commit, state }, issueData) {
      try {
        const formData = new FormData();
        formData.append("address", issueData.address);
        formData.append("description", issueData.description);
        formData.append("image", issueData.image);

        const res = await axios.post("/api/issues", formData, {
          headers: {
            "x-auth-token": state.token,
            "Content-Type": "multipart/form-data",
          },
        });

        commit("ADD_ISSUE", res.data);
        return { success: true };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          error: err.response?.data?.msg || "Failed to create issue",
        };
      }
    },

    // Get all issues (for corporation)
    async getAllIssues({ commit, state }) {
      try {
        const res = await axios.get("/api/issues", {
          headers: { "x-auth-token": state.token },
        });

        commit("SET_ISSUES", res.data);
        return { success: true };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          error: err.response?.data?.msg || "Failed to get issues",
        };
      }
    },

    // Get user's issues
    async getUserIssues({ commit, state }) {
      try {
        const res = await axios.get("/api/issues/user", {
          headers: { "x-auth-token": state.token },
        });

        commit("SET_ISSUES", res.data);
        return { success: true };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          error: err.response?.data?.msg || "Failed to get issues",
        };
      }
    },

    // Update issue status
    async updateIssueStatus({ commit, state }, { issueId, status }) {
      try {
        const res = await axios.put(
          `/api/issues/${issueId}`,
          { status },
          {
            headers: { "x-auth-token": state.token },
          }
        );

        commit("UPDATE_ISSUE", res.data);
        return { success: true };
      } catch (err) {
        console.error(err);
        return {
          success: false,
          error: err.response?.data?.msg || "Failed to update issue",
        };
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userType: (state) => (state.user ? state.user.userType : null),
    issues: (state) => state.issues,
  },
});
