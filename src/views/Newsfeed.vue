// this is a copy of Welcome.vue
<template>
  <div >
    <Brand />
    <UserProfile msg="Welcome to newsfeed" />
  </div>
</template>

<script>


// @ is an alias to /src
import RegisterSection from '@/components/RegisterSection.vue';
import Brand from '@/components/Brand.vue';
import UserProfile from "@/components/UserProfile.vue";

export default {
  name: 'Newsfeed',
  components: {
    Brand
  },
};
</script>