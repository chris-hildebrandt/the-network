<template>
  <div class="row">
    <div @click="followLink" class="card art my-3">
    </div>
  </div>
</template>

<script>
import { AppState } from "../AppState.js";
import { computed } from "@vue/reactivity";
import { Art } from "../models/Art.js";

export default {
  props: {
    arts: { type: Art, required: true }
  },

  setup(props) {

    const link = props.arts.linkURL

    return {
      arts: computed(() => AppState.arts),
      cover: computed(()=> `url(${props.arts.tall})`),

      followLink(){
        let url = 'https://www.'+link
        window.open(url, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.art{
  background-image: v-bind(cover);
  width: 100%;
  height: 640px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>