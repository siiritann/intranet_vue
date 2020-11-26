<template>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ msg }}</h1>
    <div class="create-user-div row justify-content-center mx-3">
      <div class="col-lg-3 col-md-4 col-sm-6 user-creation-card p-3">
        <div>
          <h3 id="clientId">Your clientId is {{ this.$route.params.id }} </h3>
          <h4>This is your profile</h4>
          <table id="profileTable" border="1" style="margin-left: auto; margin-right: auto">
            <tr>
              <th> Username </th>
              <th> Password </th>
              <th> Email </th>
            </tr>
            <tr>
              <td>{{ resultList.username }}</td>
              <td>{{ resultList.password }}</td>
              <td>{{ resultList.email }}</td>
            </tr>
          </table >
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// TODO 1 - GET THIS USER PROFILE

function getUserInfo() {
  fetch('http://localhost:8080/user/view/' + this.$route.params.id)
      .then(result => result.json())
      .then((user) => {
            console.log(user);
            this.resultList = user;
        });
}

export default {
  name: 'UserProfile',
  methods: {
    getUserInfo
  },
  props: {
    msg: String,
  },
  data: function () {
    return {
      resultList: {}
    };
  },
  mounted: function (){
    this.getUserInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
