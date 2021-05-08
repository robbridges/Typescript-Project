//autobind decorator
const autoBind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
  const orgionalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = orgionalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}




// Project Input class
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

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInput.value);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  private attachNode() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();