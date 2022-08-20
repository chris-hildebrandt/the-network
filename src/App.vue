<template>
  <!-- place art here -->
  <main class="">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 d-none d-md-block left-bar bg-light text-center sticky-top">
          <div class="row d-flex flex-column align-items-center justify-content-between">
            <router-link :to="{ name: 'Account' }" class="text-dark lighten-30 pt-5 mb-3">
              <div class="profile-img-container">
                <img class="main-profile-img" :src="account.picture" alt="profile image">
                <div v-if="account.graduated"
                  class="grad-icon d-flex justify-content-center align-items-center text-center">
                  <img src="src\assets\img\Vector (1).png" alt="">
                </div>
              </div>
            </router-link>
            <p>{{account.class}}</p>
            <b>Account Name</b>
          </div>
        </div>
        <div class="col-12 col-md-9">
          <div class="row">
            <Navbar />
            <section class="col-12 col-md-9 posts">
              <router-view />
            </section>
            <div class="col-6 col-md-3 art">
              <Art v-for="a in arts" :key="a.title" :arts="a" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Pop from "./utils/Pop.js";
import { AppState } from './AppState';
import Art from "./components/Art.vue";
import { computed, onMounted } from 'vue';
import { logger } from "./utils/Logger.js";
import Navbar from "./components/Navbar.vue";
import { artsService } from "./services/ArtsService.js";
import { postsService } from "./services/PostsService.js";

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
    async function getAllPosts() {
      try {
        await postsService.getAllPosts();
      }
      catch (error) {
        logger.error("[getting posts]", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getAllPosts();
      getArt();
    })

    return {
      account: computed(() => AppState.account),
      appState: computed(() => AppState),
      arts: computed(() => AppState.arts),
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
  height: 160px;
  width: 160px;
  border-radius: 50%;
}

main {
  max-height: 100vh;
  overflow-y: auto;
}

.posts {
  overflow-y: auto;
}

.grad-icon {
  position: absolute;
  right: 60px;
  bottom: 5px;
  width: 50px;
  height: 50px;
  background-color: whitesmoke;
  border-radius: 50%;
  border: 1px solid lightseagreen;
}

.profile-img-container {
  position: relative;
}
</style>
