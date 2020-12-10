<template>
  <div class="home">
    <div>
      <Brand />
      <Navbar />
      <LoginModal />
      <RegisterModal />
    </div>
    <div class="registerhello text-center">
      <h1 class="main-heading display-3 pt-5 mb-5">{{ 'Newsfeed' }}</h1>

      <div class="row justify-content-center footer-saver">
        <div
          class="col-lg-3 col-md-3 col-sm-4 p-3 d-none d-md-block"
          style="text-align: left"
        ></div>
        <div
          class="col-lg-5 col-md-5 col-sm-8 p-3 order-2 order-md-1"
          style="text-align: left"
        >
          <h2>Latest posts:</h2>
          <br />
          <div
            class="newsfeed-div justify-content-center mx-3"
            v-for="list in resultList"
          >
            <div class="user-creation-card p-3 mb-3" style="text-align: left">
              <div id="all_posts" class="userpost">
                <div class="row">
                  <div class="col-sm">
                    {{ list.username }}
                    {{ new Date(list.date).toLocaleString('et-EE') }}
                  </div>
                  <div
                    class="btn-group-sm"
                    role="group"
                    style="text-align: right"
                  >
                    <button
                      v-if="list.username === user.username"
                      class="blueButton btn btn-outline-secondary button-sm mr-1"
                      data-toggle="modal"
                      data-target="#start_editing"
                      v-on:click="setEditModal(list.id)"
                    >
                      Edit
                    </button>
                    <button
                      id="delete_button"
                      class="blueButton btn btn-outline-secondary"
                      v-if="list.username === user.username || isAdmin"
                      data-toggle="modal"
                      data-target="#delete_post"
                      v-on:click=rememberId(list.id)
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <br />
                <h5>{{ list.heading }}</h5>
                <div class="text-break">
                  <p :id="'body-' + list.id">{{ list.body }}</p>
                </div>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-lg-4 col-md-4 col-sm-6 p-3 order-1 order-md-2"
          style="text-align: left"
        >
          <div>
            <button
              class="yellowButton btn btn-outline-secondary mb-1"
              type="button"
              data-toggle="modal"
              data-target="#create_post"
            >
              Create a post
            </button>
          </div>
          <div id="filterParent" class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter username to search user posts"
              id="get_user_posts"
              v-model="get_posts_input"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              autocomplete="off"
              @input="filterUsers"
              @focus="modal = true"
            />
            <div id="filterContainer" v-if="filteredUsers && modal" class="">
              <ul class="m-0 p-0">
                <li
                  v-for="filteredUser in filteredUsers"
                  class="px-3 py-2 border-b cursor-pointer"
                  @click="setUser(filteredUser) && clearFilter()"
                >
                  {{ filteredUser }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal delete account -->
      <div
          class="modal fade"
          id="delete_post"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="delete_post_label"
          aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header" style="background-color: #fffcc4">
              <h5 class="modal-title" id="delete_label">Delete post</h5>
            </div>
            <div class="modal-body">
              <h5 class="py-3 px-3">
                You are about to delete the post.
              </h5>
              <h5 class="px-2">Are you sure you wish continue?</h5>
              <br />
              <div class="py-2 row">
                <div class="col-12 col-sm-6 mb-3">
                  <button
                      type="button"
                      data-dismiss="modal"
                      class="btn btn-light shadow-sm btn-lg "
                  >
                    No
                  </button>
                </div>
                <div class="col-12 col-sm-6 mb-3">
                  <button
                      v-on:click="
                        deletePost(deleteId);
                        getListOfPosts();
                      "
                      data-dismiss="modal"
                      type="button"
                      class="blueButton btn shadow-sm btn-lg "
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
        </div>
      <!-- Modal for edit post -->
      <div
        class="modal fade"
        id="start_editing"
        data-backdrop="static"
        data-keyboard="false"
        tabindex="-1"
        aria-labelledby="create_post_label"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header" style="background-color: #fffcc4">
              <h5 class="modal-title" id="start_editing_label">Post editing</h5>
            </div>
            <div class="modal-body">
              <input
                class="form-control w-50"
                id="old_heading"
                v-model="editPosting.heading"
                placeholder="Insert heading"
              />
              <br />
              <textarea
                class="form-control"
                id="old_body"
                v-model="editPosting.body"
                placeholder="Insert text"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-light shadow-sm btn-sm"
                type="button"
                data-dismiss="modal"
              >
                Disregard
              </button>
              <button
                class="blueButton btn btn-outline-secondary"
                v-on:click="editPost()"
                data-dismiss="modal"
                id="edit_post"
                type="button"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal for create post -->
      <div
        class="modal fade"
        id="create_post"
        data-backdrop="static"
        data-keyboard="false"
        tabindex="-1"
        aria-labelledby="create_post_label"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header" style="background-color: #fffcc4">
              <h5 class="modal-title" id="create_post_label">Post creation</h5>
            </div>
            <div class="modal-body">
              <input
                class="form-control w-50"
                v-model="posting.heading"
                placeholder="Insert heading"
              />
              <br />
              <textarea
                class="form-control"
                v-model="posting.body"
                placeholder="Insert text"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-light shadow-sm btn-sm"
                type="button"
                data-dismiss="modal"
              >
                Disregard
              </button>
              <button
                class="blueButton btn btn-outline-secondary"
                v-on:click="createPost()"
                data-dismiss="modal"
                id="posting_post"
                type="button"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
let token = localStorage.getItem('user-token');
function checkIfAdmin() {
  if (token != null) {
    this.isAdmin = jwt_decode(token).isAdmin;
  }
}

function getUsername() {
  let url = this.$server + '/user/view/basic';
  this.$http.get(url).then((result) => {
    if (result.status === 200) {
      this.user = result.data;
    } else {
      alert('Server Error');
    }
  });
}

function getAllUsers() {
  let url = this.$server + '/user/list/usernames';
  this.$http.get(url).then(this.showUsers);
}

let showUsers = function(response) {
  this.usersList = response.data;
};

function filterUsers() {
  //I might yet need this
  if (document.querySelector('#get_user_posts').value.length === 0) {
    this.filteredUsers = [];
  }
  this.filteredUsers = this.usersList.filter((get_posts_input) => {
    return get_posts_input
      .toLowerCase()
      .startsWith(this.get_posts_input.toLowerCase());
  });
}
function clearFilter() {
  this.fileredUsers = [];
}

function setUser(user) {
  this.get_posts_input = user;
  document.querySelector('#get_user_posts').value = user;
  this.modal = false;
  this.getUserPosts();
}

function getListOfPosts() {
  let url = this.$server + '/posting/list';
  this.$http.get(url).then(this.showResponse);
}

let showResponse = function(response) {
  this.resultList = response.data;
};

function getUserPosts() {
  let username = document.querySelector('#get_user_posts').value;
  if (username === '') {
    this.getListOfPosts();
  } else {
    let url = this.$server + '/posting/user/' + username;
    this.$http.get(url).then(this.showResponse);
  }
}

let createPost = function() {
  this.posting.username = this.user.username;
  let url = this.$server + '/posting/create';
  this.$http.post(url, this.posting).then(() => {
    this.result;
    this.posting.heading = '';
    this.posting.body = '';
    this.getListOfPosts();
  });
};

function setEditModal(id) {
  let url = this.$server + '/posting/view/' + id;
  this.$http.get(url).then((result) => {
    this.oldPost = result.data;
    this.editPosting.id = this.oldPost.id;
    this.editPosting.username = this.oldPost.username;
    this.editPosting.heading = this.oldPost.heading;
    this.editPosting.body = this.oldPost.body;
  });
}

function editPost() {
  let url1 = this.$server + '/posting/update';
  this.$http.put(url1, this.editPosting).then(() => {
    this.result;
    this.getListOfPosts();
  });
}

function deletePost(id) {
  let url = this.$server + '/posting/delete/' + id;
  this.$http.delete(url).then(() => {
    this.result;
    this.getListOfPosts();
    this.deleteId = null
  });
}

function rememberId(id){
  this.deleteId = id;
}

// Timer for 'get user posts'
let typeTimeout = null;
let startTimer = function() {
  typeTimeout = window.setTimeout(() => {
    this.getUserPosts();
  }, 1000);
};

// Event listener for get user posts input
console.log(document.querySelector('#get_user_posts'));
let initPostsQuery = function() {
  document.querySelector('#get_user_posts').addEventListener('input', () => {
    clearTimeout(typeTimeout);
    this.startTimer();
  });
};

import Navbar from '@/components/Navbar.vue';
import RegisterModal from '@/components/RegisterModal';
import LoginModal from '@/components/LoginModal';
import Brand from '@/components/Brand';
import jwt_decode from 'jwt-decode';
import Footer from '@/components/Footer';

export default {
  name: 'Newsfeed',
  components: {
    RegisterModal,
    LoginModal,
    Navbar,
    Brand,
    Footer,
  },
  props: {
    token,
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
    setUser,
    clearFilter,
    checkIfAdmin,
    rememberId
  },
  data: function() {
    return {
      resultList: {},
      usersList: [],
      user: {},
      posting: {},
      editPosting: { heading: '', body: '' },
      postUser: '',
      lists: {},
      result: [],
      oldPost: {},
      get_posts_input: '',
      filteredUsers: [],
      modal: false,
      filteredUser: '',
      isAdmin: false,
      deleteId: null,
    };
  },
  mounted: function() {
    this.getUsername();
    this.getListOfPosts();
    this.initPostsQuery();
    this.getAllUsers();
    this.filterUsers();
    this.checkIfAdmin();
  },
};
</script>
<style>
.blueButton {
  background-color: #dbf4ff;
  color: dimgray;
  border-color: lightgray;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5) !important;
  transition: 0.2s;
}

.blueButton:hover {
  background: lightblue;
}

.yellowButton {
  background-color: #fffcc4;
  color: dimgray;
  border-color: lightgray;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5) !important;
  transition: 0.2s;
}

.yellowButton:hover {
  background: #fcefa2;
}
#filterParent {
  position: relative;
}
#filterContainer {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  border-left: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  border-radius: 5px;
  background-color: #fff;
  max-height: 300px;
  overflow: scroll;
  overflow-x: hidden;
}
#filterContainer ul li {
  list-style: none;
  transition: 0.1s;
}
#filterContainer ul li:hover {
  cursor: pointer;
  background-color: #00a2ff;
  transition: 0.1s;
}
.footer-saver {
  margin-bottom: 60vh;
}
</style>
