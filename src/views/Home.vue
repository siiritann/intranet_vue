<template>
  <div class="home">
    <Welcomepage msg="Welcome to Intranet" />
  </div>
</template>

<script>
// @ is an alias to /src
import Welcomepage from '@/components/Home.vue';

export default {
  name: 'Home',
  components: {
    Welcomepage,
  },
};
</script>
<style>
.home {
  height: 100vh;
  background: rgb(85, 148, 247);
  background: -moz-linear-gradient(
    180deg,
    rgba(85, 148, 247, 1) 0%,
    rgba(171, 133, 255, 1) 0%,
    rgba(130, 18, 233, 1) 100%
  );
  background: -webkit-linear-gradient(
    180deg,
    rgba(85, 148, 247, 1) 0%,
    rgba(171, 133, 255, 1) 0%,
    rgba(130, 18, 233, 1) 100%
  );
  background: linear-gradient(
    180deg,
    rgba(85, 148, 247, 1) 0%,
    rgba(171, 133, 255, 1) 0%,
    rgba(130, 18, 233, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#5594f7",endColorstr="#8212e9",GradientType=1);
}

.hello {
  color: #fff;
  font-weight: 500;
  padding-top: 10vh;
}

.user-creation-card {
  background: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 10px 2px #000000;
  box-shadow: 0px 0px 10px 2px #000000;
}
</style>
