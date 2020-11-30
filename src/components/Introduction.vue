<template>
  <div class="hello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ msg }}</h1>

    <div class="create-user-div row justify-content-center mx-3">
      <div class="col-lg-3 col-md-4 col-sm-6 user-creation-card p-3">
        <h3>Login</h3>
        <div class="form-group">
          <label for="usernameinput">Username</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="usernameinput2"
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
            id="passwordinput2"
            required
          />
        </div>
        <div class="py-3">
          <button
            id="createuser2"
            type="submit"
            v-on:click="login(username, password)"
            class="btn btn-outline-primary shadow-sm btn-lg"
          >
            Login
          </button>
        </div>
        <div><a href="/#/register" class="default-link">Register</a></div>
      </div>
    </div>
  </div>
</template>

<script>
let redirect = function() {
  //this.$http.post('/welcome');
};

let login = function(username, password) {
  console.log(username);
  console.log(password);
  let url = 'http://localhost:8080/user/login';
  let body = {
    username,
    password,
  };

  this.$http.post(url, body).then((response) => {
    if (response.status == '200') {
      let token = response.data;
      localStorage.setItem('user-token', token);
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      console.log('Login success');
    }
  });
};

export default {
  name: 'Introduction',
  methods: {
    login,
  },
  props: {
    msg: String,
  },
  data: function() {
    return {
      username: '',
      password: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
