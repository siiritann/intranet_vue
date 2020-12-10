<template>
  <div class="registerhello text-center mb-3">
    <div>
      <Brand />
      <Navbar />
      <LoginModal />
      <RegisterModal />
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
                      class="redButton btn btn-outline-secondary btn-danger text-white btn-sm mt-1"
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td>
                  <div>
                    <button
                      v-on:click="makeAdmin(index)"
                      type="button"
                      class="btn btn-outline-warning btn-sm yellowButton mt-1"
                    >
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
            <div
              v-if="adminSuccessMessage"
              class="mx-1 py-2 alert alert-success"
            >
              User successfully marked as admin.
            </div>
            <div
              v-if="deleteSuccessMessage"
              class="mx-1 py-2 alert alert-success"
            >
              User successfully deleted.
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Introduction from '@/components/Introduction.vue';
import Brand from '@/components/Brand.vue';
import Navbar from '@/components/Navbar.vue';
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
import router from '@/router';
import jwt_decode from 'jwt-decode';
import Footer from '@/components/Footer.vue';

function getAllUsers() {
  let url = this.$server + '/user/list';
  this.$http.get(url).then((response) => {
    this.usersList = response.data;
  });
}

function deleteUser(index) {
  let id = this.usersList[index].id;
  let url = this.$server + '/user/delete/' + id;
  this.$http
    .delete(url)
    .then((result) => {
      this.adminSuccessMessage = false;
      this.deleteSuccessMessage = true;
      this.errorMessage = false;
      localStorage.removeItem('user-token');
    })
    .catch((error) => {
      this.adminSuccessMessage = false;
      this.deleteSuccessMessage = false;
      this.errorMessage = true;
    });
  this.usersList.splice(index, 1);
}

let token = localStorage.getItem('user-token');

function makeAdmin(index) {
  let adminId = jwt_decode(token).intranetuserId;
  let userId = this.usersList[index].id;
  let url = this.$server + '/user/updaterole/' + adminId + '/' + userId;
  this.$http
    .post(url)
    .then((result) => {
      this.adminSuccessMessage = true;
      this.deleteSuccessMessage = false;
      this.errorMessage = false;
    })
    .catch((error) => {
      this.adminSuccessMessage = false;
      this.deleteSuccessMessage = false;
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
    Footer,
  },
  data: function() {
    return {
      usersList: [],
      adminSuccessMessage: false,
      deleteSuccessMessage: false,
      errorMessage: false,
    };
  },
  methods: {
    getAllUsers,
    deleteUser,
    makeAdmin,
  },
  props: {
    token,
  },
  mounted: function() {
    this.getAllUsers();
  },
};
</script>
<style>
.userslist {
  margin-bottom: 70vh;
}
.redButton {
  background-color: #d90707;
  color: dimgray;
  border-color: lightgray;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5) !important;
  transition: 0.2s;
}

.redButton:hover {
  background: #c90000;
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
</style>
