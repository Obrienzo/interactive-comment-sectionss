import createButton from "./button.js";

const createSendForm = (user, tag, replyingTo = false, content) => {
    const { image, username } = user;

    const container = document.createElement("form");
    container.classList.add("reply-card", `reply-card--${tag.toLowerCase()}`);

    const commentInput = document.createElement("textarea");
    commentInput.classList.add("repy-card__comment");
    commentInput.id = "user-reply";
    commentInput.name = "user-reply";
    commentInput.placeholder = "Add a comment...";
    commentInput.required = true;
    if (tag === "UPDATE") {
        commentInput.value = content;
    } else {
        commentInput.value = "";
    }

    const replyAvatar = document.createElement("img");
    replyAvatar.classList.add("reply-card__avatar");
    replyAvatar.src = image.webp;
    replyAvatar.alt = `${username} profile picture`;

    const cardButton = createButton(tag);

    if (tag === "UPDATE") {
        container.append(commentInput, cardButton);
    } else {
        container.append(commentInput, replyAvatar, cardButton);
    }


    function generateSendComment() {
        container.dispatchEvent(new CustomEvent("send-comment", {
            bubbles: true,
            detail: {
                user: {
                    image: {
                        webp: image.webp
                    },
                    username
                },
                createdAt: "now",
                content: commentInput.value.trim(),
                score: 0,
            }
        }));
    }

    function generateSendReply() {
        container.dispatchEvent(new CustomEvent("send-reply", {
            bubbles: true,
            detail: {
                user: {
                    image: {
                        webp: image.webp
                    },
                    username
                },
                createdAt: "now",
                content: commentInput.value.trim(),
                score: 0,
                replyingTo: replyingTo
            }
        }));
    }

    function generateUpdatedComment() {
        container.dispatchEvent(new CustomEvent("update-comment", {
            bubbles: true,
            detail: {
                editedContent: commentInput.value
            }
        }))
    }

    if (tag === "SEND") {
        container.addEventListener("submit", (ev) => {
            ev.preventDefault();
            generateSendComment();
            container.reset();
        })
    } else if (tag === "REPLY") {
        container.addEventListener("submit", (ev) => {
            ev.preventDefault();
            generateSendReply();
            container.remove();
            container.reset();
        })
    } else if (tag === "UPDATE") {
        container.addEventListener("submit", (ev) => {
            ev.preventDefault();
            generateUpdatedComment();
            container.remove();
            container.reset();
        })
    }

    return container;

}

export default createSendForm;