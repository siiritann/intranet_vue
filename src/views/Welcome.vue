// this is a copy of Register.vue
<template>
  <div>
    <Brand />
    <UserProfile msg="Welcome to your intranet" />
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterSection from '@/components/RegisterSection.vue';
import Brand from '@/components/Brand.vue';
import UserProfile from '@/components/UserProfile.vue';

export default {
  name: 'Welcome',
  components: {
    Brand,
    UserProfile,
  },
};
</script>
<style></style>
