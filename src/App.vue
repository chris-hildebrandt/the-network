<template>
  <!-- place ads here -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 left-bar bg-light text-center">
        <div class="row d-flex flex-column align-items-center justify-content-between">
          <router-link :to="{ name: 'Account' }" class="text-dark lighten-30 pt-5 mb-3">
            <img src="account.imgUrl" alt="">
          </router-link>
          <p>cohort</p>
          <b>Account Name</b>
          <Login class="pt-3" />
        </div>
      </div>
      <div class="col-9">
        <div class="row">
          <Navbar />
  <main>
    <router-view />
  </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState)
    };
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.left-bar {
  height: 100vh;
}

main {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
