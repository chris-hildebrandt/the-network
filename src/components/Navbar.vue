<template>
  <nav class="col-12 navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img alt="logo" src="https://cryptologos.cc/logos/nucleus-vision-ncash-logo.png" height="45" />etwork
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li>
        <li>
          <form @submit.prevent="getPostsBySearch">
            <input type="text">
            <div class="btn text-success lighten-30 selectable text-uppercase mdi mdi-magnify">
              </div>
          </form>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { router } from "../router.js";
import { postsService } from "../services/PostsService.js";

export default {
  setup() {
    const query = ref('')
    return {
      query,
      async getPostsBySearch() {
        try {
          await postsService.getPostsBySearch(query.value)
          query.value = ''
          router.push('Search')
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
