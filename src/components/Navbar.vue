<template>
  <nav class="col-12 navbar navbar-expand-lg navbar-dark bg-primary px-3 sticky-top py-0 elevation-3">
    <router-link class="navbar-brand d-flex btn" @click="getAllPosts" :to="{ name: 'Home' }">
      <div>
        <img alt="logo" src="https://cryptologos.cc/logos/nucleus-vision-ncash-logo.png" height="50" />etwork
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <form @submit.prevent="getPostsBySearch">
            <input type="text" placeholder="search posts" required v-model="query" />
            <button class="btn text-dark lighten-20 selectable mdi mdi-magnify mdi-24px" type="submit">
            </button>
          </form>
        </li>
      </ul>
      <Login />
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const query = ref('')

    return {
      
      query,

      async getAllPosts() {
      try {
        await postsService.getAllPosts();
      }
      catch (error) {
        logger.error("[getting posts]", error);
        Pop.error(error);
      }
    },

      async getPostsBySearch() {
      try {
        await postsService.getPostsBySearch(query.value)
        query.value = ''
      } catch (error) {
        logger.error('[Getting Posts by Search]', error);
        Pop.error(error);
      }
    }
  };
},
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
