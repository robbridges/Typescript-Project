//validation logic 
interface Validate {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validateObject = (validatableInput: Validate) => {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    console.log(`required passed`)
  }
  if (
    validatableInput.minLength != null && 
    typeof validatableInput.value ==='string'
    ) {
    
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    console.log(`min length test passed`);
    
  } 
  if (
    validatableInput.maxLength != null && 
    typeof validatableInput.value ==='string'
    ) {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    console.log(`max length passed`);
  }
  if (
    validatableInput.min != null  && 
    typeof validatableInput.value === 'number'
    ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
    console.log(`min number passed`)
  }
  if (
    validatableInput.max != null &&
     typeof validatableInput.value ==='number'
     ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
    console.log('max number passed')
  }
  return isValid;
}




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
    this.attachNode()
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
      console.log(validateObject(titleValidate), validateObject(descriptionValidate),)
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
      console.log(title, desc, people);
      this.clearInput();
    }
    

  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  private attachNode() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();