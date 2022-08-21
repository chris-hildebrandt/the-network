import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "../services/AxiosService.js"

class PostsService {

  async getAllPosts() {
    const res = await api.get('/api/posts')
    console.log(res);
    AppState.posts = res.data.posts
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async changePage(url) {
    const res = await api.get(url)
    AppState.posts = res.data.posts
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async getPostsByCreatorId(creatorId) {
    const res = await api.get('api/posts', {
      params: {
        creatorId
      }
    })
    AppState.posts = res.data.map(p => new Post(p))
  }

  async getPostsBySearch(query) {
    const res = await api.get('api/posts', {
      params: {
        query: searchTerm
      }
    })
    AppState.posts = res.data.posts.map(p=> new Post(p))
  }

  async createPost(formData) {
    const res = await api.post('api/posts', formData)
    AppState.posts.unshift(new Post(res.data))
  }

}


// edit
// delete
// create
export const postsService = new PostsService()