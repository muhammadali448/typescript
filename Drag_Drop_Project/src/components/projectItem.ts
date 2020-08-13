
/// <reference path="baseComponent.ts" />
/// <reference path="../decorators/autoBind.ts" />
/// <reference path="../models/dragDropInterface.ts" />
/// <reference path="../models/projectModel.ts" />
namespace App {
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
        implements Draggble {
        private project: Project;
        constructor(divElementId: string, project: Project) {
            super("single-project", divElementId, project.id, false);
            // console.log(project);
            this.project = project;
            this.configure();
            this.renderContent();
        }

        @AutoBind
        dragStartHandler(event: DragEvent): void {
            // console.log(event);
            event.dataTransfer!.setData("text/plain", this.project.id);
            event.dataTransfer!.effectAllowed = "move";
        }
        dragEndHandler(_: DragEvent): void {
            console.log("DragEnd");
        }

        public get persons(): string {
            return this.project.people === 1 ? "1 person" : `${this.project.people} persons`;
        }


        configure(): void {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent(): void {
            // console.log(this.project.title);
            this.element.querySelector("h2")!.textContent = this.project.title;
            this.element.querySelector("h3")!.textContent = `${this.persons} assigned`
            this.element.querySelector("p")!.textContent = this.project.description;
        }

    }
}