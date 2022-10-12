<template>
  <div class="profile-page">
    <div class="container-fluid ">
      <div class="row">
        <div v-if="profile" class="card cover-img">
          <div class="card-body text-start text-white text-shadow">
            <div>
              <p class="">Name:{{ profile.name }}</p>
            </div>
            <div v-if="profile.graduated" class=""><img
                src="src\assets\img\graduation.png" /> Graduated!</div>
            <div>
              <p class="cohort">Cohort: {{ profile.class }}</p>
            </div>
            <div>
              <p for="email">Email: {{ profile.email }}</p>
            </div>
            <div>
              <div for="github">Github: {{ profile.github }}</div>
            </div>
            <div>
              <div for="linkedin">Linkedin: {{ profile.linkedin }}</div>
            </div>
            <div>
              <div for="picture">Picture: {{profile.imgUrl}}</div>
            </div>
            <div>
              <div for="bio">Bio: <p>{{profile.bio}}</p>
              </div>
            </div>
            <div>
              <div for="resume">Resume: <p>{{profile.resume}}</p></div>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div v-for="p in posts" :key="p.id">
          <PostCard :post="p" />
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-evenly sticky-bottom">
    <button class="btn text-primary fw-bold border-none" :disabled="!newerPosts" @click="changePage(newerPosts)"><span
        class="mdi mdi-chevron-left"></span>Newer</button>
    <button class="btn text-primary fw-bold border-none" :disabled="!olderPosts"
      @click="changePage(olderPosts)">Older<span class="mdi mdi-chevron-right"></span></button>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js"
import { computed } from "@vue/reactivity";
import { logger } from "../utils/Logger.js";
import PostCard from "../components/PostCard.vue";
import { postsService } from "../services/PostsService.js"
import PostForm from "../components/PostForm.vue";
import { Profile } from "../models/Profile.js";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { router } from "../router.js";
import { profilesService } from "../services/ProfilesService.js";

export default {
  components: { PostCard, PostForm },
  setup() {

    const route = useRoute()

    onMounted(() => {
      profilesService.getProfileById(route.params.profileId)
      postsService.getPostsByCreatorId(route.params.profileId)
    })

    return {
      profile: computed(()=> AppState.activeProfile),
      cover: computed(() => `url(${AppState.account?.coverImg || 'https://i.pinimg.com/originals/b5/94/6e/b5946e195cdff505e697a8dad43ae5fe.jpg'})`),
      posts: computed(() => AppState.posts),
      activePost: computed(() => AppState.activePost),
      newerPosts: computed(() => AppState.newerPosts),
      olderPosts: computed(() => AppState.olderPosts),
      user: computed(() => AppState.user),
      async changePage(url) {
        try {
          await postsService.changePage(url);
        }
        catch (error) {
          logger.error("[changing page]", error);
          Pop.error(error);
        }
      }
    };
  },
}
</script>

<style scoped lang="scss">
.left-bar {
  height: 100vh;
}

.main-profile-img {
  height: 160px;
  width: 160px;
  border-radius: 50%;
}

.posts {
  overflow-y: auto;
}

.grad-icon {
  position: absolute;
  right: 60px;
  bottom: 5px;
  width: 50px;
  height: 50px;
  background-color: whitesmoke;
  border-radius: 50%;
  border: 1px solid lightseagreen;
}

.profile-img-container {
  position: relative;
}

.cover-img {
  background-position: center;
  background-size: cover;
  background-image: v-bind(cover);
}

.profile-picture {
  background-color: aliceblue;
  border: 1px solid aquamarine;
  border-radius: 50%;
}

.text-shadow {
  text-shadow: 0px 0px 3px black;
  font-size: large;
  font-weight: bold;
}
</style>
