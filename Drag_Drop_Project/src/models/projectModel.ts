namespace App {
    export enum ProjectStatus {
        ACTIVE,
        FINISHED
    }

    export class Project {
        id: string;
        status: ProjectStatus
        constructor(public title: string,
            public description: string, public people: number,
        ) {
            this.id = Math.random().toString();
            this.status = ProjectStatus.ACTIVE
        }
    }
}