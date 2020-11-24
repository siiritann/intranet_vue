<template>
  <div class="hello text-center">
    <h1 class="main-heading display-3 pt-5">{{ msg }}</h1>

    <div class="create-user-div row justify-content-center">
      <div class="col-4 user-creation-card p-3">
        <p style="color:black">TEST USER CREATION FORM</p>
        <div class="form-group">
          <label for="emailinput">Username</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="usernameinput"
            placeholder="Username"
            aria-describedby="usernameHelp"
          />
        </div>
        <div class="form-group">
          <label for="emailinput">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="emailinput"
            placeholder="Email"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="form-group">
          <label for="passwordinput">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="passwordinput"
          />
        </div>
        <div class="py-3">
          <button
            id="createuser"
            type="submit"
            v-on:click="postFunction(username, email, password)"
            class="btn btn-primary"
          >
            Submit
          </button>
        </div>
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

let postFunction = function(username, email, password) {
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

/*
let registerFunction = function() {
  this.$http
    .get('http://localhost:8080/test/register', {
      params: {
        email: this.email,
      },
    })
    .then((response) => {
      this.resultList = response.data;
    });
  this.email = 'asd';
};*/

export default {
  name: 'Welcomepage',
  methods: {
    testFunction,
    postFunction,
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
