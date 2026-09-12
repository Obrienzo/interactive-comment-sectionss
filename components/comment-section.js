import createCommentCard from "./comment-card.js"

const createCommentSection = (data, owner) => {
    const sectionWrapper = document.createElement("section");
    sectionWrapper.classList.add("comment-section");

    const commentCard = createCommentCard(data, owner);

    const replySection = document.createElement("div");
    replySection.classList.add("comment-section__replies");
    
    if (data.replies && !(data.replies.length <= 0)) {
        const replies = data.replies.map((reply) => createCommentCard(reply, owner));
        replySection.append(...replies);
        sectionWrapper.append(commentCard, replySection);
    } else {
        sectionWrapper.append(commentCard);
    }

    sectionWrapper.addEventListener("verify-structure", (ev) => {
        const card = createCommentCard(ev.detail, owner);
        const hasSibling = ev.target.nextElementSibling;
        const hasParent = ev.target.parentElement;

        if (hasParent && hasParent.classList.contains("comment-section__replies")) {
            replySection.appendChild(card);
        } else if (hasSibling && hasSibling.classList.contains("comment-section__replies")) {
            replySection.appendChild(card);
        } else if (hasSibling === null) {
            replySection.appendChild(card);
            sectionWrapper.appendChild(replySection);
        }
    });

    sectionWrapper.addEventListener("delete-card", () => {
        if (replySection.childNodes.length < 1) {
            replySection.remove();
        }
    })

    return sectionWrapper;

}

export default createCommentSection;