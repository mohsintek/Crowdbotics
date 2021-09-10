<template>
  <div>
    <Header />

    <div class="dashboardapp">
      <div class="dashboard-main">
        <router-link to="/create-app">
          <div class="dashboard-app">
            <img src="../../assets/rocket-solid.svg" />
            <i class="fal fa-rocket-launch" aria-hidden="true"></i>
            <div class="dashboard-deploy">
              <h3>Create an App</h3>
              <span
                ><a>Scaffold and deploy</a> a working app in just a few
                minutes.</span
              >
            </div>
          </div>
        </router-link>
      </div>
      <div>
        <h3 class="list">Apps List</h3>
        <div class="search-wrapper">
          <div class="search">
            <b-icon icon="search" class="search-icone"></b-icon>
            <b-form-input
              type="search"
              placeholder="search..."
              v-model="search"
            >
            </b-form-input>
          </div>
          <div>
            <b-form-select v-model="selected" :options="options"></b-form-select>
          </div>
        </div>

        <div
          class="app-list"
          v-for="(apps, index) in getAllApps"
          v-bind:key="index"
        >
          <div>
            <!-- <img :src="" alt="" /> -->
          </div>
          <div class="upgrade">
            {{ apps.name }}
            <p>{{ apps.type }} / {{ apps.framework }}</p>
          </div>
          <div class="upgrade">
            Community
          </div>
          <div class="upgrade">
            <b-button
              v-b-modal.modal-scrollable
              variant="danger"
              @click="getAppName(apps.name, apps.type, apps.id)"
              >Upgrade</b-button
            >
          </div>
          <div class="upgrade">
            <b-button variant="danger" @click="deleteHandler(apps.id)"
              >Delete</b-button
            >
          </div>
        </div>
        <div>
          <div>
            <b-modal id="modal-multi-3" size="sm" title="Payment Method">
              <b-form-input
                type="text"
                placeholder="Card number"
              ></b-form-input>
              <div class="add-card">
                <b-button variant="primary">Add Card</b-button>
              </div>
            </b-modal>
          </div>
          <div>
            <div class="modal_content_item">
              <b-modal id="modal-center" centered title="Confirm purchase"  ref="myModalRef">
                <p class="my-4">
                  Review and confirm your recurring monthly subscription:
                </p>
                <div class="modal-content-item">
                  <div>
                    <h5>{{ plan }} Subscription</h5>
                    <p>app</p>
                    <span>Web</span>
                  </div>
                  <div>
                    <p>${{ price }}</p>
                    <span>per month</span>
                  </div>
                </div>
                <div class="payment-method">
                  <h6>Payment Method</h6>
                  <a href="#" v-b-modal.modal-multi-3>add Payment method</a>
                </div>
                <p class="agreement">
                  By clicking confirm, you're agreeing to the Crowdbotics
                  <a href="/terms" target="_blank">payment terms and agreement.</a>
                </p>
                <div class="modal-btn">
                  <b-button variant="primary" @click="getSubscription()"
                  bvModalEvent.trigger = 'cancel()'  >confirm</b-button
                  >
                </div>
              </b-modal>
            </div>
          </div>
          <!-- Plan purchase modal -->
          <b-modal
            id="modal-scrollable"
            scrollable
            title="Change Plan"
            class="appmodal"
          >
          <h3 v-if="message" style="color:red">Subscription Already exist</h3>
            <h5>{{ appName }}</h5>
            <p>{{ appType }}</p>
            <b-container class="bv-example-row">
              <b-row>
                <b-col
                  class=" pro"
                  v-for="plan in allPlan"
                  :key="plan.id"
                >
                  <h3>{{ plan.description }}</h3>
                  <p>${{ plan.price }} per month</p>
                  <ul>
                    <li v-for="i in Comunityplan" :key="i">
                      <img src="../../assets/check.png" alt="" />{{ i }}
                    </li>
                  </ul>
                  <b-button
                    variant="primary"
                    v-b-modal.modal-center
                    @click="getPlan(plan.description, plan.price, plan.id)"
                    >Select</b-button
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../Header/Header.vue";
import { mapActions } from "vuex";
import dicon from "../../assets/django.png";
import reacticon from "../../assets/react-brands.png";
export default {
  name: "Dashboard",
  components: {
    Header,
  },
  data() {
    return {
       selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'Web', text: 'Web' },
          { value: 'Mobile', text: 'Mobile' },
          
          
        ],
      message: false,
      error: '',
      plan: "",
      price: "",
      appName: "",
      appType: "",
      reactIcon: reacticon,
      dIcon: dicon,
      subscription: {
        plan: null,
        app: null,
        active: false,
      },
      search: "",
      Comunityplan: [
        "Create and launch unlimited applications",
        "GitHub integration",
        "Free web app hosting with Crowdbotics domain",
        "PostgreSQL storage with up to 1000 rows of data",
        "Application hosting on Heroku",
        "Community forum support'",
      ],
    };
  },
  computed: {
    appLists() {
      if (this.search) {
        return this.$store.state.apps.filter((app) => {
          return app.name.startsWith(this.search);
        });
      } else if (this.selected) {
        return this.$store.state.apps.filter((app) => {
          return app.type.startsWith(this.selected);
        });
      } else {
        return this.$store.state.apps;
      }
      
    },
    errorMessage(){
        return this.$store.state.error
      },
    getAllApps() {
      return this.appLists;
    },
    allPlan() {
      return this.$store.state.plan;
    },
    allsubscription() {
      return this.$store.state.subscription.filter(appsub=>{
          return appsub.app === this.subscription.app
        })
    },
  },
  methods: {
    ...mapActions(["deleteApp"]),
    ...mapActions(["purchasePlan"]),
    ...mapActions(["getcreatedapps"]),
    ...mapActions(["planById"]),
    ...mapActions(["subscriptions"]),
    ...mapActions(["getSubscriptions"]),
    deleteHandler(id) {
      this.deleteApp(id);
    },
    getAppName(appNAme, apptype, appid) {
      
      this.appName = appNAme;
      this.appType = apptype;
      this.subscription.app = appid;
    },
    getApp() {
      this.getcreatedapps();
    },
    getPlan(plan, price, id) {
      this.plan = plan;
      this.price = price;
      this.subscription.plan = id;
      
      
      this.purchasePlan();
      this.getPlanByid(id);
    },
    getPlanByid(id) {
     
      this.planById(id);
    },
    getSubscription() {
      this.subscriptions(this.subscription);
      this.subscription.active = true;
      this.$refs.myModalRef.hide();
    },
  },
  mounted() {
    this.getApp();
    this.getSubscriptions();
  },
};
</script>
<style scoped lang=css>
@import "./style.css";

