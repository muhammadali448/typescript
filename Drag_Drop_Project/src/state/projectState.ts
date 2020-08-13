import { Project, ProjectStatus } from "../models/projectModel";
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

export const prjState = ProjectState.getInstance();
