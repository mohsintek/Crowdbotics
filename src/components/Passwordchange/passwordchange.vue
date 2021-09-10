<template>
<div class="dashboard">
    <div class="dashboard-content"><img src="https://delgnnnzzjz4p.cloudfront.net/20210827.1/img/cb-login-logo.png" width="200">
    <p>crowdboticsdashboard</p>
    <p>Build Application. Fast.</p>
    <p>Crowdbotics is the easiest way to build software applications, trusted by hundreds of teams. Sign up to start building your application.</p>
    </div>
    <div class="log_in">
  <div class="create-account">
    <div>Enter you new password</div>

     <b-form-group
    class="label"
      label="New password"
      label-for="input-formatter"
    >
      <b-form-input
      type="password"
        id="input-formatter"
        v-model='user.new_password1'
        required
        placeholder="Enter New Password"
        
      ></b-form-input>
     </b-form-group>
      <b-form-group
    class="label"
      label="Confirm New Password"
      label-for="input-formatters"
    >
      <b-form-input
      type="password"
        id="input-formatters"
        v-model='user.new_password2'
        required
        placeholder="Confirm new password"
        
      ></b-form-input>
    </b-form-group>

   
  </div>
  <div>
  
  </div>
  
     <b-button variant="danger" @click="handlesubmit()">Save</b-button>
    

    </div>
  </div>
</template>


<script>
import {  mapActions,  } from 'vuex'
export default {
     name: 'Newpassword',
     data:()=>{
         return{
            user:{
              new_password1:'',
              new_password2:''
            }
         }
          
     },
     computed:{
       getAuthkey() {
         return this.$store.state.users
       }
     },
     methods:{
      ...mapActions(['newpassword']),
      handlesubmit() {
        this.newpassword(this.user, this.getAuthkey)
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
    .dashboard .log_in p a{
    text-decoration: none;
    }
</style>