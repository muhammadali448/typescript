/// <reference path="baseComponent.ts" />
/// <reference path="../decorators/autoBind.ts" />
/// <reference path="../state/projectState.ts" />
/// <reference path="../models/dragDropInterface.ts" />
/// <reference path="../models/projectModel.ts" />
namespace App {
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
        assignedProjects: Project[];
        constructor(private type: "finished" | "active") {
            super("project-list", "app", `${type}-projects`, false);
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        @AutoBind
        dragOverHandler(event: DragEvent): void {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const ulEl = this.element.querySelector("ul")!;
                ulEl.classList.add("droppable");
            }
        }
        dropHandler(event: DragEvent): void {
            const prjId = event.dataTransfer!.getData("text/plain");
            prjState.moveProject(prjId, this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
        }
        @AutoBind
        dragLeaveHandler(_: DragEvent): void {
            const ulEl = this.element.querySelector("ul")!;
            ulEl.classList.remove("droppable");
        }
        configure(): void {
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("drop", this.dropHandler);
            prjState.addListener((projects: Project[]) => {
                const filterProjects = projects.filter(p => {
                    if (this.type === "active") {
                        return p.status === ProjectStatus.ACTIVE
                    }
                    return p.status === ProjectStatus.FINISHED;
                })
                this.assignedProjects = filterProjects;
                this.renderProjects();
            });
        }
        private renderProjects() {
            const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
            listEl.innerHTML = "";
            // console.log(this.assignedProjects);
            for (const project of this.assignedProjects) {
                new ProjectItem(listEl.id, project);
            }

        }
        renderContent() {
            const listId = `${this.type}-project-list`;
            this.element.querySelector("ul")!.id = listId;
            this.element.querySelector("h2")!.textContent = `${this.type.toUpperCase()} PROJECTS`
        }
    }
}