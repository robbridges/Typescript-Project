namespace App {
  // Project Input class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

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
}