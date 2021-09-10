<template>
  <div class="dashboard">
    <div class="dashboard-content">
      <img
        src="https://delgnnnzzjz4p.cloudfront.net/20210827.1/img/cb-login-logo.png"
        width="200"
      />
      <p>crowdboticsdashboard</p>
      <p>Build Application. Fast.</p>
      <p>
        Crowdbotics is the easiest way to build software applications, trusted
        by hundreds of teams. Sign up to start building your application.
      </p>
    </div>
    <div class="log_in">
      <div class="create-account">
        <h3>Create account</h3>
        <b-form-group class="label" label="Name" label-for="input-formatters">
          <b-form-input
            type="text"
            id="input-formatters"
            v-model="user.name"
            placeholder="Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Email" label-for="input-lazy1" class="mb-0">
          <b-form-input
            type="email"
            v-model="user.email"
            id="input-lazy1"
            placeholder="yourcompany@company.com"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="input-lazy" class="mb-0">
          <b-form-input
            type="password"
            v-model="user.password"
            id="input-lazy"
            placeholder="Password"
          ></b-form-input>
        </b-form-group>
      </div>
     
      <b-button variant="danger" @click="handlesubmit()">Sign Up</b-button>
      <p>Already have an account?<router-link to="/">Login</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Registration",
  data: () => {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      key: {
        key: localStorage.getItem("accessToken"),
      },
    };
  },
  computed: {
    veryEmailkey() {
      return this.$store.getters.users;
    },
  },
  methods: {
    ...mapActions(["register"]),

    handlesubmit() {
      this.register(this.user);
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 60px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
}
.dashboard .dashboard-content {
  width: 40%;
  padding: 40px;
  background: #1e0a45;
  color: white;
}
.dashboard .log_in {
  width: 60%;
  padding: 40px;
  background: white;
}
.dashboard .log_in .custom-control.custom-checkbox {
  text-align: left;
  font-size: 14px;
  display: flex;
  align-items: center;
}
label.custom-control-label {
  padding-left: 10px;
}
.dashboard .log_in .create-account .form-group {
  margin-bottom: 20px !important;
  text-align: initial;
}
.dashboard .log_in .create-account .custom-control.custom-checkbox {
  text-align: initial;
}
.dashboard .log_in button {
  width: 200px;
  border-radius: 18px;
  background: #ea5f57;
  border: none;
  outline: none;
  padding: 8px 0px;
  color: white;
  margin: 15px 0px;
}
.dashboard .log_in p {
  color: #838383;
}
.dashboard .log_in p a {
  text-decoration: none;
}
</style>
