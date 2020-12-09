<template>
  <div class="registerhello text-center mb-3">
    <div>
      <Brand/>
      <Navbar/>
      <LoginModal/>
      <RegisterModal/>
    </div>
    <div class="home">
      <div class="registerhello text-center">
        <h1 class="main-heading display-3 pt-5 mb-5">Reset your password here</h1>
        <div class="create-user-div row justify-content-center mx-3">
          <div class="col-lg-6 col-md-8 col-sm-10 user-creation-card p-3 mx-0 px-5">
            <div>
              <div class="py-2">
                <p>
                  Just create a new password for your account and log in with the new credentials.
                </p>
                <div class="mx-5">
                  <div class="form-group">
                    <label for="passwordInputReg">Password*</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="passwordInputReg"
                    />
                  </div>
                  <div class="form-group">
                    <label for="passwordInputRepeatReg">Repeat Password*</label>
                    <input
                        v-model="passwordrepeat"
                        type="password"
                        class="form-control"
                        id="passwordInputRepeatReg"
                    />
                  </div>
                </div>
              </div>
              <div class="py-3">
                <button
                    type="submit"
                    v-on:click="updatePassword(password, passwordrepeat)"
                    class="btn btn-outline-primary shadow-sm ">
                  Update my password
                </button>
              </div>
              <div id="emailErrorMessage" v-if="errorMessage" class="mx-1 py-2 alert alert-danger">
                Something went wrong. Please try again.
              </div>
              <div id="emailSuccessMessage" v-if="successMessage" class="mx-1 py-2 alert alert-success">
                Password successfully updated! Now log in with your new credentials.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";


let updatePassword = function (password, passwordrepeat) {
  let invalid = false;

  if (password === '') {
    invalid = true;
  }
  if (password != passwordrepeat) {
    invalid = true;
  }
  if (invalid) {
    this.errorMessage = true;
    this.password = '';
    this.passwordrepeat = '';
    return (console.log("Invalid"));
  }
  let URL = window.location.href;
  let uuid = URL.slice(URL.indexOf("=") + 1, URL.length);
  let url = this.$server + '/user/resetpw?q=' + uuid;
  let body = password;
  this.$http.post(url, body, {headers: {"Content-Type": "text/plain"}})
      .then(result => {
        this.successMessage = true;
        this.errorMessage = false;
        this.email = '';
      })
      .catch(error => {
        this.errorMessage = true;
        this.successMessage = false;
      })
}
// @ is an alias to /src
import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import Brand from "@/components/Brand";

export default {
  name: 'ResetPassword',
  components: {
    Brand,
    Navbar,
    LoginModal,
    RegisterModal,
  },
  methods: {
    updatePassword,
  },
  data: function () {
    return {
      uuid: '',
      successMessage: false,
      errorMessage: false,
      password: '',
      passwordrepeat: '',
    }
  }
};
</script>
<style></style>