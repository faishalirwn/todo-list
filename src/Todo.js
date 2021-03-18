export default class Todo {
    constructor(title, desc, due, priority, completed) {
        this.title = title;
        this.desc = desc;
        this.due = due;
        this.priority = priority;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    };
};