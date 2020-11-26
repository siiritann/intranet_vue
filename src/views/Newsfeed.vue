<template>
  <div class="home">
  <div >
    <Brand />
<!--    <UserProfile msg="Welcome to newsfeed" />-->
  </div>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ "Newsfeed" }}</h1>
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-4 col-sm-6 text-left"></div>
      <div class="col-lg-4 col-md-4 col-sm-6 text-left">
        <h2>Latest posts:</h2>
        <br>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 p-3" style="text-align: left">
        <button v-on:click="getUserPosts()">Get posts by</button>
        <input id="post_username" type="text" placeholder="Enter username">
        <br>
        <button type="button" data-toggle="modal" data-target="#create_post">Create a post</button>
      </div>
    </div>

    <div class="newsfeed-div row justify-content-center mx-3" v-for="list in resultList">

      <div class="col-lg-4 col-md-4 col-sm-6 user-creation-card p-3" style="text-align: left">

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

    <!-- Modal -->
    <div class="modal fade" id="create_post" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="create_post_label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="create_post_label">Post creation</h5>
          </div>
          <div class="modal-body">
           <input v-model="posting.username" placeholder="Insert username">
           <input v-model="posting.heading" placeholder="Insert heading">
            <br>
            <br>
            <textarea v-model="posting.body" placeholder="Insert text"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal">Disregard</button>
            <button v-on:click="createPost(posting), reloadPage()" id="posting_post" type="button">Post</button>
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

function getUserPosts() {
  // USERID HARDCODED!
  fetch('http://localhost:8080/posting/user/' + 6)
      .then(result => result.json())
      .then((posts) => {
        console.log(posts);
        this.resultList = posts;
      });
}



// posting.userId = this.$route.params.id


let createPost = function(){
  // USERNAME HARDCODED!
  let url = 'http://localhost:8080/posting/create';
  this.$http.post(url, this.posting)
      .then(this.result)
};


import Brand from '@/components/Brand.vue';

export default {
  name: 'Newsfeed',
  components: {
    Brand
  },
  methods: {
    getListOfPosts,
    createPost,
    getUserPosts,
    reloadPage(){
      window.location.reload()
    }
  },
  data: function () {
    return {
      resultList: {},
      posting: {}
    }
  },
  mounted: function (){
    this.getListOfPosts();
  },
  };
</script>
<style>
</style>