<template>
  <div>
    <AdminLoginForm/>
  </div>
</template>

<script>
import AdminLoginForm from '../../components/administration/AdminLoginForm.vue';

export default {
  layout: 'admin',
  components: {
    AdminLoginForm
  }
};
</script>
