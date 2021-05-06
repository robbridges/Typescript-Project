class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const node = document.importNode(this.templateElement.content, true);
    this.element = node.firstElementChild as HTMLFormElement;
    this.attachNode();
  }
  private attachNode() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();