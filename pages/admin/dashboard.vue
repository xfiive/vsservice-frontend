<template>
  <div class="admin-dashboard" v-if="user">
    <h1>Welcome, {{ user.username }}!</h1>
    <p>You have successfully logged in as an administrator.</p>

    <div class="actions">
      <button @click="goToProducts">Manage Products</button>
      <button @click="goToUsers">Manage Users</button>
      <button @click="logout">Logout</button>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>


<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    console.log('Mounted user:', this.user);
    if (!this.user || !this.user.username) {
      this.$router.push('/login');
    }
  },
  methods: {
    goToProducts() {
      this.$router.push('/admin/products');
    },
    goToUsers() {
      this.$router.push('/admin/users');
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');

        this.$router.push('/admin/login');
      } catch (err) {
        console.error('Failed to logout', err);
      }
    },
  },
};

</script>

<style scoped>
.admin-dashboard {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.admin-dashboard h1 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

.admin-dashboard p {
  margin-bottom: 30px;
  font-size: 18px;
  color: #555;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.actions button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.actions button:hover {
  background-color: #0056b3;
}
</style>
