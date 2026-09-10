import createButton from "./button.js";

const createSendForm = (user, tag) => {
    const { image, username } = user;

    const container = document.createElement("form");
    container.classList.add("reply-card");

    const commentInput = document.createElement("textarea");
    commentInput.classList.add("repy-card__comment");
    commentInput.id = "user-reply";
    commentInput.name = "user-reply";
    commentInput.placeholder = "Add a comment...";
    commentInput.required = true;

    const replyAvatar = document.createElement("img");
    replyAvatar.classList.add("reply-card__avatar");
    replyAvatar.src = image.webp;
    replyAvatar.alt = `${username} profile picture`;

    const cardButton = createButton(tag);

    container.append(commentInput, replyAvatar, cardButton);

    function generateComment() {
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

    function generateReply() {
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
            }
        }));
    }

    if (tag === "SEND") {
        container.addEventListener("submit", (ev) => {
            ev.preventDefault();
            generateComment();
            container.reset();
        })
    } else if (tag === "REPLY") {
        container.addEventListener("submit", (ev) => {
            ev.preventDefault();
            generateReply();
            container.reset();
            container.remove();
        })
    }

    return container;

}

export default createSendForm;