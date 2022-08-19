// ad, art, and banners are blocked by default you will need to combine the search query and the pagination. look at pokemon fireside for pagination
// the for likes and unlikes you just have to make a correct post req. you don't need a body. make like icon visible only to logged in users or have a toast error for non-logged in users
// do not just save res.data.map for posts, you need pagination
// start with posts and art so that they render before login
// no sorting needed
// use a tags for links, icons disappear if the profile doesn't have a github or something.
export class Post{
  constructor(data){
    this.id = data.id
    this.creatorId = data.creatorId || ''
    this.creator = data.creator || []
    this.createdAt = data.createdAt || ''
    this.updatedAt = data.updatedAt || ''
    this.likeIds = data.likeIds || []
    this.likes = data.likes || []
    this.imgUrl = data.imgUrl || ''
    this.body = data.body || ''
  }
}

