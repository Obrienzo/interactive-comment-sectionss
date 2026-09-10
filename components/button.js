const createButton = (tag) => {
    const formButton = document.createElement("button");
    formButton.type = "submit"
    formButton.classList.add("btn", "btn-send");
    formButton.textContent = tag;

    return formButton;
}

export default createButton;