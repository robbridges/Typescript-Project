"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const autoBind = (_, _2, descriptor) => {
    const orgionalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = orgionalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
};
function validateObject(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim.length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.max;
    }
    return isValid;
}
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
        this.configure();
        this.attachNode();
    }
    gatherInput() {
        const enteredTitle = this.titleInput.value;
        const enteredDescription = this.descriptionInput.value;
        const numberOfPeople = this.peopleInputElement.value;
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || numberOfPeople.trim().length === 0) {
            alert('Invalud input, please enter a value for all 3 areas');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, parseInt(numberOfPeople)];
        }
    }
    clearInput() {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInput();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attachNode() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    autoBind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
//# sourceMappingURL=app.js.map