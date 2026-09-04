import createCommentSection from "./components/comment-section.js";
import createReplyCard from "./components/reply-card.js";

window.addEventListener("load", async () => {
    try {
        const response = await fetch("./data.json");
        
        if (!response.ok) {
            throw new Error("Failed to fetch the data", response.status);
        }

        const data = await response.json();

        let comments = [];
        let user = {};
        
        comments = data.comments;
        user = data.currentUser;

        const app = document.createElement("div");
        app.id = "app";

        const commentArea = document.createElement("div");
        commentArea.classList.add("app__comment-area");

        const commentList = comments.map((comment) => createCommentSection(comment));

        commentArea.append(...commentList);

        const replyCard = createReplyCard(user);

        app.append(commentArea, replyCard);

        document.body.append(app);

    } catch {
        console.error("No data got");
    }
})
