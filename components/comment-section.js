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

    return sectionWrapper;

}

export default createCommentSection;