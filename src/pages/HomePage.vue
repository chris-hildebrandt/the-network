<template>
  <div class="home-page">
    <div class="container-fluid ">
      <div class="row">
          <div v-for="p in posts" :key="p.id">
            <PostCard :post="p" />
          </div>
      </div>
    </div>
  </div>
<div class="d-flex justify-content-evenly sticky-bottom">
    <button class="btn text-primary fw-bold border-none" :disabled="!newerPosts" @click="changePage(newerPosts)"><span
        class="mdi mdi-chevron-left"></span>Newer</button>
    <button class="btn text-primary fw-bold border-none" :disabled="!olderPosts" @click="changePage(olderPosts)">Older<span
        class="mdi mdi-chevron-right"></span></button>
</div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js"
import { computed } from "@vue/reactivity";
import { logger } from "../utils/Logger.js";
import PostCard from "../components/PostCard.vue";
import { postsService } from "../services/PostsService.js"

export default {
  components: { PostCard },
  setup() {
    return {
      posts: computed(() => AppState.posts),
      activePost: computed(() => AppState.activePost),
      newerPosts: computed(() => AppState.newerPosts),
      olderPosts: computed(() => AppState.olderPosts),
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
</style>
