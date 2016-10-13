function Modal(options) {
    var MODAL,
        CLOSEBUTTON,
        OVERLAY;

    options = options ? options : {};
    options.content = options.content || "";
    options.width = options.width || 600;
    options.height = options.height || 400;
    options.closeOut = typeof options.closeOut !== "undefined" ? options.closeOut : true;


    // PÚBLICO

    this.show = showModal;
    this.close = closeModal;
    this.options = options;
    this.elements = {
        modal: MODAL,
        closeButton: CLOSEBUTTON,
        overlay: OVERLAY
    };


    // EXECUÇÃO

    if (!getElements())
        setModal();


    // FUNÇÕES

    function getElements() {
        MODAL = document.querySelector(".modal");
        CLOSEBUTTON = document.querySelector(".modal-button-close");
        OVERLAY = document.querySelector(".modal-overlay");

        return MODAL;
    }

    function setModal() {
        document.body.insertAdjacentHTML(
            "beforeend",
            '<div class="modal-overlay modal-overlay-closed">' +
                '<div class="modal modal-closed">' +
                    '<div class="modal-button-close">&#10006;</div>' +
                    '<div class="modal-content"></div>' +
                '</div>' +
            '</div>'
        );

        getElements();

        // eventos
        CLOSEBUTTON.onclick = closeModal;
        OVERLAY.onclick = function() {
            if (event.target === OVERLAY && OVERLAY.getAttribute("closeout") === "true")
                closeModal();
        };
    }

    function showModal() {
        // propriedades
        MODAL.querySelector(".modal-content").innerHTML = options.content;
        MODAL.style.width = options.width + "px";
        MODAL.style.height = options.height + "px";
        OVERLAY.setAttribute("closeout", options.closeOut);

        MODAL.classList.remove("modal-closed");
        MODAL.classList.add("modal-opened");
        OVERLAY.classList.remove("modal-overlay-closed");
        OVERLAY.classList.add("modal-overlay-opened");
    }

    function closeModal() {
        MODAL.classList.remove("modal-opened");
        MODAL.classList.add("modal-closed");
        OVERLAY.classList.remove("modal-overlay-opened");
        OVERLAY.classList.add("modal-overlay-closed");
    }
}
