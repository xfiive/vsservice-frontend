<template>
  <div class="login-form">
    <h1>Admin Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required/>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required/>
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const response = await this.$api.post('/admin/login', {
          username: this.username,
          password: this.password,
        });

        console.log('Admin data:', response.data);

        this.$store.commit('setUser', response.data);
        console.log('Stored user:', this.$store.state.user);

        await this.$router.push('/admin/dashboard');
      } catch (err) {
        console.log('err: ' + err.message);

        this.error = 'Invalid username or password. Please try again.';
      }
    },
  },


};
</script>


<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

.login-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.login-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.login-form button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
