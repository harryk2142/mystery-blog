import { type Comment } from "./comment-firebase-bridge";

const fillCommentsWithReplies = (comments: Comment[]) => {
  function addReplies(comments: Comment[]) {
    comments.forEach((comment) => {
      const replies = comments.filter((c) => c.parentID === comment.id);
      if (replies.length > 0) {
        comment.replies = replies;
        addReplies(replies);
      }
    });
  }
  addReplies(comments);
  const topLevelComments = comments.filter((comment) => !comment.parentID);

  return topLevelComments;
};

export { fillCommentsWithReplies };
