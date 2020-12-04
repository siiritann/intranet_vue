<template>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ msg }}</h1>
    <div class="create-user-div row justify-content-center mx-3">
      <div class="col-lg-6 col-md-8 col-sm-10 user-creation-card p-3">
        <div>
          <div class="py-2">
            <h5>Your clientId is <span id="userId">{{ userdata.id }}</span></h5>
          </div>
          <div>
          </div>
          <div class="row">
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
          <div class="py-2 row">
            <div class="col-12 col-sm-6 mb-3">
              <button
                  type="button"
                  data-toggle="modal"
                  data-target="#change_pw"
                  class="btn btn-outline-primary shadow-sm btn-lg btn-outline-warning">
                Change password
              </button>
            </div>
            <div class="col-12 col-sm-6">
              <button
                  type="button"
                  data-toggle="modal"
                  data-target="#update_user"
                  class="btn btn-outline-primary shadow-sm btn-lg btn-lg">
                Modify
              </button>
            </div>
          </div>
          <div class="py-2 row">
            <div class="col-12 col-sm-6 text-right">
            </div>
            <div class="col-12 col-sm-6">
              <button
                  type="button"
                  data-toggle="modal"
                  data-target="#delete_user"
                  class="btn btn-danger shadow-sm btn-lg btn-lg ">
                Delete account
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>


    <!-- Modal user modify -->
    <div class="modal fade" id="update_user" data-backdrop="static" data-keyboard="false" tabindex="-1"
         aria-labelledby="update_user_label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="update_user_label">Update your profile</h5>
          </div>
          <div class="modal-body">
            <label for="email">E-mail </label>
            <input id="email" v-model="userdata.email"><br><br>
            <label for="firstName">First name </label>
            <input id="firstName" v-model="userdata.firstName"><br><br>
            <label for="lastName">Last name </label>
            <input id="lastName" v-model="userdata.lastName"><br><br>
            <label for="birthday">Birthday </label>
            <input id="birthday" v-model="userdata.birthDate"><br><br>
            <label for="phone">Phone </label>
            <input id="phone" v-model="userdata.phone"><br><br>
            <br>
            <br>
          </div>
          <div class="modal-footer">
            <button
                type="button"
                data-dismiss="modal"
                class="btn btn-light shadow-sm btn-sm float-left">Cancel
            </button>
            <button
                v-on:click="updateUser(userdata), reloadPage()"
                type="button"
                class="btn btn-danger shadow-sm btn-sm float-left">Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal change pw -->
    <div class="modal fade" id="change_pw" data-backdrop="static" data-keyboard="false" tabindex="-1"
         aria-labelledby="update_user_label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="update_pw_label">Change password</h5>
          </div>
          <div class="modal-body">
            <label for="currentPw">Enter your current password </label>
            <input id="currentPw" v-model="currentPassword" type="password"><br><br>

            <label for="newPw">Enter new password </label>
            <input id="newPw" v-model="newPassword" type="password"><br><br>
            <br>
            <br>
          </div>
          <div class="modal-footer">
            <button
                type="button"
                data-dismiss="modal"
                class="btn btn-light shadow-sm btn-sm float-left">Cancel
            </button>
            <button
                v-on:click="updatePassword(currentPassword, newPassword), reloadPage()"
                type="button"
                class="btn btn-danger shadow-sm btn-sm float-left">Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal delete account -->
    <div class="modal fade" id="delete_user" data-backdrop="static" data-keyboard="false" tabindex="-1"
         aria-labelledby="delete_user_label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="delete_label">Delete account</h5>
          </div>
          <div class="modal-body">
            <h5 class="py-3 px-3">If you delete your account then this
              can't be undone. </h5>
            <h5 class="px-2">Do you wish to continue?</h5>
            <br>
            <div class="py-2 row">
              <div class="col-12 col-sm-6 mb-3">
                <button
                    type="button"
                    data-dismiss="modal"
                    class="btn btn-light shadow-sm btn-lg ">No
                </button>
              </div>
              <div class="col-12 col-sm-6 mb-3">
                <button
                    v-on:click="deleteUser()"
                    data-dismiss="modal"
                    type="button"
                    class="btn btn-danger shadow-sm btn-lg ">Yes
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";

function getUserInfo() {
  let url = this.$server + '/user/view';
  this.$http.get(url)
      .then((response) => {
        this.userdata = response.data;
      })
}


let updateUser = function () {
  let url = this.$server + '/user/update';
  this.userdata.id = parseInt(document.querySelector("#userId").innerHTML.trim());
  this.$http.put(url, this.userdata)
      .then(this.result)
}

let updatePassword = function (currentPassword, newPassword) {
  let url = this.$server + '/user/update/password';
  let id = parseInt(document.querySelector("#userId").innerHTML.trim());
  let body = {
    currentPassword,
    newPassword,
    id
  };
  this.$http.put(url, body);
}

let deleteUser = function () {
  let id = parseInt(document.querySelector("#userId").innerHTML.trim());
  let url = this.$server + '/user/delete/' + id;
  this.$http.delete(url)
      .then(result => {
        localStorage.removeItem('user-token');
        router.push({name: 'Login'});
        location.reload();
      })
}

export default {
  name: 'UserProfile',
  methods: {
    getUserInfo,
    updateUser,
    reloadPage() {
      window.location.reload()
    },
    updatePassword,
    deleteUser
  },
  props: {
    msg: String,
  },
  data: function () {
    return {
      resultList: {},
      updatedUser: {},
      currentPassword: '',
      newPassword: '',
      userdata: {},
    };
  },
  mounted: function () {
    this.getUserInfo();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
