import projectStorage from "./projectStorage";
import Todo from "./Todo";
import Project from "./Project";

const view = (() => {
    const renderProjects = () => {
        const projectListEl = document.querySelector('#project-list');
        while (projectListEl.firstChild) {            
            projectListEl.removeChild(projectListEl.lastChild);
        }
        const projects = projectStorage.getProjects();
        projects.forEach((project, index) => {
            const li = document.createElement('li');
            // li.setAttribute('data-index', index);

            const titleBtn = document.createElement('button');
            titleBtn.textContent = project.title;
            titleBtn.classList.add('project-title');
            titleBtn.addEventListener('click', () => {
                controller.renderTaskList(index);
            });

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '✖';
            removeBtn.classList.add('project-remove-btn');
            removeBtn.addEventListener('click', () => {
                controller.removeProject(index);
            });

            const editInput = document.createElement('input');
            editInput.setAttribute('type', 'text');
            editInput.classList.add('project-edit-input', 'display-none');
            editInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                    const editInputVal = e.target.value;
                    controller.updateProject(index, editInputVal);
                }
            });
            editInput.addEventListener('blur', (e) => {
                const editInputVal = e.target.value;
                controller.updateProject(index, editInputVal);
            });
            
            const editBtn = document.createElement('button');
            editBtn.textContent = '✏️';
            editBtn.classList.add('project-edit-btn');
            editBtn.addEventListener('click', () => {
                titleBtn.classList.toggle('display-none');
                editInput.classList.toggle('display-none');
                editInput.value = project.title;
                editInput.focus();
                editInput.select();
            });            

            li.appendChild(titleBtn);
            li.appendChild(editInput);
            li.appendChild(editBtn);
            li.appendChild(removeBtn);

            projectListEl.appendChild(li);
        });
    };

    const renderTaskList = (projectIndex) => {
        const todoListTitleEl = document.querySelector('#todo-list-project-title');
        const todoInput = document.querySelector('#todo-input');
        const todoListEl = document.querySelector('#todo-list');
        
        const project = projectStorage.getProjectByIndex(projectIndex);
        
        todoListTitleEl.textContent = project.title;
        
        todoInput.setAttribute('placeholder', `Add todo to "${project.title}"`);
        todoInput.value = '';

        while (todoListEl.firstChild) {            
            todoListEl.removeChild(todoListEl.lastChild);
        }
        project.todos.forEach((todo) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            const todoCheckbox = document.createElement('input');
            const todoTitle = document.createElement('span');

            todoCheckbox.setAttribute('type', 'checkbox');
            todoCheckbox.checked = todo.completed;
            
            todoTitle.textContent = todo.title;

            button.appendChild(todoCheckbox);
            button.appendChild(todoTitle);
            li.appendChild(button);

            todoListEl.appendChild(li);
        })
    }

    const render = (selectedProjectIndex, selectedTodoIndex) => {
        renderProjects();        
        renderTaskList(selectedProjectIndex);
    }

    return { render, renderProjects, renderTaskList }
})();

const controller = (() => {
    let state = {
        _selectedProject: 0,
        _selectedTodo: 0,
    }

    const addProject = (project) => {
        projectStorage.addProject(project);
        view.renderProjects();
    };

    const removeProject = (projectIndex) => {
        projectStorage.removeProject(projectIndex);
        if (state._selectedProject === projectIndex) {
            state._selectedProject = 0;
        }
        view.render(state._selectedProject, state._selectedTodo);
    }

    const updateProject = (projectIndex, title) => {
        projectStorage.updateProject(projectIndex, title);
        view.render(state._selectedProject, state._selectedTodo);
    }

    const addTodo = (projectIndex, todo) => {
        projectStorage.addTodo(projectIndex, todo);
        view.renderTaskList(projectIndex);
    }

    const removeTodo = (projectIndex, todoIndex) => {
        
    }

    const renderTaskList = (projectIndex) => {
        state._selectedProject = projectIndex;
        view.renderTaskList(projectIndex);
    }

    const initializeProjects = () => {
        const sampleProject1 = new Project('Default');
        const sampleProject2 = new Project('Errands');
        projectStorage.addProject(sampleProject1);
        projectStorage.addProject(sampleProject2);

        const sampleTodo1 = new Todo('Buy drone', 'Now man!', '1/1/1', 1, false);
        const sampleTodo2 = new Todo('Buy earring', 'Now man!', '1/1/1', 1, true);
        sampleProject1.addTodo(sampleTodo1);
        sampleProject2.addTodo(sampleTodo2);

        view.render(state._selectedProject, state._selectedTodo);
    }

    const initializeEventListener = () => {
        // Project sidebar
        const projectTitleInput = document.querySelector('#project-name-input');

        const modalBg = document.querySelector('#modal-bg');
        modalBg.addEventListener('click', (e) => {
            if (e.target.id === 'modal-bg') {
                modalBg.removeAttribute('style');
                modalBg.classList.toggle('display-none');
            }
        });
         
        const addProjectModalBtn = document.querySelector('#add-project-modal-btn');
        addProjectModalBtn.addEventListener('click', () => {
            modalBg.classList.toggle('display-none');
            modalBg.style.display = 'flex';
            projectTitleInput.focus();
            projectTitleInput.select();
        });

        const addProjectBtn = document.querySelector('#add-project-btn');
        addProjectBtn.addEventListener('click', () => {
            const newProject = new Project(projectTitleInput.value);
            addProject(newProject);
            modalBg.removeAttribute('style');
            modalBg.classList.toggle('display-none');
        });

        // Task list side
        const todoInput = document.querySelector('#todo-input');
        todoInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const todoInputVal = e.target.value;
                const newTodo = new Todo(todoInputVal, '', '', 0, false);
                addTodo(state._selectedProject, newTodo);
            }
        });
    }

    return { removeProject, updateProject, renderTaskList, initializeProjects, initializeEventListener }
})();

controller.initializeProjects();
controller.initializeEventListener();