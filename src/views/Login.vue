<template>
  <div class="home">
    <Brand />
    <Navbar />
    <LoginModal />
    <RegisterModal />
    <LoginSection msg="Welcome to intraNet" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginSection from '@/components/LoginSection.vue';
import Brand from '@/components/Brand.vue';
import Navbar from '@/components/Navbar.vue';
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  name: 'Login',
  components: {
    LoginSection,
    Brand,
    Navbar,
    LoginModal,
    RegisterModal,
  },
};
</script>
<style></style>
