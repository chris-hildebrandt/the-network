<template>
  <div class="row">
    <div class="card art my-3">
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

    return {
      arts: computed(() => AppState.arts),
      cover: computed(()=> `url(${props.arts.tall})`),
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