class Comment {
  id;
  content;
  createdAt;
  score=0;
  user = {
    image: {
      png:"",
      webp:"",
    },
    username:""
  };
  replies=[];

  constructor(id, content, createdAt, png, webp, username){
    this.id =id;
    this.content = content;
    this.createdAt = createdAt;
    this.user.image.png = png;
    this.user.image.webp = webp;
    this.user.username = username;
  }
}

