<template>
  <div class="post-card card my-2 elevation-3">
    <div class="card-body">
      <div class="row m-auto">
        <img class="post-body-img mb-2" :src="post.imgUrl" alt="">
        <div class="col-2 p-2">
          <div class="btn no-select draggable-none" @click="setActiveProfile(post.creatorId)">
            <div class="profile-img-container">
              <img class="profile-img" :src="post.creator.picture" alt="src\assets\img\REG-68619.png">
              <div v-if="post.creator.graduated"
                class="grad-icon-container d-flex justify-content-center align-items-center text-center">
                <img class="grad-img" src="src\assets\img\Vector (1).png" alt="">
              </div>
            </div>
          </div>
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
            <div class="offset-7 col-1 btn d-flex d-inline" @click="toggleLike(post)">
              <div v-if="post.likeIds.includes(account.id)" class="mdi mdi-heart text-danger"></div>
              <div v-else class="mdi mdi-heart-outline text-danger"></div>
              <div><b>{{ post.likes.length }}</b></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="post.creator.id == account.id">
        <button class="btn text-danger" @click="deletePost(post)">Delete</button>
        <button class="btn text-warning" @click="toggleEdit">Edit</button>
        <PostForm v-if="editing" />
      </div>
    </div>
  </div>
</template>

<script>
import { profilesService } from "../services/ProfilesService.js";
import { postsService } from "../services/PostsService.js"
import { computed, ref } from "@vue/reactivity";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
// import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";

export default {
  props: {
    post: { type: Post, required: true, },
  },

  setup(props) {

    // const route = useRoute()
    const editing = ref(false)

    return {
      editing,
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      toggleEdit() {
        AppState.activePost = props.post
        this.editing = !this.editing
      },

      async setActiveProfile(id) {
        try {
          await profilesService.getProfileById(id)
          await postsService.getPostsByCreatorId(id)
        } catch (error) {
          logger.error('[Setting Active Profile]', error);
          Pop.error(error);
        }
      },

      async toggleLike(post) {
        try {
          await postsService.toggleLike(post)
        } catch (error) {
          logger.error('[]', error);
          Pop.error(error);
        }
      },

      async deletePost(post) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this post? This action cannot be undone!')
          if (!yes) { return }
          await postsService.deletePost(post.id)
        } catch (error) {
          logger.error('[Deleting Post]', error);
          Pop.error(error);
        }
      }
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