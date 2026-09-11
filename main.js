import createCommentSection from "./components/comment-section.js";
import createSendForm from "./components/send-form.js";

window.addEventListener("load", async () => {
    try {
        const response = await fetch("./data.json");
        
        if (!response.ok) {
            throw new Error(`Failed to fetch the comments: ${response.status} ${response.statusText}`);
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

        const commentList = comments.map((comment) => createCommentSection(comment, user.username));

        commentArea.append(...commentList);

        const sendForm = createSendForm(user, "SEND");

        app.append(commentArea, sendForm);

        document.body.append(app);

        commentArea.addEventListener("reply-relay", (ev) => {
            const card = ev.target;
            const replyingTo = ev.detail.replyingTo;
            console.log(replyingTo);
            const replyForm = createSendForm(user, "REPLY", replyingTo);
            card.after(replyForm);
        });

        app.addEventListener("send-comment", (ev) => {
            const createCard = createCommentSection(ev.detail, user.username);
            commentArea.appendChild(createCard);
        });


    } catch (error) {
        console.error("We couldn't load the comments. Please refresh the page or try again later.", error);
    }
})
