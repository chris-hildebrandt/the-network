<template>
  <div class="home-page">
    <div class="container-fluid">
      <div class="row">
        <div></div>
        <div class="col" v-for="p in posts" :key="p.id">{{ p.body }}
        </div>
      </div>
    </div>
    <button class="btn btn-primary" :disabled="!newerPosts" @click="changePage(newerPosts)">newer</button>
    <button class="btn btn-primary" :disabled="!olderPosts" @click="changePage(olderPosts)">older</button>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js"
import { computed } from "@vue/reactivity";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService.js"

export default {
  setup() {

    props: { }

    async function getAllPosts() {
      try {
        await postsService.getAllPosts()
      } catch (error) {
        logger.error('[getting posts]', error);
        Pop.error(error);
      }
    }


    onMounted(() => {
      getAllPosts()
    })

    return {

      posts: computed(() => AppState.posts),
      activePost: computed(() => AppState.activePost),
      newerPosts: computed(() => AppState.newerPosts),
      olderPosts: computed(() => AppState.olderPosts),

      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          logger.error('[changing page]', error);
          Pop.error(error);
        }
      }
    }
  }
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
