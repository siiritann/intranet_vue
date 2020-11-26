<template>
  <div class="home">
    <Brand />
    <LoginSection msg="Welcome to intraNet" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginSection from '@/components/LoginSection.vue';
import Brand from '@/components/Brand.vue';

export default {
  name: 'Login',
  components: {
    LoginSection,
    Brand,
  },
};
</script>
<style></style>
