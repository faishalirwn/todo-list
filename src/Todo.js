export default class Todo {
    constructor(title, desc, date, time, completed, projectIndex) {
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.time = time;
        this.completed = completed;
        this.projectIndex = projectIndex;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    };
};