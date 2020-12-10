<template>
  <div class="container">
    <h1 class="display-5 my-5">{{ msg }}</h1>
    <!--Intro section 1 : Users-->
    <div class="row my-5 introduction-div">
      <div class="col-12 order-2 order-sm-1 col-sm-6">
        <img class="introduction-image" src="../assets/team.svg" alt="" />
      </div>
      <div
        class="introduction-col col-12 order-1 order-sm-2 col-sm-6 my-5 my-sm-0"
      >
        <div class="introduction-content introduction-content-users">
          <p>Join our growing community!</p>
          <button
            class="btn btn-outline-primary"
            data-toggle="modal"
            data-target="#registermodal"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
    <!--Intro section 2 : Account -->
    <div class="row my-5 introduction-div">
      <div class="col-12 col-sm-6">
        <div
          class="introduction-content introduction-content-account mb-5 mb-sm-0"
        >
          <p>Customize your account</p>
          <button
            class="btn btn-outline-primary"
            data-toggle="modal"
            data-target="#registermodal"
          >
            Join now
          </button>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <img class="introduction-image" src="../assets/mis.svg" alt="" />
      </div>
    </div>
    <!--Intro section 3 : Postings-->
    <div class="row my-5 introduction-div">
      <div class="col-12 order-2 order-sm-1 col-sm-6">
        <img class="introduction-image" src="../assets/postings.svg" alt="" />
      </div>
      <div class="col-12 order-1 order-sm-2 col-sm-6">
        <div
          class="introduction-content introduction-content-postings mb-5 mb-sm-0"
        >
          <p>Participate in posting feed!</p>
          <button
            class="btn btn-outline-primary"
            data-toggle="modal"
            data-target="#registermodal"
          >
            Find out more
          </button>
        </div>
      </div>
    </div>
    <!--Intro section 4 : Messages -->
    <div class="row my-5 introduction-div">
      <div class="col-12 col-sm-6">
        <div
          class="introduction-content introduction-content-messages mb-5 mb-sm-0"
        >
          <p>Be in touch using live messages!</p>
          <button
            class="btn btn-outline-primary"
            data-toggle="modal"
            data-target="#registermodal"
          >
            Sign up
          </button>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <img class="introduction-image" src="../assets/mis2.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
  props: {
    msg: '',
  },
};
</script>
<style>
.introduction-image {
  width: 70%;
}
.introduction-content p {
  font-size: 25px;
}
.introduction-div {
  margin-bottom: 150px !important;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
