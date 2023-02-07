class Func {
  static scorePlus(id) {
    for (let i = 0; i < commentObj.comments.length; i++) {
      if (commentObj.comments[i]["id"] == id) {
        commentObj.comments[i]["score"]++;
        break;
      } else {
        for (let j = 0; j < commentObj.comments[i]["replies"].length; j++) {
          if (commentObj.comments[i]["replies"][j]["id"] == id) {
            commentObj.comments[i]["replies"][j]["score"]++;
          }
        }
      }
    }
    Func.display();
  }

  static scoreMinus(id) {
    for (let i = 0; i < commentObj.comments.length; i++) {
      if (commentObj.comments[i]["id"] == id) {
        commentObj.comments[i]["score"]--;
        break;
      } else {
        for (let j = 0; j < commentObj.comments[i]["replies"].length; j++) {
          if (commentObj.comments[i]["replies"][j]["id"] == id) {
            commentObj.comments[i]["replies"][j]["score"]--;
          }
        }
      }
    }
    Func.display();
  }

  static replay(id1, textAreaId) {
    let index = "";
    let index2;
    let result;
    let objToDisplay = commentObj.comments;
    for (let i = 0; i < objToDisplay.length; i++) {
      if (objToDisplay[i].id == id1) {
        index = i;

        break;
      } else if (objToDisplay[i].replies) {
        for (let j = 0; j < objToDisplay[i].replies.length; j++) {
          if (objToDisplay[i].replies[j].id == id1) {
            index = i;
            index2 = j;
            break;
          }
        }
      }
    }
    result =
      index2 != undefined
        ? objToDisplay[index].replies[index2].user.username
        : objToDisplay[index].user.username;

    id++;
    console.log(id);
    let textForNewCommet = document.getElementById(textAreaId);
    commentObj.comments[index].replies.push(
      new Replies(
        id,
        textForNewCommet.value,
        "time",
        result,
        commentObj.currentUser.image.png,
        commentObj.currentUser.image.webp,
        commentObj.currentUser.username
      )
    );
    textForNewCommet.value = "";
    Func.display();
  }

  static send() {
    id++;
    let textForNewCommet = document.getElementById("textForNewCommet");
    commentObj.comments.push(
      new Comment(
        id,
        textForNewCommet.value,
        "time",
        commentObj.currentUser.image.png,
        commentObj.currentUser.image.webp,
        commentObj.currentUser.username
      )
    );
    textForNewCommet.value = "";
    Func.display();
  }

  static delete(id) {
    for (let i = 0; i < commentObj.comments.length; i++) {
      if (commentObj.comments[i]["id"] == id) {
        commentObj.comments.splice(i, 1);
      } else {
        for (let j = 0; j < commentObj.comments[i]["replies"].length; j++) {
          if (commentObj.comments[i]["replies"][j]["id"] == id) {
            commentObj.comments[i]["replies"].splice(j, 1);
          }
        }
      }
    }
    Func.display();
  }

  static removeClassFromReplayDiv(idRemove) {
    let divId = document.getElementById(idRemove);
    divId.classList.remove("hidden");
  }
  //!
  static edit(id) {}

  static display() {
    let commentWrapper = document.getElementById("commentWrapper");
    commentWrapper.innerHTML = "";
    let objToDisplay = commentObj.comments;

    for (let i = 0; i < objToDisplay.length; i++) {
      if (objToDisplay[i].user.username == commentObj.currentUser.username) {
        commentWrapper.innerHTML += ` <div class="chatBubble margin">
            <div class="counter">
            <img onclick="Func.scorePlus(${commentObj.comments[i].id})" src="./images/icon-plus.svg" alt="" />
              <span>${commentObj.comments[i].score}</span>
              <img onclick="Func.scoreMinus(${commentObj.comments[i].id})" src="./images/icon-minus.svg" alt="" />
            </div>
            <div class="details">
              <div class="title">
                <div class="left">
                  <img src="${commentObj.comments[i].user.image.png}" alt="" />
                  <span>${commentObj.comments[i].user.username}</span>
                  <span>${commentObj.comments[i].createdAt}</span>
                </div>
                <div class="right">
                <div>
                <img src="./images/icon-delete.svg" alt="" />
                <span onclick="Func.delete(${commentObj.comments[i].id})">Delete</span>
              </div>
              <div>
                <img src="./images/icon-edit.svg" alt="" />
                <span>Edite</span>
              </div>
                </div>
              </div>
              <p>${commentObj.comments[i].content}</p>
            </div>
          </div>
           
          `;
      } else {
        commentWrapper.innerHTML += ` <div class="chatBubble margin">
                <div class="counter">
                <img onclick="Func.scorePlus(${commentObj.comments[i].id})" src="./images/icon-plus.svg" alt="" />
                  <span>${commentObj.comments[i].score}</span>
                  <img onclick="Func.scoreMinus(${commentObj.comments[i].id})" src="./images/icon-minus.svg" alt="" />
                </div>
                <div class="details">
                  <div class="title">
                    <div class="left">
                      <img src="${commentObj.comments[i].user.image.png}" alt="" />
                      <span>${commentObj.comments[i].user.username}</span>
                      <span>${commentObj.comments[i].createdAt}</span>
                    </div>
                    <div class="right hover">
                      <img src="./images/icon-reply.svg" alt="" />
                      <span onclick="Func.removeClassFromReplayDiv('r${i}')">Reply</span>
                    </div>
                  </div>
                  <p>${commentObj.comments[i].content}</p>
                </div>
              </div>
              <div id="r${i}" class="writeComment hidden margin">
            <img src="./images/avatars/image-juliusomo.png" alt="">
            <textarea id="textArea${i}" placeholder="Add a comment..." cols="30" rows="5"></textarea>
            <button onclick="Func.replay(${commentObj.comments[i].id},'textArea${i}')">REPLY</button>
          </div> 
              `;
      }

      if (objToDisplay[i].replies) {
        for (let j = 0; j < objToDisplay[i].replies.length; j++) {
          if (
            objToDisplay[i].replies[j].user.username ==
            commentObj.currentUser.username
          ) {
            if (j == 0) {
              commentWrapper.innerHTML += `<div class="hr margin"><div></div></div>
                <div class="chatBubbleChild">
               <div class="counter">
                 <img onclick="Func.scorePlus(${commentObj.comments[i].replies[j].id})" src="./images/icon-plus.svg" alt="" />
                 <span>${commentObj.comments[i].replies[j].score}</span>
                 <img onclick="Func.scoreMinus(${commentObj.comments[i].replies[j].id})" src="./images/icon-minus.svg" alt="" />
               </div>
               <div class="details">
                 <div class="title">
                   <div class="left">
                     <img src="${commentObj.comments[i].replies[j].user.image.png}" alt="" />
                     <span>${commentObj.comments[i].replies[j].user.username}</span>
                     <span>${commentObj.comments[i].replies[j].createdAt}</span>
                   </div>
                   <div class="right">
                   <div>
                   <img src="./images/icon-delete.svg" alt="" />
                   <span onclick="Func.delete(${commentObj.comments[i].replies[j].id})")>Delete</span>
                 </div>
                 <div>
                   <img src="./images/icon-edit.svg" alt="" />
                   <span>Edit</span>
                 </div>
                   </div>
                 </div>
                 <p><span class="hashTag">@${commentObj.comments[i].replies[j].replyingTo}</span> ${commentObj.comments[i].replies[j].content}</p>
               </div>
             </div>
            
             `;
            } else {
              commentWrapper.innerHTML += `<div class="hr"><div></div></div>
             <div class="chatBubbleChild">
            <div class="counter">
              <img onclick="Func.scorePlus(${commentObj.comments[i].replies[j].id})" src="./images/icon-plus.svg" alt="" />
              <span>${commentObj.comments[i].replies[j].score}</span>
              <img onclick="Func.scoreMinus(${commentObj.comments[i].replies[j].id})" src="./images/icon-minus.svg" alt="" />
            </div>
            <div class="details">
              <div class="title">
                <div class="left">
                  <img src="${commentObj.comments[i].replies[j].user.image.png}" alt="" />
                  <span>${commentObj.comments[i].replies[j].user.username}</span>
                  <span>${commentObj.comments[i].replies[j].createdAt}</span>
                </div>
                <div class="right">
                <div>
                <img src="./images/icon-delete.svg" alt="" />
                <span onclick="Func.delete(${commentObj.comments[i].replies[j].id})">Delete</span>
              </div>
              <div>
                <img src="./images/icon-edit.svg" alt="" />
                <span>Edit</span>
              </div>
                </div>
              </div>
              <p><span class="hashTag">@${commentObj.comments[i].replies[j].replyingTo}</span> ${commentObj.comments[i].replies[j].content}</p>
            </div>
          </div>`;
            }
          } else {
            if (j == 0) {
              commentWrapper.innerHTML += `<div class="hr margin"><div></div></div>
                <div class="chatBubbleChild">
               <div class="counter">
                 <img onclick="Func.scorePlus(${commentObj.comments[i].replies[j].id})" src="./images/icon-plus.svg" alt="" />
                 <span>${commentObj.comments[i].replies[j].score}</span>
                 <img onclick="Func.scoreMinus(${commentObj.comments[i].replies[j].id})" src="./images/icon-minus.svg" alt="" />
               </div>
               <div class="details">
                 <div class="title">
                   <div class="left">
                     <img src="${commentObj.comments[i].replies[j].user.image.png}" alt="" />
                     <span>${commentObj.comments[i].replies[j].user.username}</span>
                     <span>${commentObj.comments[i].replies[j].createdAt}</span>
                   </div>
                   <div class="right hover">
                     <img src="./images/icon-reply.svg" alt="" />
                     <span onclick="Func.removeClassFromReplayDiv('r${i}${j}')">Reply</span>
                   </div>
                 </div>
                 <p><span class="hashTag">@${commentObj.comments[i].replies[j].replyingTo}</span> ${commentObj.comments[i].replies[j].content}</p>
               </div>
             </div>
             <div id="r${i}${j}" class="hidden w-100">
          <div class="hr"><div></div></div>
             <div  class="writeComment writeCommentChild margin">
             <img src="./images/avatars/image-juliusomo.png" alt="">
             <textarea id="textArea${i}${j}" placeholder="Add a comment..." cols="30" rows="5"></textarea>
             <button onclick="Func.replay(${commentObj.comments[i].replies[j].id},'textArea${i}${j}')">REPLY</button>
           </div>
           </div> `;
            } else {
              commentWrapper.innerHTML += `<div class="hr"><div></div></div>
             <div class="chatBubbleChild">
            <div class="counter">
              <img onclick="Func.scorePlus(${commentObj.comments[i].replies[j].id})" src="./images/icon-plus.svg" alt="" />
              <span>${commentObj.comments[i].replies[j].score}</span>
              <img onclick="Func.scoreMinus(${commentObj.comments[i].replies[j].id})" src="./images/icon-minus.svg" alt="" />
            </div>
            <div class="details">
              <div class="title">
                <div class="left">
                  <img src="${commentObj.comments[i].replies[j].user.image.png}" alt="" />
                  <span>${commentObj.comments[i].replies[j].user.username}</span>
                  <span>${commentObj.comments[i].replies[j].createdAt}</span>
                </div>
                <div class="right hover">
                  <img src="./images/icon-reply.svg" alt="" />
                  <span onclick="Func.removeClassFromReplayDiv('r${i}${j}')">Reply</span>
                </div>
              </div>
              <p><span class="hashTag">@${commentObj.comments[i].replies[j].replyingTo}</span> ${commentObj.comments[i].replies[j].content}</p>
            </div>
          </div>
          <div id="r${i}${j}" class="hidden w-100">
          <div class="hr"><div></div></div>
             <div  class="writeComment writeCommentChild margin">
             <img src="./images/avatars/image-juliusomo.png" alt="">
             <textarea id="textArea${i}${j}" placeholder="Add a comment..." cols="30" rows="5"></textarea>
             <button onclick="Func.replay(${commentObj.comments[i].replies[j].id},'textArea${i}${j}')">REPLY</button>
           </div>
           </div>`;
            }
          }
        }
      }
    }
    commentWrapper.innerHTML += ` <div class="writeComment margin">
        <img src="./images/avatars/image-juliusomo.png" alt="">
        <textarea id="textForNewCommet" placeholder="Add a comment..." cols="30" rows="5"></textarea>
        <button onclick="Func.send()">SEND</button>
      </div>`;
  }
}
