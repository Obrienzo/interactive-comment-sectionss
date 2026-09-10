const createCardDetails = (user, createdAt) => {
    const { image, username } = user;
    const userDetails = document.createElement("div");
    userDetails.classList.add("comment-card__user-data");

    const userAvatar = document.createElement("img");
    userAvatar.classList.add("user-data__avatar");
    userAvatar.src = image.webp;
    userAvatar.alt = `${username} profile picture`;

    const userName = document.createElement("span");
    userName.classList.add("user-data__name");
    userName.textContent = username;

    const postTimeline = document.createElement("span");
    postTimeline.classList.add("user-data__post-timeline");
    postTimeline.textContent = createdAt;

    userDetails.append(userAvatar, userName, postTimeline);

    return userDetails;
}

export default createCardDetails;