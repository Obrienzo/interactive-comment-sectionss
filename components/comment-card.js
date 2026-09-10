import createVoteControls from "./vote.js";
import createCardDetails from "./details.js";

const createCommentCard = ({ user, createdAt, content, score, replyingTo }) => {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-section__container");

    const wrapper = document.createElement("article");
    wrapper.classList.add("comment-card");
    wrapper.setAttribute("aria-label", "Comment Card");

    const userDetails = createCardDetails(user, createdAt);

    const userComment = document.createElement("p");
    userComment.classList.add("comment-card__comment");
    userComment.innerHTML = `${replyingTo ? `<span class="reply-comment">@${replyingTo} </span>` : ""}${content}`;

    const wrapperActions = document.createElement("div");
    wrapperActions.classList.add("comment-card__card-actions");

    const voteControls = createVoteControls(user, score);
    
    const replyButton = document.createElement("button");
    replyButton.classList.add("btn", "btn-reply");
    replyButton.setAttribute("aria-label", "reply button");
    replyButton.type = "button";
    replyButton.innerHTML = `
        <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
        <span>Relpy</span>
    `;

    replyButton.addEventListener("click", () => {
        wrapper.dispatchEvent(new CustomEvent("reply-card", {
            bubbles: true,
            detail: {
                replyName: user.username
            }
        }));
    });

    wrapperActions.append(voteControls, replyButton);

    wrapper.append(userDetails, userComment, wrapperActions);

    commentContainer.appendChild(wrapper);

    commentContainer.addEventListener("send-reply", (ev) => {
        commentContainer.dispatchEvent(new CustomEvent("verify-structure", {
            bubbles: true,
            detail: ev.detail
        }));
    })

    return commentContainer;
}

export default createCommentCard;