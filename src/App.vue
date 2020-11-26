<template>
  <div id="app">
    <!--
    <div id="intra-nav" class="fixed-top">
      <div class="row justify-content-end">
        <div class="col-3"><a class="nav-link">LOGIN</a></div>
      </div>
      
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      
    </div>
-->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#intra-nav {
  background: #edf8ff;
  -webkit-box-shadow: 0px -2px 10px 2px #000000;
  box-shadow: 0px -2px 10px 2px #000000;
  height: 60px;
  /*
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;*/
}

.nav-link,
.nav-link:visited {
  font-size: 20px;
  color: #404040;
  margin-top: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.2s;
}
.nav-link:hover {
  color: #6e6e6e;
  cursor: pointer;
  text-decoration: none;
  filter: brightness(125%);
  transition: 0.2s;
}

#nav {
  /*padding: 30px;*/
}

#nav a {
  /*
  font-weight: bold;
  color: #2c3e50;*/
}

#nav a.router-link-exact-active {
  /*color: #42b983;*/
}
</style>
