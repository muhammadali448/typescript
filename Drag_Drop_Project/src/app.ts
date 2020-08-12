
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

type Listener = (projects: Project[]) => void;

//  singleton class
class ProjectState {
    private projects: Project[] = [];
    private listeners: Listener[] = [];
    private static instance: ProjectState;

    private constructor() { }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            title, description, people);
        this.projects.push(newProject);
        // this.projects = [...this.projects, newProject];
        for (const listenerFn of this.listeners) {
            listenerFn([...this.projects])
        }
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

class ProjectList {
    templateEl: HTMLTemplateElement;
    divEl: HTMLDivElement;
    element: HTMLElement;
    private type: string;
    assignedProjects: Project[];
    constructor(t: "finished" | "active") {
        this.type = t;
        this.templateEl = document.getElementById("project-list")! as HTMLTemplateElement;
        this.divEl = document.getElementById("app")! as HTMLDivElement;
        this.assignedProjects = [];
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
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
        this.attach();
        this.renderContent();
    }
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listEl.innerHTML = "";
        for (const project of this.assignedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = project.title;
            listEl.appendChild(listItem);
        }

    }
    private attach() {
        this.divEl.insertAdjacentElement("beforeend", this.element);
    }
    private renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = `${this.type.toUpperCase()} PROJECTS`
    }
}

class ProjectInput {
    templateEl: HTMLTemplateElement;
    divEl: HTMLDivElement;
    formEl: HTMLFormElement;
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;
    constructor() {
        this.templateEl = document.getElementById("project-input")! as HTMLTemplateElement;
        this.divEl = document.getElementById("app")! as HTMLDivElement;
        const importedNode = document.importNode(this.templateEl.content, true);
        this.formEl = importedNode.firstElementChild as HTMLFormElement;
        this.formEl.id = "user-input";
        this.titleInputEl = this.formEl.querySelector("#title")! as HTMLInputElement;
        this.descriptionInputEl = this.formEl.querySelector("#description")! as HTMLInputElement;
        this.peopleInputEl = this.formEl.querySelector("#people")! as HTMLInputElement;
        this.attach();
        this.configure();
    }
    private attach() {
        this.divEl.insertAdjacentElement("afterbegin", this.formEl);
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
    private configure() {
        this.formEl.addEventListener("submit", this.handleSubmitForm);
    }
}

const prjInput = new ProjectInput();
console.log(prjInput);

const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");