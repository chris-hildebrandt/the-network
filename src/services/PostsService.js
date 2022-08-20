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

  async getPostsBySearch(query) {
    const res = await api.get('api/posts', {
      params: {
        query: searchTerm
      }
    })
    AppState.posts = res.data.posts.map(p=> new Post(p))
  }
}

  // async createPost()

// edit
// delete
// create
export const postsService = new PostsService()