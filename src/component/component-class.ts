namespace App {
  // Component Base Class 

  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string, 
      hostElementId: string,
      insertAtStart: boolean, 
      newElementId?: string,
      
      ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
      
        this.hostElement = document.getElementById(hostElementId)! as T;

        const node = document.importNode(this.templateElement.content, true);
        this.element = node.firstElementChild as U;

        if (newElementId) {
          this.element.id = newElementId;
        
        }
        this.attachNode(insertAtStart);
        
    }
    private attachNode(insertAtStart: boolean) {
      this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void; 
    abstract renderContent(): void;
  }
}