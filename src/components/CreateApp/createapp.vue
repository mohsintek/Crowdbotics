<template>
  <div>
    <Header />

    <div class="dashboard">
      <div class="dashboard-content">
        <h3>Create App</h3>
        <p>
          Let's start building! Choose how you want to launch your application
          and customize as you go.
        </p>
        <ul>
          <li>Import From Figma Design</li>
          <li>Build From Scratch</li>
          <li>Import From GitHub</li>
          <li>Select From Template</li>
        </ul>
      </div>
      <div class="log_in">
        <div class="create-account">
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-2"
              label="Application Name:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="app.name"
                placeholder="Give Your App a Name"
                required
              >
              </b-form-input>
            </b-form-group>

            <h3>Select an App Type</h3>
            <div class="types-app">
              <div @click="getDjangoApp('Web')">
                <img
                  :class="[django ? 'active' : '']"
                  src="../../assets/django.png"
                />
                <p>Web App</p>
              </div>
              <div @click="getMobileApp('Mobile')">
                <img
                  :class="[mobileapp ? 'active' : '']"
                  src="../../assets/react-brands.png"
                />
                <p>Mobile App</p>
              </div>
              <div disabled @click="getUnsupportedApp('Web')">
                <img disable
                  :class="[unsupported ? 'active' : '']"
                  src="../../assets/unsupported.png"
                />
                <p>unsupported App</p>
              </div>
            </div>
            <div class="create-app-btn">
              <b-button
                variant="danger"
                :class="[disableCreateButttton ? 'disbale' : '']"
                :disabled="disableCreateButttton"
                type="submit"
                >Create App</b-button
              >
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "../Header/Header.vue";
export default {
  name: "dashboardapp",
  components: {
    Header,
  },
  data: () => {
    return {
      app: {
        name: "",
        description: "dummy app",
        type: "Mobile",
        domain_name: "dummyapp.com",
        framework: "React Native",
      },
      django: false,
      mobileapp: true,
      unsupported: false,
    };
  },
  computed: {
    disableCreateButttton() {
      if (this.app.name.length < 3) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    ...mapActions(["createapp"]),
    ...mapActions(["getcreatedapps"]),
    onSubmit() {
      this.createapp(this.app);
      this.app = "";
    },
    getappType(type) {
      return (this.app.type = type);
    },
    getApp() {
      this.getcreatedapps();
    },
    getDjangoApp(type) {
      this.app.framework = "Django";
      this.django = true;
      this.mobileapp = false;
      this.unsupported = false;
      return (this.app.type = type);
    },
    getMobileApp(type) {
      this.app.framework = "React Native";
      this.django = false;
      this.mobileapp = true;
      this.unsupported = false;
      return (this.app.type = type);
    },
    getUnsupportedApp(type) {
      this.django = false;
      this.mobileapp = false;
      this.unsupported = true;
      return (this.app.type = type);
    },
  },
  mounted() {
    this.getApp();
  },
};
</script>

<style scoped>
.dashboard {
  padding: 60px;
  background: #e5e5e5;
}
.dashboard p {
  font-size: 11px;
  color: #ea5f57;
}
.dashboard .dashboard-content ul {
  list-style-type: none;
  text-decoration: none;
  padding: 0px;
  width: 100%;
}
.dashboard .dashboard-content ul li {
  cursor: pointer;
  padding: 10px 0px;
  font-size: 14px;
}
.dashboard .dashboard-content ul li:hover {
  background: #ea5f57;
}
.dashboard {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
}
.dashboard .dashboard-content {
  width: 40%;
  height: 70vh;
  padding: 40px 0px;
  background: #1e0a45;
  color: white;
}
.btn.btn-danger.disabled.disbale {
  background-color: gray;
  cursor: not-allowed;
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
  background: #1890ff;
  border: none;
  outline: none;
  padding: 8px 0px;
  color: white;
  margin: 15px 0px;
}
.dashboard .log_in p {
  color: #838383;
  font-weight: 700;
}
a {
  text-decoration: none;
}
.dashboard .create-app-btn {
  position: absolute;
  left: 33%;
}
.dashboard .log_in {
  position: relative;
}
.types-app {
  display: flex;
  align-items: center;
  justify-content: center;
}
.types-app img {
  width: 104px;
  height: 100px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-right: 12px;
  cursor: pointer;
}
.types-app img:last-child {
  margin-right: 0px;
}
.active {
  background: #1890ff;
}
</style>
