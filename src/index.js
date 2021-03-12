const projectStorage = (() => {
    let _projects = [];

    const getProjects = () => _projects;

    const addProject = (project) => {
        _projects.push(project);
    };

    const removeProject = (index) => {
        _projects.splice(index, 1);
    };

    const updateProject = (index, title) => {
        _projects[index].changeTitle(title);
    };
    
    return { addProject, removeProject, updateProject, getProjects }
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

    changeTitle(title) {
        this.title = title;
    }
};

const view = (() => {

    const render = () => {
        const projectListEl = document.querySelector('#project-list');
        while (projectListEl.firstChild) {            
            projectListEl.removeChild(projectListEl.lastChild);
        }
        const projects = projectStorage.getProjects()
        projects.forEach((project, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-index', index);

            const titleBtn = document.createElement('button');
            titleBtn.textContent = project.title;
            titleBtn.classList.add('project-title');

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '✖';
            removeBtn.classList.add('project-remove-btn');
            removeBtn.addEventListener('click', (e) => {
                const projectIndex = Number(e.target.parentNode.dataset.index);
                controller.removeProject(projectIndex);
            });

            const editInput = document.createElement('input');
            editInput.setAttribute('type', 'text');
            editInput.classList.add('project-edit-input', 'display-none');
            editInput.addEventListener('keypress', (e) => {
                const projectIndex = Number(e.target.parentNode.dataset.index);                
                if (e.key === 'Enter') {
                    const editInputVal = e.target.value;
                    controller.updateProject(projectIndex, editInputVal);
                }
            });
            editInput.addEventListener('blur', (e) => {
                titleBtn.classList.toggle('display-none');
                editInput.classList.toggle('display-none');
                const projectIndex = Number(e.target.parentNode.dataset.index);                
                const editInputVal = e.target.value;
                controller.updateProject(projectIndex, editInputVal);
            });
            
            const editBtn = document.createElement('button');
            editBtn.textContent = '✏️';
            editBtn.classList.add('project-edit-btn');
            editBtn.addEventListener('click', () => {
                titleBtn.classList.toggle('display-none');
                editInput.classList.toggle('display-none');
                editInput.value = project.title;
                editInput.focus();
            });            

            li.appendChild(titleBtn);
            li.appendChild(editInput);
            li.appendChild(editBtn);
            li.appendChild(removeBtn);

            projectListEl.appendChild(li);
        });
    };

    return { render }
})();

const controller = (() => {
    const addProject = () => {
        const projectTitleInput = document.querySelector('#project-name-input');
        const newProject = new Project(projectTitleInput.value);
        projectStorage.addProject(newProject);
        view.render();
    };

    const removeProject = (projectIndex) => {
        projectStorage.removeProject(projectIndex);
        view.render();
    }

    const updateProject = (projectIndex, title) => {
        projectStorage.updateProject(projectIndex, title);
        view.render();
    }

    const initializeProjects = () => {
        const sampleProject1 = new Project('Default');
        const sampleProject2 = new Project('Errands');
        projectStorage.addProject(sampleProject1);
        projectStorage.addProject(sampleProject2);
        view.render();
    }

    const initializeEventListener = () => {
        const addProjectBtn = document.querySelector('#add-project-btn');
        addProjectBtn.addEventListener('click', addProject);
    }

    return { addProject, removeProject, updateProject, initializeProjects, initializeEventListener }
})();

controller.initializeProjects();
controller.initializeEventListener();