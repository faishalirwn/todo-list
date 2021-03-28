export default class Todo {
    constructor(title, desc, date, time, completed) {
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.time = time;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    };
};