import createCommentCard from "./comment-card.js"

const createCommentSection = (data) => {
    const sectionWrapper = document.createElement("section");
    sectionWrapper.classList.add("comment-section");

    const commentCard = createCommentCard(data);

    const replySection = document.createElement("div");
    replySection.classList.add("comment-section__replies");

    const replies = data.replies.map((reply) => createCommentCard(reply));

    replySection.append(...replies);
    
    if (!(data.replies.length <= 0)) {
        sectionWrapper.append(commentCard, replySection);
    } else {
        sectionWrapper.append(commentCard);
    }

    sectionWrapper.addEventListener("verify-structure", (ev) => {
        const card = createCommentCard(ev.detail);
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
    })


    return sectionWrapper;

}

export default createCommentSection;