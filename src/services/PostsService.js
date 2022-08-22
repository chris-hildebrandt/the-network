import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "../services/AxiosService.js"

class PostsService {

  async getAllPosts() {
    AppState.posts = []
    const res = await api.get('/api/posts')
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async changePage(url) {
    const res = await api.get(url)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async getPostsByCreatorId(creatorId) {
    const res = await api.get('api/posts', {
      params: {
        creatorId
      }
    })
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async getPostsBySearch(searchTerm) {
    const res = await api.get('api/posts', {
      params: {
        query: searchTerm
      }
    })
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async createPost(formData) {
    const res = await api.post('api/posts', formData)
    AppState.posts.unshift(new Post(res.data))
  }

  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    AppState.posts = AppState.posts.filter(p => p.id != postId)
  }
// TODO figure out how to flush my form
  async editPost(postData) {
    const res = await api.put(`api/posts/${postData.id}`, postData)
    const index = AppState.posts.findIndex(p => p.id == postData.id)
    AppState.posts.splice(index, 1, new Post(res.data))
    AppState.activePost = {}
  }

}

// delete
export const postsService = new PostsService()