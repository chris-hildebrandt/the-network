import { AppState } from "../AppState.js";



class PostsService{

  async getAllPosts(){
    const res = await api.get('/api/posts')
    console.log(res);
    AppState.posts = res.data.posts
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older

  }
}
export const postsService = new PostsService()