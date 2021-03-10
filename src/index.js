const projectStorage = (() => {
    let _projects = [];

    const getProjects = () => _projects;

    const addProject = (project) => {
        _projects.push(project);
    };

    const removeProject = (index) => {
        _projects.splice(index, 1);
    };
    
    return { addProject, removeProject, getProjects }
})();

class Todo {
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

class Project {
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
};

const view = (() => {

    const render = () => {
        const projectListEl = document.querySelector('#project-list');
        while (projectListEl.firstChild) {            
            projectListEl.removeChild(projectListEl.lastChild);
        }
        const projects = projectStorage.getProjects()
        projects.forEach((project) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = project.title;
            li.appendChild(btn);
            projectListEl.appendChild(li);
        });
    };

    return { render }
})();

const controller = (() => {
    const addProject = () => {
        const projectTitleInput = document.querySelector('#list-name-input');
        const newProject = new Project(projectTitleInput.value);
        projectStorage.addProject(newProject);
        view.render();
    };

    const initializeProjects = () => {
        const sampleProject1 = new Project('Default');
        const sampleProject2 = new Project('Errands');
        projectStorage.addProject(sampleProject1);
        projectStorage.addProject(sampleProject2);
    }

    return { addProject, initializeProjects }
})();

const addProjectBtn = document.querySelector('#add-list-btn');
addProjectBtn.addEventListener('click', controller.addProject);

controller.initializeProjects();