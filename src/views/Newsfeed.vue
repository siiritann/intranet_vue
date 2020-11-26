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
        <button>Get posts by</button>
        <input id="username" type="text" placeholder="Enter username">
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
    <div class="modal fade" id="create_post" data-keyboard="false" tabindex="-1" aria-labelledby="create_post_label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="create_post_label">Post creation</h5>
          </div>
          <div class="modal-body">
           <input v-model="posting.heading" placeholder="Insert heading">
            <br>
            <br>
            <textarea v-model="posting.body" placeholder="Insert text"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal">Disregard</button>
            <button v-on:click="createPost(posting)" id="posting_post" type="button">Post</button>
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

// posting.userId = this.$route.params.id
let posting;
posting.userId = 4
function createPost() {
  fetch('http://localhost:8080/posting/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: posting
      })
      .then(result => result.json())
// Kontrolli yle see sama post funktsioon, userId on puudu
// Loe sisse header ja postituse v2ljad
}

import Brand from '@/components/Brand.vue';

export default {
  name: 'Newsfeed',
  components: {
    Brand
  },
  methods: {
    getListOfPosts,
    createPost
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