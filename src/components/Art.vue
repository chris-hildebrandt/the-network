<template>
  <div class="row">
    <div>
        // AppState.art[Math.floor(Math.random() * (max - min + 1) + min)]
    </div>
  </div>
</template>

<script>
import { artService } from "../services/ArtService.js"
import { AppState } from "../AppState.js";
import { onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  // props: {
  //     max: {max = AppState.art.length},
  //     min: 1,
  // },
  setup() {

    async function getArt() {
      try {
        await artService.getArt()
      } catch (error) {
        logger.error('[getting art]', error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      getArt()
    })

    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>