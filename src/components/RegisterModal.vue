<template>
  <!-- Modal -->
  <div class="modal fade" id="registermodal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content cute-borders">
        <div class="modal-header bg-success text-center">
          <h5 class="modal-title d-inline-block" id="registerModalLabel">
            Register
          </h5>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="usernameInputReg">Username*</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="usernameInputReg"
              placeholder="username"
            />
          </div>
          <div class="form-group">
            <label for="emailInputReg">Email*</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="emailInputReg"
              placeholder="name@email.com"
            />
          </div>
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
        </div>
        <div class="modal-footer">
          <button
            type="button"
            id="closeRegisterModal"
            class="btn moda-close-btn btn-secondary"
            data-dismiss="modal"
            v-on:click="closeModal()"
          >
            Close
          </button>
        </div>
        <div id="registerFailedMessage" v-if="registerFailed" class="mx-1 py-2 alert alert-danger">
          Register failed
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Welcome from '@/views/Welcome';
import router from '@/router';

let closeModal = function(){
  this.registerFailed = false;
  this.username = '';
  this.password = '';
  this.email = '';
  this.passwordrepeat = '';
}

function emptyFields(ids) {
  for (let id of ids) {
    document.querySelector('#' + id).value = '';
  }
}

function invalidate(id) {
  document.querySelector('#' + id).classList.add('invalid-input');
}

function clearInvalid() {
  document.querySelector('#usernameInputReg').classList.remove('invalid-input');
  document.querySelector('#emailInputReg').classList.remove('invalid-input');
  document.querySelector('#passwordInputReg').classList.remove('invalid-input');
  document
    .querySelector('#passwordInputRepeatReg')
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
    invalidate('usernameInputReg');
    invalid = true;
  }
  if (!validateEmail(email)) {
    invalidate('emailInputReg');
    invalid = true;
  }
  if (password === '') {
    invalidate('passwordInputReg');
    invalid = true;
  }
  if (password != passwordrepeat) {
    invalidate('passwordInputRepeatReg');
    invalid = true;
  }
  let url = 'http://localhost:8080/user/create';
  let body = {
    username,
    email,
    password,
  };

  this.$http.post(url, body).then((response) => {
    console.log(response.data);
    emptyFields([
      'usernameInputReg',
      'emailInputReg',
      'passwordInputReg',
      'passwordInputRepeatReg',
    ]);
    const id = response.data;

        this.$http
            .post('http://localhost:8080/user/login', {
              username,
              password,
            })
            .then((response) => {
              if (response.status == '200') {
                let token = response.data;
                localStorage.setItem('user-token', token);
                this.$token = token;
                this.$http.defaults.headers.common['Authorization'] =
                    'Bearer ' + token;
                document.getElementById('closeRegisterModal').click();
                console.log('Login success');
                window.location.href = 'http://localhost:8081/#/welcome';
                location.reload();
              }
            });
      })
      .catch(error => {
        this.registerFailed = true;
      })
  ;
};

export default {
  name: 'RegisterModal',
  methods: {
    register,
    closeModal
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
      registerFailed: false
    };
  },
};
</script>
<style>
#registerModalLabel {
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
