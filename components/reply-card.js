const createReplyCard = ({ image, username }) => {
    const container = document.createElement("article");
    container.classList.add("reply-card");

    const commentInput = document.createElement("textarea");
    commentInput.classList.add("repy-card__comment");
    commentInput.id = "user-reply";
    commentInput.name = "user-reply";
    commentInput.placeholder = "Add a comment...";

    const replyAvatar = document.createElement("img");
    replyAvatar.classList.add("reply-card__avatar");
    replyAvatar.src = image.webp;
    replyAvatar.alt = `${username} profile picture`;

    const sendButton = document.createElement("button");
    sendButton.classList.add("btn", "btn-send");
    sendButton.textContent = "SEND";

    container.append(commentInput, replyAvatar, sendButton);

    return container;

}

export default createReplyCard;