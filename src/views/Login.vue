<template>
  <div class="home">
    <!--<Navbar />-->
    <Brand />
    <LoginSection msg="Welcome to intraNet" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginSection from '@/components/LoginSection.vue';
import Brand from '@/components/Brand.vue';
/*import Navbar from '@/components/Navbar.vue';*/

export default {
  name: 'Login',
  components: {
    LoginSection,
    Brand,
    /*Navbar,*/
  },
};
</script>
<style></style>
