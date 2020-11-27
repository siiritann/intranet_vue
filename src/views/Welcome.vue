// this is a copy of Register.vue
<template>
  <div class="registerhello text-center mb-3">
    <div class="home">
      <Brand/>
      <UserProfile v-bind:userdata="resultList2" msg="Welcome to your intranet"/>
    </div>
  </div>
</template>
<script>

import router from "@/router";

function getUserInfo() {
  fetch('http://localhost:8080/user/view/' + this.$route.params.id)
      .then(result => result.json())
      .then((user) => {
        console.log(user);
        this.resultList2 = user;
      });
}


// @ is an alias to /src
import RegisterSection from '@/components/RegisterSection.vue';
import Brand from '@/components/Brand.vue';
import UserProfile from "@/components/UserProfile";

export default {
  name: 'Welcome',
  components: {
    UserProfile,
    Brand,
  },
  methods: {
    getUserInfo
  },
  data: function () {
    return {
      resultList: {},
      resultList2: {}
    };
  },
  mounted: function () {
    this.getUserInfo();
  },
  beforeRouteUpdate: function (to, from, next) {
    this.$route.params.id = to.params.id;
    this.getUserInfo();
  }
};
</script>
<style></style>
