<template>
  <div id="navbar-top" class="fixed-top navbar-theme">
    <p>NAV</p>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'Navbar',
  methods: {},
  data: function() {
    return {};
  },
};
</script>
<style>
#navbar-top {
  height: 80px;
}

.navbar-theme {
  background-color: #d1dfed;
}
</style>
