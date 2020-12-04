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
          <br>
          <div class="newsfeed-div justify-content-center mx-3" v-for="list in resultList">
          <div class="user-creation-card p-3 mb-3" style="text-align: left">

              <div id="all_posts" class="userpost">
                <div class="row">
                  <div class="col-sm">
                {{list.username}} {{list.date}}
                  </div>
                  <div class="btn-group-sm" role="group"  v-if="list.username === user.username" style="text-align: right">
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
          <div>
            <button class="btn btn-outline-secondary" type="button" data-toggle="modal"
                    data-target="#create_post">Create a post</button>

          </div>
          <div class="input-group mb-3">

<!--            I might yet need this -->
<!--            <div class="input-group-prepend">-->
<!--              -->
<!--              <button class="btn btn-outline-secondary" type="button" v-on:click="getAllUsers()"-->
<!--                      id="button-addon1">Get posts by</button>-->
<!--            </div>-->

            <!--TODO There are 2 cliches - if input is erased, the list stays. Also some lag with post reload after choosing a name. -->
            <input type="text"
                   class="form-control"
                   placeholder="Enter username to search user posts"
                   id="get_user_posts"
                   v-model="get_posts_input"
                   aria-label="Example text with button addon"
                   aria-describedby="button-addon1"
                   autocomplete="off"
                   @input="filterUsers"
                   @focus="modal = true"
                   >
          </div>
          <div v-if="filteredUsers && modal">
            <ul class="w-48 bg-gray-800 text-black">
              <li v-for="filteredUser in filteredUsers" class="py-2 border-b cursor-pointer" @click="setUser(filteredUser)">{{filteredUser}}</li>
            </ul>
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
            <button v-on:click="editPost()" data-dismiss="modal" id="edit_post" type="button">Post</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for create post -->
    <div class="modal fade" id="create_post" data-backdrop="static" data-keyboard="false"
         tabindex="-1" aria-labelledby="create_post_label" aria-hidden="true">
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
            <button v-on:click="createPost()" data-dismiss="modal" id="posting_post" type="button">Post</button>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>

</template>

<script>


function getUsername() {
  console.log("inside get username")
  let url = 'http://localhost:8080/user/view/basic';
  this.$http.get(url).then(result => {
    if(result.status === 200){
      this.user = result.data
    } else {
      alert("Server Error")
    }
  })
}

function getAllUsers(){
  console.log("in get all users")
  let url = 'http://localhost:8080/user/list/usernames';
  this.$http.get(url)
      .then(this.showUsers)
}
let showUsers = function(response) {
  this.usersList = response.data;
}

function filterUsers(){
  //I might yet need this
  // if(this.get_posts_input.length == 0){
  //   this.filteredUsers = this.usersList;
  // }
  this.filteredUsers = this.usersList.filter(get_posts_input => {
    return get_posts_input.toLowerCase().startsWith(this.get_posts_input.toLowerCase());
  })
  console.log(this.get_posts_input)
  console.log(this.usersList)
  console.log(this.filteredUsers)

}

function setUser(user){
  this.get_posts_input = user;
  this.modal = false;
  this.getUserPosts()
}

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

  console.log("in create")
  console.log(this.posting.username)
  this.posting.username = this.user.username
  console.log(this.posting.username)

  let url = 'http://localhost:8080/posting/create';
  this.$http.post(url, this.posting)
      .then(() => {this.result
        this.getListOfPosts()})

};

function setEditModal(id){
  let url = 'http://localhost:8080/posting/view/' + id;
  this.$http.get(url)
    .then(result => {
      this.oldPost = result.data
      this.editPosting.id = this.oldPost.id
      this.editPosting.username = this.oldPost.username
      this.editPosting.heading = this.oldPost.heading
      this.editPosting.body = this.oldPost.body
    })
}

function editPost(){

  console.log(JSON.stringify(this.editPosting))
  console.log(this.editPosting.id)
  console.log("inside edit post")
  let url1 = 'http://localhost:8080/posting/update';
  this.$http.put(url1, this.editPosting)
      .then(() => {this.result
        this.getListOfPosts()})
}

function deletePost(id){
  console.log("in delete")
  let url = 'http://localhost:8080/posting/delete/' + id;
  this.$http.delete(url)
      .then(() => {this.result
        this.getListOfPosts()})
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
    initPostsQuery,
    startTimer,
    getUsername,
    setEditModal,
    getAllUsers,
    filterUsers,
    showUsers,
    setUser
  },
  data: function () {
    return {
      resultList: {},
      usersList: [],
      user: {},
      posting: {},
      editPosting: {heading: "", body: ""},
      postUser: "",
      lists: {},
      result: [],
      oldPost: {},
      get_posts_input: "",
      filteredUsers: [],
      modal: false,
    }
  },
  mounted: function (){
    this.getUsername();
    this.getListOfPosts();
    this.initPostsQuery();
    this.getAllUsers();
    this.filterUsers();

  },
  };
</script>
<style>
</style>