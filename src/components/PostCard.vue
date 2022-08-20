<template>
  <div class="post-card card">
    <div class="card-body">
      <div class="">
        <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
          <div class="profile-img-container">
            <img class="profile-img" :src="post.creator.picture" alt="src\assets\img\REG-68619.png">
            <div v-if="post.creator.graduated"
              class="grad-icon-container d-flex justify-content-center align-items-center text-center">
              <img class="grad-img" src="src\assets\img\Vector (1).png" alt="">
            </div>
          </div>
        </router-link>
        <h6 class="">
          {{ post.creator.name }} - {{ new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: '2-digit'
            })
          }}
        </h6>
        <div v-if="post.creator.graduated"></div>
        <div v-if="post.creator"></div>

      </div>
      <div v-if="post.creator.id == account.id">
        <button @click="toggleEdit">Edit</button>
        <PostForm v-if="editing" />
      </div>
    </div>
  </div>
</template>

<script>
import { Post } from "../models/Post.js";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";

export default {
  props: {
    post: { type: Post, required: true, },
  },

  setup(props) {

    const route = useRoute()

    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.grad-icon-container {
  position: absolute;
  right: -20px;
  bottom: 5px;
  width: 15px;
  height: 15px;
}

.profile-img-container {
  position: relative;
  width: 50px;
}

.grad-img {
  width: 1.5rem;
  height: 1.5rem;
}
</style>