<template>
  <div class="home">
  <div >
    <Brand />
<!--    <UserProfile msg="Welcome to newsfeed" />-->
  </div>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ "Newsfeed" }}</h1>
    <div class="create-user-div row justify-content-center mx-3">
      <div class="col-lg-6 col-md-4 col-sm-6 user-creation-card p-3">
        <div style="text-align: left">
          Latest posts:
        </div>
    </div>
  </div>
  </div>
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