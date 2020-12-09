<template>
  <div class="registerhello text-center mb-3">
    <div>
      <Brand/>
      <Navbar />
      <LoginModal />
      <RegisterModal />
    </div>
    <div class="home">
      <div class="registerhello text-center">
        <h1 class="main-heading display-3 pt-5 mb-5">Forgot your password?</h1>
        <div class="create-user-div row justify-content-center mx-3">
          <div class="col-lg-6 col-md-8 col-sm-10 user-creation-card p-3 mx-0 px-5">
            <div>
              <div class="py-2">
                <p>
                  Don't worry.
                  Happens to the best. Just insert your e-mail to the following
                  field and we will send you the recovery link.</p>
                <div class="mx-5">
                  <input
                      v-model="email"
                      type="email"
                      class="form-control"
                      placeholder="Insert your e-mail here"/>
                </div>
              </div>
              <div class="py-3">
                <button
                    type="submit"
                    v-on:click="sendEmail(email)"
                    class="btn btn-outline-primary shadow-sm ">
                  Send recovery link
                </button>
              </div>
              <div id="emailErrorMessage" v-if="errorMessage" class="mx-1 py-2 alert alert-danger">
                Such e-mail is not found.
              </div>
              <div id="emailSuccessMessage" v-if="successMessage" class="mx-1 py-2 alert alert-success">
                Recovery link is sent to your e-mail.
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

let sendEmail = function (email) {
  let url = this.$server + '/user/forgotpw?email=' + email;

  this.$http.post(url)
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
  name: 'ForgotPassword',
  components: {
    Brand,
    Navbar,
    LoginModal,
    RegisterModal,
  },
  methods: {
    sendEmail
  },
  data: function () {
    return {
      successMessage: false,
      errorMessage: false,
      email: ''
    }
  }
};
</script>
<style></style>
