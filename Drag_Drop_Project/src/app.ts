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
        if (title.trim().length === 0 ||
            description.trim().length === 0 ||
            people.trim().length === 0) {
            alert("Please fill all fields");
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
            console.log(title, description, people);
            this.clearAllFields();
        }
    }
    private configure() {
        this.formEl.addEventListener("submit", this.handleSubmitForm);
    }
}

const prjInput = new ProjectInput();
console.log(prjInput);