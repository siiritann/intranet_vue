<template>
  <div class="home">
  <div >
    <Brand />
<!--    <UserProfile msg="Welcome to newsfeed" />-->
  </div>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ "Newsfeed" }}</h1>
    <div class="create-user-div row justify-content-center mx-3">
      <div>
        <h2>Latest posts:</h2>
      </div>
      <div id="post_list" >
        <div v-for="list in resultList">
          <br>
      <div class="col-lg-6 col-md-4 col-sm-6 user-creation-card p-3" style="text-align: left">

            <div class="userpost">
              {{list.username}} {{list.date}}
            <br>
              <h5>{{list.heading}}</h5>

              {{list.body}}
              <br>
              <br>
            </div>
               </div>
        </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>

function getListOfPosts() {
  fetch('http://localhost:8080/posting/list')
      .then(result => result.json())
      .then((posts) => {
        console.log(posts);
        this.resultList = posts;
      });

}

import Brand from '@/components/Brand.vue';

export default {
  name: 'Newsfeed',
  components: {
    Brand
  },
  methods: {
    getListOfPosts
  },
  data: function () {
    return {
      resultList: {}
    }
  },
  mounted: function (){
    this.getListOfPosts();
  },
  };
</script>
<style>
</style>