<template>
  <div class="post-card card">
    <div class="card-body">
      <div class="row m-auto">
        <img class="post-body-img mb-2" :src="post.imgUrl" alt="">
        <div class="col-2 p-2">
          <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
            <div class="profile-img-container">
              <img class="profile-img" :src="post.creator.picture" alt="src\assets\img\REG-68619.png">
              <div v-if="post.creator.graduated"
                class="grad-icon-container d-flex justify-content-center align-items-center text-center">
                <img class="grad-img" src="src\assets\img\Vector (1).png" alt="">
              </div>
            </div>
          </router-link>
          <h6 class="pt-3">{{ post.creator.name }}</h6>
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-12">
              <p class="mt-3">{{ post.body }}</p>
            </div>
            <div class="col-4">
              <p>{{ new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short', day: '2-digit', year: 'numeric'
                })
              }}</p>
            </div>
            <div class="offset-7 col-1 btn d-flex d-inline" @click="toggleLike()">
              <div v-if="post.likeIds.includes(accountId)" class="mdi mdi-heart text-danger" ></div>
              <div v-else class="mdi mdi-heart-outline text-danger" ></div>
              <div><b>{{post.likes.length}}</b></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="post.creator"></div>
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

  setup() {

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

// .post-body-img{
//   max-width: min-content;
// }
</style>