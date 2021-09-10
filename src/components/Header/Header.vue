<template>

<div class="dashboard-header">
  <header>
    Dashboard
  </header>
  <div  @click="logOutHandler()">

<img  src="../../assets/logout.svg"/>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
name: 'Header',
methods:{
  ...mapActions(["logOut"]),
  logOutHandler(){
    this.logOut()

  },
},
}
</script>

<style scoped>
 .dashboard-header {
   display: flex;
   color: aliceblue;
    justify-content: space-between;
    background: #9a6cf5;
    width: 100%;
    height: 70px;
    padding: 25px;
   
}
img {
  cursor: pointer;
    height: 22px;
    width: 26px;
}
</style>