/*  */

.search-wrapper {
  display: flex;
}
.dashboardapp {
  padding: 60px;
  background: #e5e5e5;
}
.search {
  width: 50%;
  margin-bottom: 15px;
  display: flex;
  border: 1px solid gray;
  border-radius: 4px;
}
.search.form-control {
  border-radius: 0px;
}
.upgrade {
  width: 25%;
}
.list{
  text-align: left;
  margin: 13px 1px;
}

.search-icone {
   
       width: 37px !important;
    height: 24px;
    overflow: hidden;
    width: 992px;
    margin-top: 6px;
    color: #1890ff;
   
}
.custom-select {
    width: 100%;
    padding: 9px;
    border-radius: 7px;
    margin-left: 59px;
    outline: none;
    background: white;
    color: gray;
}
.pro {
  border: 1px solid gray;
  border-radius: 4px;
  margin: 4px;
  text-align: initial;
  cursor: pointer;
  padding: 24px 12px;
  position: relative;
  height: auto;
  padding-bottom: 70px;
}
.active {
  border: 1px solid red;
  border-radius: 4px;
  margin: 4px;
  text-align: initial;
  cursor: pointer;
  padding: 24px 12px;
  position: relative;
  height: auto;
  padding-bottom: 70px;
}

#modal-scrollable {
  /* max-height: 100%; */
  overflow: hidden;
  width: 992px;
  right: 142px;
}
ul {
  list-style-type: none;
}
.app-list {
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 15px;
}
.dashboard-main a {
  text-decoration: none;
}
.dashboard-main {
  width: 260px;
  background: white;
  border-radius: 5px;
  padding: 30px;
}
.dashboard-app {
  display: flex;
  align-items: self-start;
}
.dashboard-deploy {
  text-align: initial;
  width: 123px;
  padding-left: 12px;
}
.dashboard-deploy h3 {
  color: #2c3e50;
}
.dashboard-deploy span {
  color: #2c3e50;
}
.dashboard-deploy span a {
  color: #1890ff;
}

img {
  width: 50px;
}
li {
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  align-items: end;
}
ul li img {
  width: 14px;
  padding-top: 3px;
  margin-right: 10px;
}
</style>
