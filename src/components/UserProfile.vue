<template>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ msg }}</h1>
    <div class="row justify-content-center mx-3">
      <div class="col-lg-6 col-md-8 col-sm-10 user-creation-card px-3 py-5">
        <div>
          <h5 hidden>Your clientId is <span id="userId">{{ userdata.id }}</span></h5>
          <div class="row">
            <div class="col-12 col-sm-6">
              <div>
                <ImageTool/>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <p><strong>Username</strong></p>
              <p>{{ userdata.username }}</p>
              <p><strong> E-mail</strong></p>
              <p>{{ userdata.email }}</p>
              <p><strong> First name </strong></p>
              <p>{{ userdata.firstName }}</p>
              <p><strong> Last name </strong></p>
              <p>{{ userdata.lastName }}</p>
              <p><strong> Birthday </strong></p>
              <p>{{ userdata.birthDate }}</p>
              <p><strong>Phone </strong></p>
              <p>{{ userdata.phone }}</p>
              <div class="mt-2">
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#update_user"
                    id="modifyButton"
                    class="btn btn-outline-primary shadow-sm btn-lg btn-lg">
                  Modify
                </button>
              </div>
              <div class="mt-2">
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#change_pw"
                    class="btn btn-outline-primary shadow-sm btn-lg btn-outline-warning"
                    id="changePwButton">
                  Change password
                </button>
              </div>
              <div class="mt-2">
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
                class="btn btn-light shadow-sm btn-sm float-left"
                v-on:click="closeModal()"
            >Cancel
            </button>
            <button
                v-on:click="updatePassword(currentPassword, newPassword)"
                type="button"
                class="btn btn-danger shadow-sm btn-sm float-left">Save
            </button>
          </div>
          <div id="emailErrorMessage" v-if="errorMessage" class="mx-1 py-2 alert alert-danger">
            Wrong password.
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
import ImageTool from "@/components/ImageTool";

function getUserInfo() {
  let url = this.$server + '/user/view';
  this.$http.get(url)
      .then((response) => {
        this.userdata = response.data;
      })
}


let closeModal = function () {
  this.currentPassword = '';
  this.newPassword = '';
  this.errorMessage = false;
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
  this.$http.put(url, body)
      .then(result => {
        window.location.href = this.$host + '/#/welcome';
        location.reload();
      })
      .catch(error => {
        this.errorMessage = true;
      });
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
  components: {
    ImageTool
  },
  methods: {
    getUserInfo,
    updateUser,
    closeModal,
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
      errorMessage: false
    };
  },
  mounted: function () {
    this.getUserInfo();
  },
};
</script>
<style>

#modifyButton {
  background-color: lightcyan;
  color: dimgray;
  border-color: lightgray;
  border-radius: 5px;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.5) !important;
  transition: 0.2s;
}

#modifyButton:hover {
  background: lightblue;
}

#changePwButton {
  background-color: #f9fabb;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5) !important;
  transition: 0.2s;
}

#changePwButton:hover {
  background-color: #f0ef9c;
  color: dimgray;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
