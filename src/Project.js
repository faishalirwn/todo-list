export default class Project {
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    };

    removeTodo(todoIndex) {
        this.todos.splice(todoIndex, 1);
    };

    changeTitle(title) {
        this.title = title;
    }
};