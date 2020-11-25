<template>
  <div class="hello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ msg }}</h1>

    <div class="create-user-div row justify-content-center mx-3">
      <div class="col-lg-3 col-md-4 col-sm-6 user-creation-card p-3">
        <h3>Login</h3>
        <div class="form-group">
          <label for="emailinput">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="emailinput"
            placeholder="name@email.com"
            aria-describedby="emailHelp"
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
            v-on:click="login(email, password)"
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
console.log('hey');

let testFunction = function(username, email, password) {
  console.log(username);
  console.log(email);
  console.log(password);
};

let login = function(username, email, password) {
  console.log(username);
  console.log(email);
  console.log(password);
  //console.log(this.email);
  let url = 'http://localhost:8080/createuser';
  let body = {
    username,
    email,
    password,
  };

  this.$http.post(url, body).then((response) => {
    console.log(response.data);
  });
};

export default {
  name: 'LoginSection',
  methods: {
    testFunction,
    login,
  },
  props: {
    msg: String,
  },
  data: function() {
    return {
      user: {},
      username: '',
      password: '',
      email: '',
      /*
      email: '',
      resultList: [],
      a: 5,
      b: 1,*/
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
