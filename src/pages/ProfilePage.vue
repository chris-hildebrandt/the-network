<template>
  <div v-if="profile">

  </div>
</template>

<script>
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
      getPostsByCreatorId()
      getProfileById()
    })
    
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`),
      projects: computed(() => AppState.profileProjects)
    }
  }
}

</script>

<style lang="scss" scoped>
</style>