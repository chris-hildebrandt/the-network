<template>
  <form class="card m-1 p-2" @submit.prevent="handleSubmit()">
    <label for="picture">Picture / Video:</label>
    <input type="url" name="picture" required v-model="editable.imgUrl">
    <label for="message">Message:</label>
    <input type="text" class="form-control" required v-model="editable.body" name="message" rows="10">
    <button type="submit" class="btn btn-success mt-2 mdi mdi-send">{{ editable.id ? 'Save' :
        'Post'
    }}</button>
  </form>
</template>

<script>

import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const editable = ref({})

    watchEffect(()=> {
      if (!AppState.activePost) {return}
      editable.value = { ...AppState.activePost}
    })

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
          await postsService.editPost(editable.value)
          Pop.success('Post Edited!')
          } else {
            await postsService.createPost(editable.value)
            Pop.success('Pot Created!')
          }
          editable.value = {}
        } catch (error) {
          logger.error('[Create/Edit Post]', error);
          Pop.error(error);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>