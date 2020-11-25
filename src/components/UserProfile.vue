// this is a copy of RegisterSection.vue
<template>
  <div class="registerhello text-center">
    <h1 class="main-heading display-3 pt-5 mb-5">{{ msg }}</h1>
    <div class="create-user-div row justify-content-center mx-3">
      <div class="col-lg-3 col-md-4 col-sm-6 user-creation-card p-3">
        <div>
        <h3 id="clientId">Your clientId is {{this.$route.params.id}} </h3>
       <h4>This is your profile</h4>
          <table id="profileTable" border="1" style="margin-left: auto; margin-right: auto">
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// TODO 1 - GET THIS USER PROFILE

fetch('http://localhost:8080/user/view/2/'/* + clientId*/)
    .then(result => result.json())
    .then(
        function (user) {
          console.log(user);
          let profileTable = document.getElementById("profileTable");
          for (let i = 0; i < user.length; i++) {
            let newRow = document.createElement("tr");
            let newCell1 = document.createElement("td");
            newCell1.innerText = user[i].username;
            newRow.append(newCell1);
            // let newCell2 = document.createElement("td");
            // newCell2.innerText = user[i].first;
            // newRow.append(newCell2);
            // let newCell3 = document.createElement("td");
            // newCell3.innerText = user[i].balance;
            // newRow.append(newCell3);
            // let newCell4 = document.createElement("td");
            // newCell4.innerText = user[i].clientId;
            // newRow.append(newCell4);
            profileTable.append(newRow);
          }
        }
    );


export default {
  name: 'UserProfile',
  methods: {
  },
  props: {
    msg: String,
  },
  data: function() {
    return {
      resultList: []
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
