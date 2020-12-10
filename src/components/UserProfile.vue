<template>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ msg }}</h1>
    <div class="row justify-content-center mx-3">
      <div class="col-lg-6 col-md-8 col-sm-10 user-creation-card px-3 py-5 mb-5">
        <div>
          <h5 hidden>Your clientId is <span id="userId">{{ userdata.id }}</span></h5>
          <div class="row">
            <div class="col-12 col-sm-6">
              <div>
                <ImageTool/>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="row p-5">
              <div class="row">
                <div class="col-sm-5">
                  <p><strong>Username</strong></p>
                </div>
                <div class="col-sm-7">
                  <p>{{ userdata.username }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-5">
                  <p><strong> E-mail</strong></p>
                </div>
                <div class="col-sm-7">
                  <p>{{ userdata.email }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-5">
                  <p><strong> First name </strong></p>
                </div>
                <div class="col-sm-7">
                  <p>{{ userdata.firstName }}</p>
                </div>
              </div>
              <div class="row">
              <div class="col-sm-5">
                <p><strong> Last name </strong></p>
              </div>
              <div class="col-sm-7">
                <p>{{ userdata.lastName }}</p>
              </div>
            </div>
              <div class="row">
                <div class="col-sm-5">
                  <p><strong> Birthday </strong></p>
                </div>
                <div class="col-sm-7">
                  <p>{{ userdata.birthDate }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-5">
                  <p><strong>Phone </strong></p>
                </div>
                <div class="col-sm-7">
                  <p>{{ userdata.phone }}</p>
                </div>
              </div>
              </div>
              <div class="row">
              <div class="mt-2">
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#update_user"
                    id="modifyButton"
                    class="w-75 btn btn-outline-primary shadow-sm btn-lg btn-lg">
                  Modify
                </button>
              </div>
              <div class="mt-2">
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#change_pw"
                    class="w-75 btn btn-outline-primary shadow-sm btn-lg"
                    id="changePwButton">
                  Change password
                </button>
              </div>
              <div class="mt-2">
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#delete_user"
                    class="w-75 btn btn-danger shadow-sm btn-lg btn-lg ">
                  Delete account
                </button>
              </div>
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
          <div class="modal-header" style="background-color: #fffcc4">
            <h5 class="modal-title" id="update_user_label">Update your profile</h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-5">
                <label class="mt-2" for="email">E-mail </label>
              </div>
              <div class="col-sm-7">
                <input class="form-control" autocomplete="off" id="email" v-model="userdata.email">
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-sm-5">
                <label class="mt-2" for="firstName">First name</label>
              </div>
              <div class="col-sm-7">
                <input class="form-control" autocomplete="off" id="firstName" v-model="userdata.firstName">
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-sm-5">
                <label class="mt-2" for="lastName">Last name</label>
              </div>
              <div class="col-sm-7">
                <input class="form-control" autocomplete="off" id="lastName" v-model="userdata.lastName">
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-sm-5">
                <label class="mt-2" for="birthday">Birthday</label>
              </div>
              <div class="col-sm-7">
                <input class="form-control" autocomplete="off" id="birthday" v-model="userdata.birthDate">
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-sm-5">
                <label class="mt-2" for="phone">Phone</label>
              </div>
              <div class="col-sm-7">
                <input class="form-control" name="phone" autocomplete="off" id="phone" v-model="userdata.phone">
              </div>
            </div>

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
                class="blueButton btn shadow-sm btn-sm float-left">Save
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
          <div class="modal-header" style="background-color: #fffcc4">
            <h5 class="modal-title" id="update_pw_label">Change password</h5>
          </div>
          <div class="modal-body">
            <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-8">
            <label for="currentPw">Enter your current password </label>
            <input class="form-control mt-2" autocomplete="off" id="currentPw" v-model="currentPassword" type="password">
            <label class="mt-2" for="newPw">Enter new password </label>
            <input class="form-control mt-2" autocomplete="off" id="newPw" v-model="newPassword" type="password">
            </div>
            <div class="col-sm-2"></div>
            </div>
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
                class="blueButton btn shadow-sm btn-sm float-left">Save
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
          <div class="modal-header" style="background-color: #fffcc4">
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
                    class="blueButton btn shadow-sm btn-lg ">Yes
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
  components: {
    ImageTool
  },
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
<style>

#modifyButton {
  background-color: #dbf4ff;
  color: dimgray;
  border-color: lightgray;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5) !important;
  transition: 0.2s;
}

#modifyButton:hover {
  background: lightblue;
}

#changePwButton {
  background-color: #dbf4ff;
  color: dimgray;
  border-color: lightgray;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5) !important;
  transition: 0.2s;
}

#changePwButton:hover {
  color: lightblue;
}

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
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
