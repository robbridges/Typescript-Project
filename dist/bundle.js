"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFuction) {
            this.listeners.push(listenerFuction);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, numOfPeople) {
            const newProject = new App.Project(Math.random().toString(), title, description, numOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(project => project.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFuction of this.listeners) {
                listenerFuction(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
    App.validateObject = (validatableInput) => {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
            console.log(`required passed`);
        }
        if (validatableInput.minLength != null &&
            typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
            console.log(`min length test passed`);
        }
        if (validatableInput.maxLength != null &&
            typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
            console.log(`max length passed`);
        }
        if (validatableInput.min != null &&
            typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min;
            console.log(`min number passed`);
        }
        if (validatableInput.max != null &&
            typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max;
            console.log('max number passed');
        }
        return isValid;
    };
})(App || (App = {}));
var App;
(function (App) {
    App.autoBind = (_, _2, descriptor) => {
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
})(App || (App = {}));
var App;
(function (App) {
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const node = document.importNode(this.templateElement.content, true);
            this.element = node.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attachNode(insertAtStart);
        }
        attachNode(insertAtStart) {
            this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return '1 person';
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(_) {
            console.log('Drag has ended');
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.persons + ' assigned';
            this.element.querySelector('p').textContent = this.project.description;
        }
    }
    __decorate([
        App.autoBind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        App.autoBind
    ], ProjectItem.prototype, "dragEndHandler", null);
    class ProjectList extends App.Component {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = '';
            for (const projectItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector('ul').id, projectItem);
            }
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            event.preventDefault();
            const projectId = event.dataTransfer.getData('text/plain');
            App.projectState.moveProject(projectId, this.type === 'active' ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLeaveHandler(event) {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter(project => {
                    if (this.type === 'active') {
                        return project.status === App.ProjectStatus.Active;
                    }
                    return project.status === App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' Projects';
        }
    }
    __decorate([
        App.autoBind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.autoBind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.autoBind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    class ProjectInput extends App.Component {
        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInput = this.element.querySelector('#title');
            this.descriptionInput = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
        }
        gatherInput() {
            const enteredTitle = this.titleInput.value;
            const enteredDescription = this.descriptionInput.value;
            const numberOfPeople = this.peopleInputElement.value;
            const titleValidate = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidate = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const numberOfPeopleValidate = {
                value: parseInt(numberOfPeople),
                required: true,
                min: 1,
                max: 5,
            };
            if (!App.validateObject(titleValidate) ||
                !App.validateObject(descriptionValidate) ||
                !App.validateObject(numberOfPeopleValidate)) {
                alert('Invalid input, please enter a value for all 3 areas');
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
                App.projectState.addProject(title, desc, people);
                this.clearInput();
            }
        }
        configure() {
            this.titleInput = this.element.querySelector('#title');
            this.descriptionInput = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.element.addEventListener('submit', this.submitHandler);
        }
        renderContent() { }
    }
    __decorate([
        App.autoBind
    ], ProjectInput.prototype, "submitHandler", null);
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map