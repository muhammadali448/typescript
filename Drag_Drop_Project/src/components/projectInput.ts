import { Component } from "./baseComponent";
import { prjState } from "../state/projectState";
import { validate, applyValidate } from "../utils/validation";
import { AutoBind } from "../decorators/autoBind";
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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
