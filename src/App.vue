<template>
  <!-- place art here -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 left-bar bg-light text-center">
        <div class="row d-flex flex-column align-items-center justify-content-between">
          <router-link :to="{ name: 'Account' }" class="text-dark lighten-30 pt-5 mb-3">
            <img class="main-profile-img"
              src="https://support.pega.com/sites/default/files/pega-user-image/69/REG-68619.png" alt="profile image">
          </router-link>
          <p>cohort</p>
          <b>Account Name</b>
        </div>
      </div>
      <div class="col-9">
        <div class="row">
          <Navbar />
          <main class="col-9">
            <router-view />
          </main>
          <div class="col-3 art">
            <Art />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';
import Navbar from "./components/Navbar.vue";
import Art from "./components/Art.vue";

export default {
  name: "App",
  setup() {
    return {
      account: computed(() => AppState.account),
      appState: computed(() => AppState),
    };
  },
  components: { Navbar, Art }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.left-bar {
  height: 100vh;
}

.main-profile-img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

main {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
