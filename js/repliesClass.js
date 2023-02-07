class Replies {
    id;
    content;
    createdAt;
    score=0;
    replyingTo;
    user = {
      image: {
        png:"",
        webp:"",
      },
      username:""
    };
   
  
    constructor(id, content, createdAt,replyingTo, png, webp, username){
      this.id =id;
      this.content = content;
      this.createdAt = createdAt;
      this.replyingTo=replyingTo;
      this.user.image.png = png;
      this.user.image.webp = webp;
      this.user.username = username;
    }
  }
