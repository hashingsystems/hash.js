// Define our constructor
function Modal() {
    // Create global element references
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;

    // Determine proper prefix
    this.transitionEnd = transitionSelect();

    // Define option defaults
    var defaults = {
        autoOpen: false,
        className: 'fade-and-drop',
        closeButton: true,
        content: "",
        maxWidth: 600,
        minWidth: 280,
        overlay: false
    };

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
        this.options = extendDefaults(defaults, arguments[0]);
    }

    if (this.options.autoOpen === true) this.open();

}

// Public Methods
Modal.prototype.close = function () {
    var _ = this;
    this.modal.className = this.modal.className.replace(" hash-open", "");
    this.overlay.className = this.overlay.className.replace(" hash-open", "");
    this.modal.addEventListener(this.transitionEnd, function () {
        _.modal.parentNode.removeChild(_.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, function () {
        if (_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });
};

Modal.prototype.open = function () {
    buildOut.call(this);
    initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " hash-open hash-anchored" : " hash-open");
    //this.overlay.className = this.overlay.className + " hash-open";
    document.querySelector('.popup_close').onclick = function() {
        document.querySelector('.popup_outer_wrap').style.display = "none";
    };
};

// Private Methods
function buildOut() {

    var content, contentHolder, docFrag;

    /*
     * If content is an HTML string, append the HTML string.
     * If content is a domNode, append its content.
     */

    if (typeof this.options.content === "string") {
        content = this.options.content;
    } else {
        content = this.options.content.innerHTML;
    }

    // Create a DocumentFragment to build with
    docFrag = document.createDocumentFragment();

    // Create modal element
    this.modal = document.createElement("div");
    this.modal.className = "hash-modal " + this.options.className;
    /*this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px";*/

    // If closeButton option is true, add a close button
    if (this.options.closeButton === true) {
        this.closeButton = document.getElementById('popup-close-btn');
    }

    // Create content area and append to modal
    contentHolder = document.createElement("div");
    contentHolder.className = "hash-content";
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    // Append modal to DocumentFragment
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);

}

imgchangeFunction = function () {
    var chboxs = document.getElementsByName("img_chkbox");
    var var_check = "";

    var img_all = document.getElementsByClassName("img_all");

    for(var i=0;i<chboxs.length;i++) {
        if(chboxs[i].checked){
            var_check = var_check.concat(chboxs[i].value);
        }
    }

    if(var_check == 'img_one'){
        document.querySelector('.img_two').style.display = "none";
        document.querySelector('.img_three').style.display = "none";
        document.querySelector('.img_four').style.display = "none";
        document.querySelector('.img_one').style.display = "block";
    }
    if(var_check == 'img_oneimg_two') {
        document.querySelector('.img_one').style.display = "none";
        document.querySelector('.img_three').style.display = "none";
        document.querySelector('.img_four').style.display = "none";
        document.querySelector('.img_two').style.display = "block";
    }
    if(var_check == 'img_oneimg_twoimg_three'){
        document.querySelector('.img_one').style.display = "none";
        document.querySelector('.img_two').style.display = "none";
        document.querySelector('.img_four').style.display = "none";
        document.querySelector('.img_three').style.display = "block";
    }
    if(var_check == 'img_oneimg_twoimg_threeimg_four') {
        document.querySelector('.img_one').style.display = "none";
        document.querySelector('.img_two').style.display = "none";
        document.querySelector('.img_three').style.display = "none";
        document.querySelector('.img_four').style.display = "block";
    }
};

function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }
    return source;
}

function initializeEvents() {
    if (this.closeButton) {
        this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.overlay) {
        this.overlay.addEventListener('click', this.close.bind(this));
    }

}

function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
}
//exporting module
module.exports.Modal = Modal;
