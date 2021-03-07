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

const Todo = (title, desc, due, priority, completed) => {
    const getTitle = () => title;
    const getDesc = () => desc;
    const getDue = () => due;
    const getPriority = () => priority;
    const getCompleted = () => completed;

    const setTitle = (newTitle) => {
        title = newTitle;
    };
    const setDesc = (newDesc) => {
        desc = newDesc;
    };
    const setDue = (newDue) => {
        due = newDue;
    };
    const setPriority = (newPriority) => {
        priority = newPriority;
    };

    const toggleCompleted = () => {
        completed = !completed;
    };

    return { getTitle, getDesc, getDue, getPriority, getCompleted, setTitle, setDesc, setDue, setPriority, toggleCompleted }
};

const Project = (title) => {
    let _todos = [];

    const getTitle = () => title;

    const setTitle = (newTitle) => {
        title = newTitle;
    };

    const addTodo = (todo) => {
        _todos.push(todo);
    };

    const removeTodo = (todoIndex) => {
        project.splice(todoIndex, 1);
    };

    return { getTitle, addTodo, removeTodo }
};

const view = (() => {

    const render = () => {
        const projectListEl = document.querySelector('#project-list');
        const projects = projectStorage.getProjects()
        projects.forEach((project, index) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = project.getTitle();
            li.appendChild(btn);
            projectListEl.appendChild(li);
        })
        console.log(JSON.stringify(projectStorage.getProjects()));        
    };

    return { render }
})();

const controller = (() => {
    const addProject = () => {
        const projectTitleInput = document.querySelector('#list-name-input');
        const newProject = Project(projectTitleInput.value);
        projectStorage.addProject(newProject);
        view.render();
    };
    return { addProject }
})();

const addProjectBtn = document.querySelector('#add-list-btn');

addProjectBtn.addEventListener('click', controller.addProject);