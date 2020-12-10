<template>
  <div class="home">
    <Brand />
    <Navbar />
    <LoginModal />
    <RegisterModal />
    <Introduction msg="Welcome to intraNet" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Introduction from '@/components/Introduction.vue';
import Brand from '@/components/Brand.vue';
import Navbar from '@/components/Navbar.vue';
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Login',
  components: {
    Introduction,
    Brand,
    Navbar,
    LoginModal,
    RegisterModal,
    Footer,
  },
};
</script>
<style></style>
