export default class Todo {
    constructor(title, desc, due, completed) {
        this.title = title;
        this.desc = desc;
        this.due = due;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    };
};