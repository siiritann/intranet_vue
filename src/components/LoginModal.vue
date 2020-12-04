<template>
  <!-- Modal -->
  <div class="modal fade" id="loginmodal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content cute-borders">
        <div class="modal-header bg-brand-theme text-center">
          <h5 class="modal-title d-inline-block" id="loginModalLabel">
            Login
          </h5>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="usernameinput">Username</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="usernameinput"
              placeholder="username"
              aria-describedby="usernameHelp"
              required
            />
          </div>
          <div class="form-group">
            <label for="passwordinput">Password*</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="passwordinput"
              required
            />
          </div>
          <div class="py-3">
            <button
              id="createuser"
              type="submit"
              v-on:click="login(username, password)"
              class="btn btn-outline-primary shadow-sm btn-lg"
            >
              Login
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            id="closeLoginModal"
            class="btn moda-close-btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

let login = function(username, password) {
  let url = this.$server + 'user/login';
  let body = {
    username,
    password,
  };

  this.$http.post(url, body).then((response) => {
    if (response.status == '200') {
      let token = response.data;
      localStorage.setItem('user-token', token);
      this.$token = token;
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      console.log(this.$http.defaults.headers.common['Authorization']);
      document.getElementById('closeLoginModal').click();
      router.push({ name: 'Welcome' });
    }
  });
};

export default {
  name: 'LoginModal',
  methods: {
    login,
  },
  data: function() {
    return {
      username: '',
      password: '',
    };
  },
};
</script>
<style>
#loginModalLabel {
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  color: #fff;
}
.form-group {
  padding-left: 10%;
  padding-right: 10%;
}
.modal-header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.moda-close-btn {
  margin-right: 50%;
  transform: translateX(50%);
}
</style>
