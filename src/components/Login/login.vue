<template>
<div class="dashboard">
    <div class="dashboard-content"><img src="https://delgnnnzzjz4p.cloudfront.net/20210827.1/img/cb-login-logo.png" width="200">
    <p>crowdboticsdashboard</p>
    <p>Build Application. Fast.</p>
    <p>Crowdbotics is the easiest way to build software applications, trusted by hundreds of teams. Sign up to start building your application.</p>
    </div>
    <div class="log_in">
  <div class="create-account">
    <h3>Login to Dashboard</h3>
    <p>{{showerrorMessage}}</p>
    <b-form-group
    class="label"
      label="username"
      label-for="input-formatters"
      
    >
      <b-form-input
      type="text"
      required
        id="input-formatters"
        v-model='user.username'
        placeholder="username"
        
      ></b-form-input>
    </b-form-group>

     <b-form-group
    class="label"
      label="Email"
      label-for="input-formatter"
    >
      <b-form-input
      type="email"
        id="input-formatter"
        v-model='user.email'
        required
        placeholder="yourcompany@company.com"
        
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Password"
      label-for="input-lazy1"
      class="mb-0"
    >
      <b-form-input
      type="password"
      required
      v-model='user.password'
        id="input-lazy1"
        placeholder="Password"
        
      ></b-form-input>
    </b-form-group>
  </div>
  <div>
    <router-link to="/reset">
    Forgot Password
    </router-link>
  </div>
 
     <b-button variant="danger" @click="handlesubmit()">Login</b-button>
    
    <p>Dont have an account?<router-link to="/signup">Register</router-link></p>
    </div>
  </div>
</template>


<script>
import {  mapActions} from 'vuex'
export default {
     name: 'Login',
     data:()=>{
         return{
            user:{
              
              username:'',
              email:'',
              password: ''
            }
         }
          
     },
     computed:{
       showerrorMessage() {
         return this.$store.getters.errorMessage
       }
     },
     methods:{
      ...mapActions(['login']),
      ...mapActions([ 'verifyemail']),
      handlesubmit() {
        
        this.login(this.user)
        this.verifyemail(this.$store.getters.isAuthenticated)
        this.user= ''
        

      }
    }
}
</script>

<style scoped>
    .dashboard{
      padding: 60px;
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        max-width: 920px;
        margin: 0 auto;
    }
    .dashboard .dashboard-content{
            width: 40%;
    padding: 40px;
    background: #1e0a45;
    color: white;
    }
    .dashboard .log_in{
            width: 60%;
    padding: 40px;
    background: white;
    }
    .dashboard .log_in .custom-control.custom-checkbox{
            text-align: left;
    font-size: 14px;
    display: flex;
    align-items: center;
    }
      label.custom-control-label{
                padding-left: 10px;
    }
     .dashboard .log_in .create-account .form-group{
        margin-bottom: 20px !important;
        text-align: initial;
    }
    .dashboard .log_in .create-account .custom-control.custom-checkbox {
    text-align: initial;
    }
    .dashboard .log_in button{
        width: 200px;
    border-radius: 18px;
    background: #ea5f57;
    border: none;
    outline: none;
    padding: 8px 0px;
    color: white;
    margin: 15px 0px;
    }
    .dashboard .log_in p{
    color: #838383;
    }
    a{
      text-decoration: none;

    }
</style>