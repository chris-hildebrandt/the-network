<template>
  <!-- place art here -->
  <main class="">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 left-bar bg-light text-center sticky-top">
          <div class="row d-flex flex-column align-items-center justify-content-between">
            <router-link :to="{ name: 'Account' }" class="text-dark lighten-30 pt-5 mb-3">
              <img class="main-profile-img" :src="account.picture" alt="profile image">
            </router-link>
            <p>cohort</p>
            <b>Account Name</b>
          </div>
        </div>
        <div class="col-9">
          <div class="row">
            <Navbar />
            <section class="col-9 posts">
              <router-view />
            </section>
            <div class="col-3 art">
              <Art v-for="a in arts" :key="a.title" :arts="a" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState';
import Navbar from "./components/Navbar.vue";
import Art from "./components/Art.vue";
import { logger } from "./utils/Logger.js";
import Pop from "./utils/Pop.js";
import { artsService } from "./services/ArtsService.js";

export default {
  name: "App",
  setup() {
    async function getArt() {
      try {
        await artsService.getArt()
      } catch (error) {
        logger.error('[getting art]', error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      getArt()
    })

    return {
      account: computed(() => AppState.account),
      appState: computed(() => AppState),
      arts: computed(()=> AppState.arts),
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
  height: 200px;
  width: 200px;
  border-radius: 50%;
}

main {
  max-height: 100vh;
  overflow-y: auto;
}

.posts {
  overflow-y: auto;
}
</style>
