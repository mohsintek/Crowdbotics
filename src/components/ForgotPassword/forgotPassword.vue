<template>
<div class="dashboard">
   <div class="dashboard-content"><img src="https://delgnnnzzjz4p.cloudfront.net/20210827.1/img/cb-login-logo.png" width="200">
    <p>crowdboticsdashboard</p>
    <p>Build Application. Fast.</p>
    <p>Crowdbotics is the easiest way to build software applications, trusted by hundreds of teams. Sign up to start building your application.</p>
    </div>
    <div class="log_in">
  <div class="create-account">
    <div>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</div>
    <p>{{showerrorMessage}}</p>

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
  </div>
  <div>
  
  </div>
  <router-link to="/">
  <b-icon icon="arrow-left"></b-icon>Go back to login
   </router-link>
     <b-button variant="danger" @click="handlesubmit()">Reset Password</b-button>
    </div>
  </div>
</template>


<script>
import {  mapActions,  } from 'vuex'
export default {
     name: 'Forgotpassword',
     data:()=>{
         return{
            user:{
              email:'',
            }
         }
          
     },
     computed:{
       showerrorMessage() {
         return this.$store.getters.errorMessage
       }
     },
     methods:{
      ...mapActions(['reset']),
      handlesubmit() {
        this.reset(this.user)
        this.user= ''

      }
    }
}
</script>

<style scoped>
    .dashboard{
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