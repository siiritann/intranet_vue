<template>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ msg }}</h1>

    <div class="create-user-div row justify-content-center mx-3">
      <div class="col-lg-3 col-md-4 col-sm-6 user-creation-card p-3">
        <div class="form-group">
          <label for="emailinput">Username*</label>
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
          <label for="emailinput">Email*</label>
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
        <div class="form-group">
          <label for="passwordinputrepeat">Repeat Password*</label>
          <input
            v-model="passwordrepeat"
            type="password"
            class="form-control"
            id="passwordinputrepeat"
            required
          />
        </div>
        <div class="py-3">
          <button
            id="createuser"
            type="submit"
            v-on:click="register(username, email, password, passwordrepeat)"
            class="btn btn-outline-primary shadow-sm btn-lg"
          >
            Register
          </button>
        </div>
        <div><a href="/#/" class="default-link">Already a member?</a></div>
      </div>
    </div>
  </div>
</template>

<script>
function emptyFields(ids) {
  for (let id of ids) {
    document.querySelector('#' + id).value = '';
  }
}
function invalidate(id) {
  document.querySelector('#' + id).classList.add('invalid-input');
}
function clearInvalid() {
  document.querySelector('#usernameinput').classList.remove('invalid-input');
  document.querySelector('#emailinput').classList.remove('invalid-input');
  document.querySelector('#passwordinput').classList.remove('invalid-input');
  document
    .querySelector('#passwordinputrepeat')
    .classList.remove('invalid-input');
}
/* CHECK VALIDITY OF EMAIL */
function validateEmail(email) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return true;
  }
  return false;
}

let register = function(username, email, password, passwordrepeat) {
  clearInvalid();
  let invalid = false;
  if (username === '') {
    console.log('username empty');
    invalidate('usernameinput');
    invalid = true;
  }
  if (!validateEmail(email)) {
    console.log('invalid email');
    invalidate('emailinput');
    invalid = true;
  }
  if (password === '') {
    console.log('password empty');
    invalidate('passwordinput');
    invalid = true;
  }
  if (password != passwordrepeat) {
    console.log("password's don't match");
    invalidate('passwordinputrepeat');
    invalid = true;
  }
  if (invalid) {
    return console.log('Inavlid');
  }
  console.log('Valid');
  //console.log(this.email);
  let url = 'http://localhost:8080/createuser';
  let body = {
    username,
    email,
    password,
  };

  this.$http.post(url, body).then((response) => {
    console.log(response.data);
    emptyFields([
      'usernameinput',
      'emailinput',
      'passwordinput',
      'passwordinputrepeat',
    ]);
  });
};

export default {
  name: 'RegisterSection',
  methods: {
    register,
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
      passwordrepeat: '',
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
