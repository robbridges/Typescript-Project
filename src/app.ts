/// <reference path="models/drag-drop-interfaces.ts" />
/// <reference path="models/project-model.ts" />
/// <reference path="state/project.state.ts" />
/// <reference path="util/validator-logic.ts" />
/// <reference path="decorators/autobind-decorator.ts" />
/// <reference path="component/component-class.ts" />
/// <reference path="component/project-item.ts" />
/// <reference path="component/project-list.ts" />
/// <reference path="component/project-input.ts" />

namespace App {

  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}

