<!-- TODO when you login set active profile to user, when you manage account set user to activeprofile -->
<template>
  <div class="col-3 d-none d-md-block left-bar bg-light text-center sticky-top">
    <div v-if="user.isAuthenticated" class="row d-flex flex-column align-items-center justify-content-between">
      <div class="profile-img-container">
        <img class="main-profile-img" :src="profile.picture" alt="profile image">
        <div v-if="profile.graduated" class="grad-icon d-flex justify-content-center align-items-center text-center">
          <img src="src\assets\img\Vector (1).png" alt="">
        </div>
      </div>
      <p>{{ profile.class }}</p>
      <b>{{ profile.name }}</b>
    </div>
    <div class="text-start p-3">
      <div v-if="profile.github">
        <span class="mdi mdi-24px mdi-github m-3"> </span>
        <a target="_blank" :href="profile.github">{{ profile.github }}</a>
      </div>
      <div v-if="profile.linkedin"><span class="mdi mdi-24px mdi-linkedin m-3"> </span>
        <a target="_blank" :href="profile.linkedin">{{ profile.linkedin }}</a>
      </div>
      <div v-if="profile.resume"><span class="mdi mdi-24px mdi-l mdi-file-document-multiple-outline m-3"> </span>
        Resume</div>
      <div>{{ profile.resume }}</div>
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
</template>

<script>
import Pop from "./utils/Pop.js";
import { AppState } from './AppState';
import Art from "./components/Art.vue";
// import { router } from '../router.js';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { logger } from "./utils/Logger.js";
import Navbar from "./components/Navbar.vue";
import { artsService } from "./services/ArtsService.js";
import { postsService } from "./services/PostsService.js";

export default {
  name: "App",
  setup() {

    const route = useRoute()

    async function getArt() {
      try {
        await artsService.getArt()
      } catch (error) {
        logger.error('[getting art]', error);
        Pop.error(error);
      }
    }

    // async function getProfileById() {
    //   try {
    //     await profilesService.getProfileById(route.params.profileId)
    //   } catch (error) {
    //     logger.error('[GettingProfile]', error)
    //     Pop.error(error)
    //     router.push({ name: 'Home' })
    //   }
    // }

    async function getPostsByCreatorId() {
      try {
        await postsService.getPostsByCreatorId(route.params.profileId)
      } catch (error) {
        logger.error('[Getting posts by creator Id]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getPostsByCreatorId();
      getArt();
    })

    return {
      profile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account),
      appState: computed(() => AppState),
      arts: computed(() => AppState.arts),
      user: computed(() => AppState.user),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`),
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

.mdi-l {
  height: 2rem;
}

.t-align-right {
  text-align-last: right;
}
</style>
