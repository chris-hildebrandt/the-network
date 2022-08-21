<template>
  <div class="account account-cover-img text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="profile-picture" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <form class="card" @submit.prevent="handleSubmit()">
    <div class="card-body text-start">
      <div>
        <label for="name">Name:</label>
        <input type="text" class="form-control" v-model="editable.name" minlength="3" maxlength="30" name="name">
      </div>
      <div class="form-check">
        <label for="graduated">Graduated:</label>
        <input type="checkbox" class="form-check-input" v-model="editable.graduated" graduated="name">
      </div>
      <div>
        <label for="cohort">Cohort:</label>
        <input type="text" class="form-control" v-model="editable.class" minlength="8" maxlength="14" required name="cohort">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="text" class="form-control" v-model="editable.email" minlength="10" maxlength="30" required name="email">
      </div>
            <div>
        <label for="github">Github:</label>
        <input type="url" class="form-control" v-model="editable.github" minlength="10" maxlength="100" name="github" placeholder="github">
      </div>
            <div>
        <label for="linkedin">Linkedin:</label>
        <input type="url" class="form-control" v-model="editable.linkedin" minlength="10" maxlength="100" name="linkedin" placeholder="linkedin">
      </div>
      <div>
        <label for="picture">Picture:</label>
        <input type="url" class="form-control" v-model="editable.picture" minlength="4" maxlength="150" name="picture" placeholder="picture">
      </div>
      <div>
        <label for="coverImg">Cover Image:</label>
        <input type="url" class="form-control" v-model="editable.coverImg" minlength="4" maxlength="150" name="coverImg">
      </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea type="text" class="form-control" v-model="editable.bio" minlength="0" maxlength="800" name="bio" rows="8"
          style="resize:none"></textarea>
      </div>
            <div>
        <label for="resume">Resume:</label>
        <textarea type="text" class="form-control" v-model="editable.resume" minlength="0" maxlength="800" name="resume" rows="8"
          style="resize:none"></textarea>
      </div>
      <div>
        <button type="submit" class="btn btn-warning mt-2">Save Changes</button>
      </div>
    </div>
  </form>
</template>

<script>
import { accountService } from "../services/AccountService.js"
import { computed, ref, watchEffect } from 'vue'
import { logger } from "../utils/Logger.js"
import { AppState } from '../AppState'
import Pop from "../utils/Pop.js"

export default {
  name: 'Account',
  setup() {

    const editable = ref({})

    watchEffect(()=> {
      if (!AppState.account) {return}
      editable.value = {...AppState.account}
    })

    return {
      editable,
      account: computed(() => AppState.account),
      cover: computed(() => `url(${AppState.account?.coverImg || 'https://i.pinimg.com/originals/b5/94/6e/b5946e195cdff505e697a8dad43ae5fe.jpg'})`),
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
        logger.error('[editing account]', error);
        Pop.error(error);
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.account-cover-img{
  background-position: center;
  background-size: cover;
  background-image: v-bind(cover);
}
.profile-picture{
  background-color: aliceblue;
  border: 1px solid aquamarine;
  border-radius: 50%;
}
</style>
