/// <reference path="models/drag-drop-interfaces.ts" />
/// <reference path="models/project-model.ts" />
/// <reference path="state/project.state.ts" />
/// <reference path="util/validator-logic.ts" />
/// <reference path="decorators/autobind-decorator.ts" />
/// <reference path="component/component-class.ts" />


namespace App {

  

  // projectItem class

  class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
      if (this.project.people === 1) {
        return '1 person';
      } else {
        return `${this.project.people} persons`;
      }
    }
    
    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @autoBind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }

    @autoBind
    dragEndHandler(_: DragEvent) {
      console.log('Drag has ended');
    }


    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;

    }
  }

  // ProjectList class

  class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    private renderProjects() {
      const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
      listEl.innerHTML = '';
      for (const projectItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, projectItem);  
      }
    }

    @autoBind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
      }
    }

    @autoBind
    dropHandler(event: DragEvent) {
      event.preventDefault();
      const projectId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);

    }

    @autoBind
    dragLeaveHandler(event: DragEvent) {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.remove('droppable');
    }

    configure() {

      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);


      projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Active;
        }
        return project.status === ProjectStatus.Finished;
      });


      this.assignedProjects = relevantProjects;
      this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Projects';
    }

    
  }





  // Project Input class
  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
      super('project-input', 'app', true, 'user-input')

      this.titleInput = this.element.querySelector('#title')as HTMLInputElement;
      this.descriptionInput = this.element.querySelector('#description') as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

      this.configure();
      
    }

    
    // type script tuple that first 2 elements are string, third is number;
    private gatherInput(): [string, string, number] | void {
      const enteredTitle = this.titleInput.value;
      const enteredDescription = this.descriptionInput.value;
      const numberOfPeople = this.peopleInputElement.value;

      const titleValidate: Validate = {
        value: enteredTitle,
        required: true,
      }
      const descriptionValidate: Validate ={
        value: enteredDescription,
        required: true,
        minLength: 5,
      }
      const numberOfPeopleValidate: Validate = {
        value: parseInt(numberOfPeople),
        required: true,
        min: 1,
        max: 5,
      }

      // validator not working always returns false even if requirements should be met
      if (
        !validateObject(titleValidate) ||
        !validateObject(descriptionValidate) ||
        !validateObject(numberOfPeopleValidate)
        ) {
        alert('Invalid input, please enter a value for all 3 areas');
        return;
      } else {
        return [enteredTitle, enteredDescription, parseInt(numberOfPeople)];
      }
    }

    private clearInput() {
      this.titleInput.value = '';
      this.descriptionInput.value = '';
      this.peopleInputElement.value = '';
    }


    @autoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInput();
      }
      

    }

    configure() {
      this.titleInput = this.element.querySelector('#title')as HTMLInputElement;
      this.descriptionInput = this.element.querySelector('#description') as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
      this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}
    
  }

  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}

