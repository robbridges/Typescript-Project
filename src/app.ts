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
  // type script tuple that first 2 elements are string, third is number;
  private gatherInput(): [string, string, number] {
    const enteredTitle = this.titleInput.value;
    const enteredDescription = this.descriptionInput.value;
    const numberOfPeople = this.peopleInputElement.value;
    //this is a terrible way to validate this, it doesnt scale and doesn't really do checks besides if the value is null, but it will work to make sure that it validates until a better solution is made.
    if (enteredTitle.trim(). length === 0 || enteredDescription.trim().length === 0 || numberOfPeople.trim().length === 0) {

    }
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherInput();
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  private attachNode() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();