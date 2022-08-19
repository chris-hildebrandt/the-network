<template>
<button class="btn btn-info" @click="getMovies(prevPage)" v-if="prevPage > 0">
        Previous
      </button>
      <button class="btn btn-info" @click="getMovies(nextPage)">Next</button>
</template>

<script>
import { onMounted } from "vue";
import { postsService } from "../services/PostsService.js"
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {

    async function getAllPosts(){
      try {
      await postsService.getAllPosts()
      } catch (error) {
      logger.error('[getting posts]', error);
      Pop.error(error);
      }
    }

    onMounted(()=> {
      getAllPosts()
    })

    return {

    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
