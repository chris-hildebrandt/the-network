<template>

  <div class="post-card card selectable">
    <div class="card-body">
      <div class="">
        <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId}}">
        <div><img class="profile-img" :src="post.creator.picture" alt=""></div>
        </router-link>
        <h6 class="">
          {{ post.title }} - {{ new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: '2-digit'}) }}
        </h6>
        <div v-if="post.creator"></div>
        <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
          <img :src="post.creator.picture" alt="" :title="post.creator.name"
            class="profile-img selectable elevation-2 m-auto">
        </router-link>
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

export default {
  props: {
    posts: { type: Post, required: true,},
  },
  setup(props) {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-img{
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
</style>