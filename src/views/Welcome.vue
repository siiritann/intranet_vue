// this is a copy of Register.vue
<template>
  <div >
    <Brand />
    <UserProfile msg="Welcome to your intranet" />
  </div>
</template>

<script>


// @ is an alias to /src
import RegisterSection from '@/components/RegisterSection.vue';
import Brand from '@/components/Brand.vue';
import UserProfile from "@/components/UserProfile.vue";

export default {
  name: 'Welcome',
  components: {
    Brand,
    UserProfile
  },
};
</script>
<style>
.home {
  height: 100vh;
  background: #fff;
  font-family: 'Poppins', sans-serif;
  background: rgb(238, 244, 255);
  background: -moz-linear-gradient(
    90deg,
    rgba(238, 244, 255, 1) 0%,
    rgba(251, 250, 255, 1) 50%,
    rgba(238, 244, 255, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(238, 244, 255, 1) 0%,
    rgba(251, 250, 255, 1) 50%,
    rgba(238, 244, 255, 1) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(238, 244, 255, 1) 0%,
    rgba(251, 250, 255, 1) 50%,
    rgba(238, 244, 255, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#eef4ff",endColorstr="#eef4ff",GradientType=1);
}

.hello {
  color: #000;
  font-weight: 500;
  padding-top: 5vh;
}

.user-creation-card {
  background: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 10px 2px #000000;
  box-shadow: 0px 0px 10px 2px #000000;
}
</style>
