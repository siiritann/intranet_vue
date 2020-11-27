<template>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ msg }}</h1>
    <div class="create-user-div row justify-content-center mx-3">
      <div class="col-lg-6 col-md-8 col-sm-10 user-creation-card p-3">
        <div>
          <div class="py-2">
            <h5>Your clientId is <span id="userId2">{{ this.$route.params.id }}</span> </h5>
          </div>
          <div>
          </div>
          <div class="row">
            <div><p> {{ userdata.id }}</p></div>
            <div class="col-12 col-sm-6">
              <p><strong>Username</strong></p>
              <p>{{ userdata.username }}</p>
            </div>
            <div class="col-12 col-sm-6">
              <p><strong> E-mail</strong></p>
              <p>{{ userdata.email }}</p>
            </div>
            <div class="col-12 col-sm-6">
              <p><strong> First name </strong></p>
              <p>{{ userdata.firstName }}</p>
            </div>
            <div class="col-12 col-sm-6">
              <p><strong> Last name </strong></p>
              <p>{{ userdata.lastName }}</p>
            </div>
            <div class="col-12 col-sm-6">
              <p><strong> Birthday </strong></p>
              <p>{{ userdata.birthDate }}</p>
            </div>
            <div class="col-12 col-sm-6">
              <p><strong>Phone </strong></p>
              <p>{{ userdata.phone }}</p>
            </div>
          </div>
          <div class="py-2">
            <button
                type="button"
                data-toggle="modal"
                data-target="#update_user"
                class="btn btn-outline-primary shadow-sm btn-lg float-right btn-lg">
              Modify
            </button>
            <button
                type="button"
                data-toggle="modal"
                data-target="#change_pw"
                class="btn btn-outline-primary shadow-sm btn-lg float-left btn-outline-warning">
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal user modify -->
    <div class="modal fade" id="update_user" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="update_user_label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="update_user_label">Update your profile</h5>
          </div>
          <div class="modal-body">
            <label for="email">E-mail </label>
            <input id="email" v-model="userdata.email" ><br><br>
            <label for="firstName">First name </label>
            <input id="firstName" v-model="userdata.firstName" ><br><br>
            <label for="lastName">Last name </label>
            <input id="lastName" v-model="userdata.lastName" ><br><br>
            <label for="birthday">Birthday </label>
            <input id="birthday" v-model="userdata.birthDate" ><br><br>
            <label for="phone">Phone </label>
            <input id="phone" v-model="userdata.phone" ><br><br>
            <br>
            <br>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal">Cancel</button>
            <button v-on:click="updateUser(userdata), reloadPage()" type="button">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal change pw -->
    <div class="modal fade" id="change_pw" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="update_user_label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="update_pw_label">Change password</h5>
          </div>
          <div class="modal-body">
            <label for="currentPw">Enter your current password </label>
            <input id="currentPw" v-model="currentPassword" type="password" ><br><br>

            <label for="newPw">Enter new password </label>
            <input id="newPw" v-model="newpassword" type="password" ><br><br>

<!--            <label for="passwordrepeat">Repeat new password </label>-->
<!--            <input id="passwordrepeat" v-model="passwordrepeat" type="password"><br><br>-->
            <br>
            <br>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal">Cancel</button>
            <button v-on:click="updatePassword(currentPassword, newpassword), reloadPage()" type="button">Save</button>
          </div>
        </div>
      </div>
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

let updateUser = function () {
  let url = 'http://localhost:8080/user/update';
  this.userdata.id = parseInt(document.querySelector("#userId2").innerHTML.trim());
  this.$http.put(url, this.userdata)
      .then(this.result)
}

let updatePassword = function (currentPassword, newpassword){
  let url = 'http://localhost:8080/user/update/password';
  let a = parseInt(document.querySelector("#userId2").innerHTML.trim());
  console.log(a);
  let body = {
    currentPassword,
    newpassword,
    a
  };

  this.$http.put(url, body).then((response) => {
    console.log(response.data);
    });
}


export default {
  name: 'UserProfile',
  methods: {
    getUserInfo,
    updateUser,
    reloadPage(){
      window.location.reload()
    },
    updatePassword
  },
  props: {
    msg: String,
    userdata: {}
  },
  data: function () {
    return {
      resultList: {},
      updatedUser: {},
      currentPassword: '',
      newpassword: ''
    };
  },
  mounted: function () {
    this.getUserInfo();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
