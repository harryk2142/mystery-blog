import { el, mount } from "https://esm.sh/redom";
import u from "https://esm.sh/umbrellajs";
import { createCommentBox } from "./commentBlock";
import { fillCommentsWithReplies } from "./comment-service";
import { loadCommentsFromFirebase } from "./comment-firebase-bridge";

const createCommentsBox = (postId: string) => {
  loadCommentsFromFirebase(postId).then((comments) => {
    if (comments.length > 0) {
      const commentsCounter = comments.length;
      u("#comments-counter").text(commentsCounter.toString());
      const commentsWithReplies = fillCommentsWithReplies(comments);

      commentsWithReplies.forEach((element) => {
        const createdBox = createCommentBox(element);
        const commentsDiv = document.querySelector("#comments");
        if (commentsDiv) {
          mount(commentsDiv, createdBox);
        }
      });
    } else {
      const noCommentsSpan = el("span");
      noCommentsSpan.innerText = "Keine Kommentare vorhanden";
      document.getElementById("comments")?.appendChild(noCommentsSpan);
    }
  });
};

export { createCommentsBox };
