
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
    private handleSubmitForm(e: Event) {
        e.preventDefault();
    }
    private configure() {
        this.formEl.addEventListener("submit", this.handleSubmitForm.bind(this));
    }
}

const prjInput = new ProjectInput();
console.log(prjInput);