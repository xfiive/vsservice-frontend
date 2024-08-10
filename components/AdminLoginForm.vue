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
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const response = await axios.post('http://localhost:8081/api/admin/login', {
          username: this.username,
          password: this.password
        });


        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        console.log('access_token: ' + response.data.access_token);
        console.log('refresh_token: ' + response.data.refresh_token);
        // this.$router.push('/admin/dashboard');
      } catch (err) {
        this.error = 'Invalid username or password. Please try again.';
      }
    }
  }
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
