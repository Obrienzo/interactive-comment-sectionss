const createCardButton = (type, text, icon, buttonHandler) => {
    const button = document.createElement("button");
    button.classList.add("btn", `btn-${type}`);
    button.setAttribute("aria-label", `${type} button`);
    button.type = "button";
    button.addEventListener("click", buttonHandler);

    button.innerHTML = `
        ${icon}
        <span>${text}</span>
    `;

    return button;

}

export default createCardButton;