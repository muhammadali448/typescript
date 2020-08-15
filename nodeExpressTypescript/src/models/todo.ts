export class Todo {
    constructor(private id: string, private title: string) {
    }
    public get getTodo(): { id: string, title: string } {
        return {
            id: this.id,
            title: this.title
        }
    }
}