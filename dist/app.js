"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const node = document.importNode(this.templateElement.content, true);
        this.element = node.firstElementChild;
        this.element.id = 'user-input';
        this.titleInput = this.element.querySelector('#title');
        this.descriptionInput = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.attachNode();
    }
    attachNode() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const projectInput = new ProjectInput();
//# sourceMappingURL=app.js.map