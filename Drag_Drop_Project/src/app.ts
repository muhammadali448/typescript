
interface Draggble {
    dragStartHandler(event: DragEvent): void
    dragEndHandler(event: DragEvent): void
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void
    dropHandler(event: DragEvent): void
    dragLeaveHandler(event: DragEvent): void
}

enum ProjectStatus {
    ACTIVE,
    FINISHED
}

class Project {
    id: string;
    status: ProjectStatus
    constructor(public title: string,
        public description: string, public people: number,
    ) {
        this.id = Math.random().toString();
        this.status = ProjectStatus.ACTIVE
    }
}

type Listener<T> = (projects: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

//  singleton class
class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    moveProject(projectId: string, projectNewStatus: ProjectStatus) {
        const project = this.projects.find(pr => pr.id === projectId);
        if (project && project.status !== projectNewStatus) {
            project.status = projectNewStatus;
            this.updateListener();
        }
    }

    private updateListener() {
        for (const listenerFn of this.listeners) {
            listenerFn([...this.projects]);
        }
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            title, description, people);
        this.projects.push(newProject);
        this.updateListener();
    }
}

const prjState = ProjectState.getInstance();

interface applyValidate {
    value: string | number;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    required?: boolean
}

function validate(applyValidateInput: applyValidate) {
    let isValid = true;
    if (applyValidateInput.required) {
        isValid = isValid && applyValidateInput.value.toString().trim().length !== 0;
    }
    if (applyValidateInput.minLength != null &&
        typeof applyValidateInput.value === "string") {
        isValid = isValid && applyValidateInput.value.length >= applyValidateInput.minLength;
    }
    if (applyValidateInput.maxLength != null &&
        typeof applyValidateInput.value === "string") {
        isValid = isValid && applyValidateInput.value.length <= applyValidateInput.maxLength;
    }
    if (applyValidateInput.min != null &&
        typeof applyValidateInput.value === "number") {
        isValid = isValid && applyValidateInput.value >= applyValidateInput.min;
    }
    if (applyValidateInput.max != null &&
        typeof applyValidateInput.value === "number") {
        isValid = isValid && applyValidateInput.value <= applyValidateInput.max;
    }
    return isValid;
}

function AutoBind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const bindFunc = originalMethod.bind(this);
            return bindFunc
        }
    }
    return adjDescriptor;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    divEl: T;
    element: U;

    constructor(templateId: string,
        divElementId: string,
        newElementId: string,
        isInsertStart: boolean) {
        console.log(templateId, divElementId, newElementId, isInsertStart)
        this.templateEl = document.getElementById(templateId)! as HTMLTemplateElement;
        this.divEl = document.getElementById(divElementId)! as T;
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(isInsertStart);
    }
    private attach(isInsertStart: boolean) {
        this.divEl.insertAdjacentElement(isInsertStart ? "afterbegin" : "beforeend", this.element);
    }
    abstract configure(): void
    abstract renderContent(): void
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
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

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    renderContent(): void {
        // throw new Error("Method not implemented.");
    }
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;
    constructor() {
        super("project-input", "app", "user-input", true);

        this.titleInputEl = this.element.querySelector("#title")! as HTMLInputElement;
        this.descriptionInputEl = this.element.querySelector("#description")! as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector("#people")! as HTMLInputElement;
        this.configure();
    }
    private takeUserInputs(): [string, string, number] | void {
        const title = this.titleInputEl.value;
        const description = this.descriptionInputEl.value;
        const people = this.peopleInputEl.value;
        const titleValid: applyValidate = {
            required: true,
            value: title
        }
        const desValid: applyValidate = {
            required: true,
            value: description,
            minLength: 5
        }
        const peopleValid: applyValidate = {
            required: true,
            value: +people,
            min: 1,
            max: 5
        }
        if (!validate(titleValid) ||
            !validate(desValid) ||
            !validate(peopleValid)) {
            alert("Please fill all input fields");
        }
        else {
            return [title, description, +people];
        }
    }
    private clearAllFields() {
        this.titleInputEl.value = "";
        this.descriptionInputEl.value = "";
        this.peopleInputEl.value = "";
    }
    @AutoBind
    private handleSubmitForm(e: Event) {
        e.preventDefault();
        const userInputs = this.takeUserInputs();
        if (Array.isArray(userInputs)) {
            const [title, description, people] = userInputs;
            // console.log(title, description, people);
            prjState.addProject(title, description, people);
            this.clearAllFields();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.handleSubmitForm);
    }
}

const prjInput = new ProjectInput();
console.log(prjInput);

const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");