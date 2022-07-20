const main = document.querySelector("main");
const comentatorProfilePic = document.querySelector(".comment_propic");
const commentInput = document.querySelector(".my__comment__input");
const addCommentBtn = document.querySelector(".add_button");
const myContainer = document.querySelector(".container");
const replies = document.querySelector(".replies");
const reply = document.querySelector(".reply");
let commentObject;
let replying = false;
const datas = {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 1,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 2,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};
comentatorProfilePic.setAttribute("src", datas.currentUser.image.png);
const myUsername = "Elfque";
// MY PROFILE OBJECT
const myCommentObject = {
  id: datas.comments.length + 1,
  // content: commentInput.value,
  content:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente possimus pariatur assumenda facere quos quae repellat quibusdam deserunt velit sint aperiam suscipit reprehenderit vero iusto adipisci, perferendis, mollitia similique magni!",
  createdAt: "2 week ago",
  score: 0,
  user: {
    image: {
      png: "./images/avatars/image-amyrobson.png",
      webp: "./images/avatars/image-amyrobson.webp",
    },
    username: myUsername,
  },
  replies: [],
};

// ADD REPLY
const getReply = (reply) => {
  let replyText;
  const myReplies = [];
  reply.forEach((reps, i) => {
    // REPLY TEXT
    replyText = `<div class="reply__part" id=${i + 1}>
     <div class="vote">
     <img src="./images/icon-plus.svg" alt="" class="plus" />
     <div class="vote__number">${reps.score}</div>
     <img src="./images/icon-minus.svg" alt="" class="minus" />
    </div>
    <div class="main__comment">
     <div class="interact">
       <div class="profile">
         <div class="comm__profile">
           <img
             src=${reps.user.image.png}
             alt=""
             class="profile_picture"
           />
           <div class="profile_name">${reps.user.username}</div>
           <div class="time_of_comment">${reps.createdAt}</div>
         </div>
       </div>
       <div class="reply">
         <img src="./images/icon-reply.svg" alt="" class="reply_icon" />
         <span>Reply</span>
       </div>
     </div>
     <div class="comment__text">${reps.content}</div>
     </div></div>`;
    myReplies.push(replyText);
  });
  return myReplies.join("");
};

// FUNCTION TO GET COMMENT
const getComment = (comment) => {
  myContainer.textContent = "";
  comment.forEach((comm, i) => {
    const myReply = comm.replies.length == 0 ? "" : getReply(comm.replies);

    // INPUT TEXT
    const inputText = `<div class="comment" id=${i + 1}> 
    <div class="comment__part">
    <div class="vote">
  <img src="./images/icon-plus.svg" alt="" class="plus" />
  <div class="vote__number">${comm.score}</div>
  <img src="./images/icon-minus.svg" alt="" class="minus" />
</div>
<div class="main__comment">
  <div class="interact">
    <div class="profile">
      <div class="comm__profile">
        <img
          src=${comm.user.image.png}
          alt=""
          class="profile_picture"
        />
        <div class="profile_name">${comm.user.username}</div>
        <div class="time_of_comment">${comm.createdAt}</div>
      </div>
    </div>
    <div class="reply">
      <img src="./images/icon-reply.svg" alt="" class="reply_icon" />
      <span>Reply</span>
    </div>
  </div>
  <div class="comment__text">${comm.content}</div>
 </div> </div>
 <div class="replies">${myReply}</div>
 </div>`;

    myContainer.insertAdjacentHTML("beforeend", inputText);
  });
};
getComment(datas.comments);

addCommentBtn.addEventListener("click", () => {
  const textToInput = commentInput.value;
  if (textToInput.length == 0) {
    alert("The input cannot be empty");
  } else {
    if (!replying) {
      myCommentObject.content = textToInput;
      datas.comments.push(myCommentObject);
      getComment(datas.comments);
    } else {
      myCommentObject.content = textToInput;
      commentObject.replies.push(myCommentObject);
      replying = false;
      getComment(datas.comments);
      addCommentBtn.textContent = "Add";
    }
  }
  commentInput.value = "";
});

main.addEventListener("click", (e) => {
  replyDiv = e.target.closest(".reply");
  voteDiv = e.target.closest(".vote");
  plus = e.target.closest(".plus");
  minus = e.target.closest(".minus");
  if (replyDiv) {
    parent = replyDiv.closest(".comment");
    commentObject = datas.comments.find((com, i) => i == parent.id - 1);
    addCommentBtn.textContent = "Reply";
    replying = true;
  } else if (voteDiv) {
    parent = voteDiv.closest(".comment");
    parentDiv = voteDiv.parentElement;
    commentObject = datas.comments.find((com, i) => i == parent.id - 1);
    if (parentDiv.classList.contains("comment__part")) {
      if (plus) {
        commentObject.score++;
      } else if (minus) {
        commentObject.score--;
      }
      getComment(datas.comments);
    } else {
      replyObject = commentObject.replies.find(
        (rep, i) => parentDiv.id - 1 == i
      );
      if (plus) {
        replyObject.score++;
      } else if (minus) {
        replyObject.score--;
      }
      getComment(datas.comments);
    }
  }
});
