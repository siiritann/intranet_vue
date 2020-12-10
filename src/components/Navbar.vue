<template>
  <div id="navbar-top" class="fixed-top navbar-theme">
    <router-link
      to="/welcome"
      v-if="this.$token != null"
      class="brand d-none d-sm-block"
      >intraNet</router-link
    >
    <router-link
      to="/"
      v-if="this.$token == null"
      class="brand d-none d-sm-block"
      >intraNet</router-link
    >
    <router-link
      to="/welcome"
      v-if="this.$token != null"
      class="nav-link d-none d-sm-inline-block"
      >Account</router-link
    >
    <router-link
      to="/newsfeed"
      v-if="this.$token != null"
      class="nav-link d-none d-sm-inline-block"
      >Newsfeed</router-link
    >
    <router-link
      to="/users"
      v-if="this.$token != null && isAdmin"
      class="nav-link d-none d-sm-inline-block"
      >Admin center</router-link
    >
    <a
      v-if="this.$token == null"
      data-toggle="modal"
      data-target="#loginmodal"
      class="nav-login d-none d-sm-block"
      v-on:click="clearModal()"
      >Login</a
    >
    <a
      v-if="this.$token == null"
      data-toggle="modal"
      data-target="#registermodal"
      class="nav-register d-none d-sm-block"
      v-on:click="clearModal()"
      >Register</a
    >
    <a
      v-on:click="logout()"
      v-if="this.$token != null"
      class="nav-login d-none d-sm-block"
      >Logout</a
    >
    <div
      v-on:click="toggleSideNav()"
      id="nav-hamburger-parent"
      class="d-sm-none text-center"
    >
      <div class="nav-hamburger">
        <div class="nav-hamburger-layer"></div>
        <div class="nav-hamburger-layer"></div>
        <div class="nav-hamburger-layer"></div>
      </div>
    </div>
    <div id="side-nav" class="d-sm-none">
      <div>
        <a class="brand-side">intraNet</a>
      </div>
      <div v-if="this.$token == null">
        <a
          data-toggle="modal"
          data-target="#loginmodal"
          class="nav-login-side"
          v-on:click="clearModal()"
          >Register</a
        >
      </div>
      <div v-if="this.$token == null">
        <a
          v-on:click="clearModal()"
          data-toggle="modal"
          data-target="#loginmodal"
          class="nav-login-side"
          >Login</a
        >
      </div>
      <div v-if="this.$token != null">
        <router-link to="/welcome" class="nav-link mt-1 py-0"
          >Account</router-link
        >
      </div>
      <div v-if="this.$token != null">
        <router-link to="/newsfeed" class="nav-link mt-1 py-0"
          >Newsfeed</router-link
        >
      </div>
      <div v-if="this.$token != null && isAdmin">
        <router-link to="/users" class="nav-link mt-1 py-0"
          >Admin center</router-link
        >
      </div>
      <div v-on:click="logout()" v-if="this.$token != null" class="mt-1">
        <a class="nav-login-side">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import jwt_decode from 'jwt-decode';

const clearModal = () => {
  // For LoginModal
  document.querySelector('#usernameinput').value = '';
  document.querySelector('#passwordinput').value = '';

  // For RegisterModal
  document.querySelector('#usernameInputReg').value = '';
  document.querySelector('#passwordInputReg').value = '';
  document.querySelector('#passwordInputRepeatReg').value = '';
  document.querySelector('#emailInputReg').value = '';
};

let token = localStorage.getItem('user-token');

function checkIfAdmin() {
  if (token != null) {
    this.isAdmin = jwt_decode(token).isAdmin;
  }
}

const toggleSideNav = () => {
  document.querySelector('#side-nav').classList.toggle('side-nav-open');
};

const logout = () => {
  localStorage.removeItem('user-token');
  window.location.href = this.$host + '/#/welcome';
};

export default {
  name: 'Navbar',
  methods: {
    toggleSideNav,
    logout,
    clearModal,
    checkIfAdmin,
  },
  props: {
    token,
  },
  data: function() {
    return {
      isAdmin: false,
    };
  },
  mounted() {
    console.log('token', this.$token);
    this.checkIfAdmin();
  },
};
</script>
<style>
#navbar-top {
  height: 60px;
  -webkit-box-shadow: 0px 0px 10px 2px #000000;
  box-shadow: 0px 0px 10px 2px #000000;
  position: relative;
  z-index: 1;
}

.navbar-theme {
  background-color: #fffcc4;
}

#nav-hamburger-parent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#nav-hamburger-parent:hover {
  cursor: pointer;
}

#nav-hamburger-parent:hover .nav-hamburger-layer {
  background-color: #636363;
  transition: 0.15;
}

.nav-hamburger {
  width: 35px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
.nav-hamburger-layer {
  width: 100%;
  height: 4px;
  margin-bottom: 5px;
  background-color: #252525;
  transition: 0.15;
  border-radius: 3px;
}
#side-nav {
  position: absolute;
  top: 100%;
  left: 100%;
  width: 100%;
  height: 100vh;
  transition: 0.3s;
  background: rgb(255, 252, 196);
  background: -moz-linear-gradient(
    180deg,
    rgba(255, 252, 196, 1) 0%,
    rgba(254, 250, 180, 1) 50%,
    rgba(255, 247, 95, 1) 100%
  );
  background: -webkit-linear-gradient(
    180deg,
    rgba(255, 252, 196, 1) 0%,
    rgba(254, 250, 180, 1) 50%,
    rgba(255, 247, 95, 1) 100%
  );
  background: linear-gradient(
    180deg,
    rgba(255, 252, 196, 1) 0%,
    rgba(254, 250, 180, 1) 50%,
    rgba(255, 247, 95, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fffcc4",endColorstr="#fff75f",GradientType=1);
}
.side-nav-open {
  left: 0 !important;
  transition: 0.3s;
}

.brand-side {
  text-decoration: none;
  color: #00a2ff;
  font-weight: bold;
  font-size: 26px;
  transition: 0.1s;
}
.nav-login-side,
.nav-login-side:visited {
  text-decoration: none;
  color: #404040;
  font-weight: bold;
  font-size: 22px;
  transition: 0.1s;
}

.brand-side:visited {
  color: #404040;
  text-decoration: none;
}
.brand-side:hover {
  color: #00a2ff;
  filter: brightness(110%);
  text-decoration: none;
  cursor: pointer;
  transition: 0.1s;
}
.nav-login-side:hover {
  color: #6e6e6e;
  text-decoration: none;
  cursor: pointer;
  transition: 0.1s;
}
</style>
