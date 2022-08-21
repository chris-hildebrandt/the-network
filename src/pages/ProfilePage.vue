<template>
  <div v-if="profile">
    <div class="cover-img">
      <div class="position-absolute " style="right:0" v-if="profile.id == account.id">
        <router-link class="btn square btn-warning " :to="{ name: 'Account' }">Edit Account</router-link>
      </div>
      <img :src="profile.picture" alt="" height="120">
      <h3>{{ profile.name }}</h3>
      <p>{{ profile.bio }}</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="mx-auto my-3 col-md-10" v-for="p in projects" :key="p.id">
          <ProjectCard :project="p" />
        </div>
      </div>
    </div>

  </div>
  <div v-else>
    loading<i class="mdi mdi-spin mdi-star"></i><i class="mdi mdi-spin mdi-star"></i><i
      class="mdi mdi-spin mdi-star"></i>
  </div>
</template>

<script>
import { profilesService } from "../services/AccountService.js";
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { postsService } from "../services/PostsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"

export default {
  setup() {

    const route = useRoute()

      async function getProfileById() {
        try {
          await profilesService.getProfileById(route.params.profileId)
        } catch (error) {
          logger.error('[GettingProfile]', error)
          Pop.error(error)
          router.push({ name: 'Home' })
        }
      }

    async function getPostsByCreatorId() {
      try {
        await postsService.getPostsByCreatorId(route.params.profileId)
      } catch (error) {
        logger.error('[Getting posts by creator Id]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getProfileById()
      getPostsByCreatorId()
    })
    
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`),
      posts: computed(() => AppState.profilePosts)
    }
  }
}

</script>

<style lang="scss" scoped>
</style>