<template>
  <div id="navbar-top" class="fixed-top navbar-theme">
    <a class="brand d-none d-sm-block">intraNet</a>
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
    <a
      v-if="this.$token == null"
      data-toggle="modal"
      data-target="#loginmodal"
      class="nav-login d-none d-sm-block"
      >Login</a
    >
    <a
      v-if="this.$token == null"
      data-toggle="modal"
      data-target="#registermodal"
      class="nav-register d-none d-sm-block"
      >Register</a
    >
    <router-link
      to="/logout"
      v-if="this.$token != null"
      class="nav-login d-none d-sm-block"
      >Logout</router-link
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
        <a data-toggle="modal" data-target="#loginmodal" class="nav-login-side"
          >Register</a
        >
      </div>
      <div v-if="this.$token == null">
        <a data-toggle="modal" data-target="#loginmodal" class="nav-login-side"
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
      <div v-if="this.$token != null" class="mt-1">
        <router-link to="/logout" class="nav-login-side">Logout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';

let token = localStorage.getItem('user-token');
const toggleSideNav = () => {
  document.querySelector('#side-nav').classList.toggle('side-nav-open');
};

export default {
  name: 'Navbar',
  methods: {
    toggleSideNav,
  },
  props: {
    token,
  },
  data: function() {
    return {};
  },
  mounted() {
    console.log('token', this.$token);
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
.nav-login-side {
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
.nav-login-side:visited {
  color: #6e6e6e;
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
