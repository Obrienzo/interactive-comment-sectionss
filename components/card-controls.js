import createCardButton from "./card-button.js";
import { deleteIcon } from "./icons.js";
import { editIcon } from "./icons.js";
import { replyIcon } from "./icons.js";

const createCardControls = (user, owner) => {
    const { username } = user;

    function replyHandler(ev) {
        ev.target.dispatchEvent(new CustomEvent("reply-card", {
            bubbles: true,
            detail: {
                username
            }
        }));
    }

    function deleteHandler(ev) {
        ev.target.dispatchEvent(new CustomEvent("delete-card", {
            bubbles: true
        }));
    }

    const controlsContainer = document.createElement("div");
    controlsContainer.classList.add("comment-card__controls");

    if (username === owner) {
        const deleteButton = createCardButton("delete", "Delete", deleteIcon, deleteHandler);
        const editButton = createCardButton("edit", "Edit", editIcon, replyHandler);

        controlsContainer.append(deleteButton, editButton);
    } else {
        const replyButton = createCardButton("reply", "Reply", replyIcon, replyHandler);

        controlsContainer.appendChild(replyButton);
    }

    return controlsContainer;

}

export default createCardControls;