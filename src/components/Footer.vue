<template>
  <div>
    <div id="footer" class="pt-3">
      <div class="row justify-content-center mb-1">
        <div class="col-12 col-sm-3">
          <p class="mb-0">Siiri Tann</p>
          <p class="mb-1">siiri.tann@gmail.com</p>
        </div>
        <div class="col-12 col-sm-3">
          <p class="mb-0">Ott Kask</p>
          <p class="mb-1">ott.kask@gmail.com</p>
        </div>
        <div class="col-12 col-sm-3">
          <p class="mb-0">Saskia Rohtla</p>
          <p class="mb-1">saskia.rohtla@gmail.com</p>
        </div>
      </div>
      <div>
        <p class="mb-0 pb-2">
          Copyright &copy; <span id="year">{{ year }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data: function() {
    return {
      isTrue: false,
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style>
#footer {
  width: 100%;
  background-color: #292e2b;
  -webkit-box-shadow: 0px 3px 15px 2px #000000;
  box-shadow: 0px 3px 15px 2px #000000;
  color: #fff;
}
</style>
