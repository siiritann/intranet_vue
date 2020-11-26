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
          <div id="post_list" >
<!--               v-for="row in posts">-->
            <div>
              {{resultList.username}} {{resultList.date}}
            <br>
              {{resultList.heading}}
              <br>
              {{resultList.body}}
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