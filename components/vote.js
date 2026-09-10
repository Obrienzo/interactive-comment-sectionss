const createVoteControls = (user, score) => {
     /**
     * Since each card has it's own score,
     * this means that each component will have
     * its own count and the update of the score,
     * will be localized as well. I will use custom Events.
     */

    let count = score;

    const voteWrapper = document.createElement("div");
    voteWrapper.classList.add("comment-card__vote-controls");

    const decrementButton = document.createElement("button");
    decrementButton.classList.add("btn", "btn__control", "btn__control--minus");
    decrementButton.setAttribute("aria-label", "decrement button");
    decrementButton.innerHTML = `
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/></svg>
    `;

    const userVoteCount = document.createElement("span");
    userVoteCount.classList.add("comment-card__vote-count");
    userVoteCount.setAttribute("aria-label", "user vote score");
    userVoteCount.textContent = count;

    const incrementButton = document.createElement("button");
    incrementButton.classList.add("btn", "btn__control", "btn__control--plus");
    incrementButton.setAttribute("aria-label", "increment button");
    incrementButton.innerHTML =`
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/></svg>
    `;

    voteWrapper.append(decrementButton, userVoteCount, incrementButton);

    decrementButton.addEventListener("click", (ev) => {
        count--;
        if (count < 1) {
            userVoteCount.textContent = 0;
            count = 0
        }
        userVoteCount.textContent = count;
        decrementButton.dispatchEvent(new CustomEvent("down-vote", {
            bubbles: true,
            detail: {
                name: user.username,
                votes: count
            }
        }));
    });

    incrementButton.addEventListener("click", (ev) => {
        count++;
        userVoteCount.textContent = count;
        incrementButton.dispatchEvent(new CustomEvent("up-vote", {
            bubbles: true,
            detail: {
                name: user.username,
                votes: count
            }
        }));
    });

    return voteWrapper;
}

export default createVoteControls;