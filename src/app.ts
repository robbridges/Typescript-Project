class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInputElement: HTMLInputElement;


  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const node = document.importNode(this.templateElement.content, true);
    this.element = node.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInput = this.element.querySelector('#title')as HTMLInputElement;
    this.descriptionInput = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attachNode();
  }

  private submitHandler(event: Event) {
    
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  private attachNode() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();