<template>
  <div class="home-page">
    <div class="col-3 d-none d-md-block left-bar bg-light text-center sticky-top">
      <div v-if="user.isAuthenticated" class="row d-flex flex-column align-items-center justify-content-between">
        <!-- <router-link :to="{ name: 'profile' }" class="text-dark lighten-30 pt-5 mb-3"> -->
        <div class="profile-img-container">
          <img class="main-profile-img" :src="profile.picture" alt="profile image">
          <div v-if="profile.graduated" class="grad-icon d-flex justify-content-center align-items-center text-center">
            <img src="src\assets\img\Vector (1).png" alt="">
          </div>
        </div>
        <!-- </router-link> -->
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
    <PostForm v-if="user.isAuthenticated" />
    <div v-for="p in posts" :key="p.id">
      <PostCard :post="p" />
    </div>
  </div>
  <div class="d-flex justify-content-evenly sticky-bottom">
    <button class="btn text-primary fw-bold border-none" :disabled="!newerPosts" @click="changePage(newerPosts)"><span
        class="mdi mdi-chevron-left"></span>Newer</button>
    <button class="btn text-primary fw-bold border-none" :disabled="!olderPosts"
      @click="changePage(olderPosts)">Older<span class="mdi mdi-chevron-right"></span></button>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { useRoute } from 'vue-router';
import { AppState } from "../AppState.js"
import { computed } from "@vue/reactivity";
import { logger } from "../utils/Logger.js";
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";
import { postsService } from "../services/PostsService.js"
import { onMounted } from "vue";

export default {
  components: { PostCard, PostForm },
  setup() {

    const route = useRoute()

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
    })

    return {
      posts: computed(() => AppState.posts),
      activePost: computed(() => AppState.activePost),
      newerPosts: computed(() => AppState.newerPosts),
      olderPosts: computed(() => AppState.olderPosts),
      user: computed(() => AppState.user),
      profile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account),
      appState: computed(() => AppState),
      arts: computed(() => AppState.arts),
      user: computed(() => AppState.user),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`),
      async changePage(url) {
        try {
          await postsService.changePage(url);
        }
        catch (error) {
          logger.error("[changing page]", error);
          Pop.error(error);
        }
      }
    };
  },
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
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
