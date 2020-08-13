
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
