import createVoteControls from "./vote.js";
import createCardDetails from "./details.js";
import createCardControls from "./card-controls.js";

const createCommentCard = (data, owner) => {
    const { user, createdAt, content, score, replyingTo } = data;

    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-section__container");

    const wrapper = document.createElement("article");
    wrapper.classList.add("comment-card");
    wrapper.setAttribute("aria-label", "Comment Card");

    const userDetails = createCardDetails(user, createdAt, owner);

    const userComment = document.createElement("p");
    userComment.classList.add("comment-card__comment");
    userComment.innerHTML = `${replyingTo ? `<span class="reply-comment">@${replyingTo} </span>` : ""}${content}`;

    const wrapperActions = document.createElement("div");
    wrapperActions.classList.add("comment-card__card-actions");

    const voteControls = createVoteControls(user, score);
    
    const cardControls = createCardControls(user, owner);

    wrapperActions.append(voteControls, cardControls);

    wrapper.append(userDetails, userComment, wrapperActions);

    commentContainer.appendChild(wrapper);

    wrapper.addEventListener("reply-card", (ev) => {
        const username = ev.detail.username;
        wrapper.dispatchEvent(new CustomEvent("reply-relay", {
            bubbles: true,
            detail: {
                replyingTo: username
            }
        }));
    });

    commentContainer.addEventListener("send-reply", (ev) => {
        commentContainer.dispatchEvent(new CustomEvent("verify-structure", {
            bubbles: true,
            detail : ev.detail
        }));
    });

    commentContainer.addEventListener("delete-card", (ev) => {
        commentContainer.remove();
    });

    return commentContainer;
}

export default createCommentCard;