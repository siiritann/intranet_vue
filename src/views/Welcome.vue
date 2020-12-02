<template>
  <div class="registerhello text-center mb-3">
    <div class="home">
      <Brand/>
      <Navbar />
      <UserProfile msg="Welcome to your intranet"/>
    </div>
  </div>
</template>
<script>

import router from "@/router";


// @ is an alias to /src
import Brand from '@/components/Brand.vue';
import UserProfile from "@/components/UserProfile";
import Navbar from "@/components/Navbar";

export default {
  name: 'Welcome',
  components: {
    Brand,
    Navbar,
    UserProfile,
  },

};
</script>
<style></style>
