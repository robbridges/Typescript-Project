"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const node = document.importNode(this.templateElement.content, true);
        this.element = node.firstElementChild;
        this.attachNode();
    }
    attachNode() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const projectInput = new ProjectInput();
//# sourceMappingURL=app.js.map