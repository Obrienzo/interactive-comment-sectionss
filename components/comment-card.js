import createVoteControls from "./vote.js";
import createCardDetails from "./details.js";
import createCardControls from "./card-controls.js";
import createSendForm from "./send-form.js";

const createCommentCard = (data, owner) => {
    const { user, createdAt, content, score, replyingTo } = data;

    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-section__container");

    const wrapper = document.createElement("article");
    wrapper.classList.add("comment-card");
    wrapper.setAttribute("aria-label", "Comment Card");

    const userDetails = createCardDetails(user, createdAt, owner);

    const userComment = document.createElement("div");
    userComment.classList.add("comment-card__comment");

    const commentContent = document.createElement("p");
    commentContent.innerHTML = `<p>${replyingTo ? `<span class="reply-comment">@${replyingTo} </span>` : ""}${content}</p>`;

    userComment.appendChild(commentContent);

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

    commentContainer.addEventListener("delete-card", () => {
        commentContainer.remove();
    });

    wrapper.addEventListener("edit-comment", () => {
        const updateForm = createSendForm(owner, "UPDATE", replyingTo, content);
        commentContent.classList.add("hide");
        userComment.appendChild(updateForm);

    });

    wrapper.addEventListener("update-comment", (ev) => {
        const msg = ev.detail.editedContent;
        commentContent.classList.remove("hide");
        commentContent.innerHTML = `<p>${replyingTo ? `<span class="reply-comment">@${replyingTo} </span>` : ""}${msg}</p>`;
    })

    return commentContainer;
}

export default createCommentCard;