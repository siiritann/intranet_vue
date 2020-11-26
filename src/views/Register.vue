<template>
  <div class="home">
    <Brand />
    <RegisterSection msg="Join" />
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterSection from '@/components/RegisterSection.vue';
import Brand from '@/components/Brand.vue';

export default {
  name: 'Register',
  components: {
    RegisterSection,
    Brand,
  },
};
</script>
<style></style>
