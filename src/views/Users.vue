<template>
  <div class="registerhello text-center mb-3">
    <div>
      <Brand/>
      <Navbar/>
      <LoginModal/>
      <RegisterModal/>
    </div>
    <div class="home">
      <h1 class="main-heading display-3 pt-5 mb-5">Admin center</h1>
      <div class="row justify-content-center mx-5">
        <div class="user-creation-card col-lg-12 col-sm-10 p-3 mx-0 userslist">
          <div class="mb-3">
            <p>
              Here you can find list of the users on your site.
            </p>
            <table class="col-lg-12 col-sm-10  p-3 mx-0">
              <tr>
                <th class="mx-1 py-2">Username</th>
                <th class="mx-1 py-2">E-mail</th>
                <th class="mx-1 py-2">First name</th>
                <th class="mx-1 py-2">Last name</th>
                <th class="mx-1 py-2">Phone</th>
                <th class="mx-1 py-2">Birthday</th>
                <th></th>
                <th></th>
              </tr>
              <tr v-for="(list, index) in usersList">
                <td>{{ list.username }}</td>
                <td>{{ list.email }}</td>
                <td>{{ list.firstName }}</td>
                <td>{{ list.lastName }}</td>
                <td>{{ list.phone }}</td>
                <td>{{ list.birthDate }}</td>
                <td>
                  <div>
                    <button
                        v-on:click="deleteUser(index)"
                        type="button"
                        class="btn btn-outline-secondary btn-sm">
                      Delete
                    </button>
                  </div>
                </td>
                <td>
                  <div>
                    <button
                        v-on:click="makeAdmin(index)"
                        type="button"
                        class="btn btn-outline-warning btn-sm">
                      Make admin
                    </button>
                  </div>
                </td>
              </tr>
              <tr></tr>
            </table>
          </div>
          <div class="mx-5">
            <div v-if="errorMessage" class="mx-1 py-2 alert alert-danger">
              Something went wrong.
            </div>
            <div v-if="successMessage" class="mx-1 py-2 alert alert-success">
              User successfully marked as admin.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Introduction from '@/components/Introduction.vue';
import Brand from '@/components/Brand.vue';
import Navbar from '@/components/Navbar.vue';
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
import router from "@/router";
import jwt_decode from "jwt-decode";

function getAllUsers() {
  let url = this.$server + '/user/list';
  this.$http.get(url)
      .then(response => {
        this.usersList = response.data;
      })
}

function deleteUser(index) {
  let id = this.usersList[index].id;
  let url = this.$server + '/user/delete/' + id;
  this.$http.delete(url)
      .then(result => {
        localStorage.removeItem('user-token');
      })
      .catch(error => "");
  this.usersList.splice(index, 1);
}

let token = localStorage.getItem('user-token');

function makeAdmin(index) {
  let adminId = jwt_decode(token).intranetuserId;
  let userId = this.usersList[index].id;
  let url = this.$server + '/user/updaterole/' + adminId + '/' + userId;
  this.$http.post(url)
      .then(result => {
        this.successMessage = true;
        this.errorMessage = false;
      })
      .catch(error => {
        this.successMessage = false;
        this.errorMessage = true;
      });
}

export default {
  name: 'Login',
  components: {
    Brand,
    Navbar,
    LoginModal,
    RegisterModal,
  },
  data: function () {
    return {
      usersList: [],
      successMessage: false,
      errorMessage: false,
    }
  },
  methods: {
    getAllUsers,
    deleteUser,
    makeAdmin
  },
  props: {
    token,
  },
  mounted: function () {
    this.getAllUsers();
  },
};
</script>
<style>
.userslist {
  margin-bottom: 80vh;
}
</style>
