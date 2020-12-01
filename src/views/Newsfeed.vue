<template>
  <div class="home">
  <div >
    <Navbar />
  </div>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ "Newsfeed" }}</h1>

    <div class="row justify-content-center">
      <div class="col-lg-3 col-md-3 col-sm-4 p-3 d-none d-md-block" style="text-align: left">
      </div>
        <div class="col-lg-5 col-md-5 col-sm-8 p-3 order-2 order-md-1" style="text-align: left">
          <h2>Latest posts:</h2>
          {{username}}
          {{user.username}}
          <br>
          <div class="newsfeed-div justify-content-center mx-3" v-for="list in resultList">
          <div class="user-creation-card p-3 mb-3" style="text-align: left">

              <div id="all_posts" class="userpost">
                <div class="row">
                  <div class="col-sm">
                {{list.username}} {{list.date}}
                  </div>
                  <div class="btn-group-sm" role="group"  v-if="list.username === loginUsername" style="text-align: right">
                    <button id=""
                            class="btn btn-outline-secondary button-sm"
                            data-toggle="modal"
                            data-target="#start_editing"
                            v-on:click="setEditModal(list.id)"
                            >Edit</button>
                    <button id="delete_button"
                            class="btn btn-outline-secondary"
                            v-on:click="deletePost(list.id); getListOfPosts()">
                            Delete</button>
                  </div>

                </div>
              <br>
                <h5>{{list.heading}}</h5>
                <p :id="'body-' + list.id">{{list.body}}</p>
                <br>
                <br>
              </div>
        </div>
        </div>
      </div>
        <div class="col-lg-4 col-md-4 col-sm-6 p-3 order-1 order-md-2" style="text-align: left">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary" type="button" v-on:click="getUserPosts()"
                      id="button-addon1">Get posts by</button>
            </div>
            <input type="text" class="form-control" placeholder="Enter username" id="get_user_posts"
                   aria-label="Example text with button addon" aria-describedby="button-addon1">
          </div>
          <div>
            <button class="btn btn-outline-secondary" type="button" data-toggle="modal"
                    data-target="#create_post">Create a post</button>
          </div>

        </div>
    </div>

    <!-- Modal for edit post -->
    <div class="modal fade" id="start_editing" data-backdrop="static"
         data-keyboard="false" tabindex="-1" aria-labelledby="create_post_label"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="start_editing_label">Post editing</h5>
          </div>
          <div class="modal-body">
            <input id="old_heading" v-model="editPosting.heading" placeholder="Insert heading">
            <br>
            <br>
            <textarea id="old_body" v-model="editPosting.body" placeholder="Insert text"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal">Disregard</button>
            <button v-on:click="editPost(editPosting)" data-dismiss="modal" id="edit_post" type="button">Post</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for create post -->
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
            <button v-on:click="createPost(posting); getListOfPosts()" data-dismiss="modal" id="posting_post" type="button">Post</button>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>

</template>

<script>

let showResponse2 = function(response) {
  this.user = response.data;
}
let loginUsername = "";
let loginId = "";

function getUsername() {
  console.log("inside get username")
  let url = 'http://localhost:8080/user/view/basic';
  this.$http.get(url).then(result => {
    if(result.status === 200){
      loginUsername = result.data.username
      loginId = result.data.id
      console.log("got 200")
    } else {
      alert("Server Error")
    }
  })
      /*.then(this.showResponse2)
    console.log(this.showResponse2.data.username)
    console.log(this.showResponse2.data.id)*/

}
console.log(loginId, loginUsername)

function getListOfPosts() {
  console.log("in get posts")
  let url = 'http://localhost:8080/posting/list';
  this.$http.get(url)
      .then(this.showResponse)
}

let showResponse = function(response) {
  this.resultList = response.data;
}

function getUserPosts() {

  let username = document.getElementById("get_user_posts").value
  console.log(username)
  if(username === ""){
    this.getListOfPosts()
  } else {
    let url = 'http://localhost:8080/posting/user/' + username;
    this.$http.get(url)
        .then(this.showResponse)
  }
}

let createPost = function(){
  // USERNAME HARDCODED!
  console.log("in create")
  let url = 'http://localhost:8080/posting/create';
  this.$http.post(url, this.posting)
      .then(this.result)
      .then(this.getListOfPosts())

};

function setEditModal(id){
  let url = 'http://localhost:8080/posting/view/' + id;
  this.$http.get(url)
      .then(this.showResponse)
  document.getElementById("old_heading").innerHTML = this.showResponse.heading
  document.getElementById("old_body").innerHTML = this.showResponse.body
}

function editPost(id){
//   // USERNAME HARDCODED!
//   let url1 = 'http://localhost:8080/posting/update/' + id;
//   this.$http.post(url, this.posting)
//       .then(this.result)
//   let url2 = 'http://localhost:8080/posting/update/' + id;
//   this.$http.post(url, this.posting)
//       .then(this.result)
}

function deletePost(id){
  console.log("in delete")
  let url = 'http://localhost:8080/posting/delete/' + id;
  this.$http.delete(url)
      .then(this.post).then(this.getListOfPosts())
}


// Timer for 'get user posts'
let typeTimeout = null;
let startTimer = function() {
  typeTimeout = window.setTimeout(() => {
    this.getUserPosts()
  }, 1000)
}

// Event listener for get user posts input
console.log(document.getElementById("get_user_posts"))
let initPostsQuery = function(){
  document.getElementById("get_user_posts").addEventListener("input", () => {
    clearTimeout(typeTimeout)
    this.startTimer()
  })
}



import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Newsfeed',
  components: {
    Navbar
  },
  methods: {
    getListOfPosts,
    createPost,
    getUserPosts,
    deletePost,
    editPost,
    showResponse,
    showResponse2,
    initPostsQuery,
    startTimer,
    getUsername
  },
  data: function () {
    return {
      resultList: {},
      user: {},
      posting: {},
      editPosting: {},
      postUser: "",
      lists: {},
      result:[],
      loginUsername: "",
      loginId: ""
    }
  },
  mounted: function (){
    this.getUsername();
    this.getListOfPosts();
    this.initPostsQuery();

  },
  };
</script>
<style>
</style>