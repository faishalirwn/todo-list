import projectStorage from "./projectStorage";
import Todo from "./Todo";
import Project from "./Project";

const view = (() => {
    const renderProjects = (projects) => {
        const projectListEl = document.querySelector('#project-list');
        while (projectListEl.firstChild) {            
            projectListEl.removeChild(projectListEl.lastChild);
        }

        projects.forEach((project, index) => {
            const li = document.createElement('li');
            // li.setAttribute('data-index', index);            

            const titleBtn = document.createElement('button');
            titleBtn.textContent = project.title;
            titleBtn.classList.add('project-title');
            titleBtn.addEventListener('click', () => {
                controller.changeSelectedProject(index);
                renderTodoList(project);
                if (project.todos.length === 0) {
                    const todoDetailSide = document.querySelector('#todo-detail');
                    todoDetailSide.classList.add('visibility-hidden');
                    controller.changeSelectedTodo(-1);
                } else {
                    controller.changeSelectedTodo(0);
                    renderTodoDetail(project.todos[0]);
                }
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

    const renderTodoList = (project) => {
        const todoListTitleEl = document.querySelector('#todo-list-project-title');
        const todoInput = document.querySelector('#todo-input');
        const todoListEl = document.querySelector('#todo-list');
        
        todoListTitleEl.textContent = project.title;
        
        todoInput.setAttribute('placeholder', `Add todo to "${project.title}"`);
        todoInput.value = '';

        while (todoListEl.firstChild) {            
            todoListEl.removeChild(todoListEl.lastChild);
        }
        project.todos.forEach((todo, todoIndex) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            const todoCheckbox = document.createElement('input');
            const todoTitle = document.createElement('span');

            li.addEventListener('click', () => {
                controller.changeSelectedTodo(todoIndex);
                renderTodoDetail(todo);
            })

            todoCheckbox.setAttribute('type', 'checkbox');            
            todoCheckbox.checked = todo.completed;
            todoCheckbox.addEventListener('change', () => {
                todo.toggleCompleted();
                renderTodoDetail(todo);
            })
            
            todoTitle.textContent = todo.title;

            button.appendChild(todoCheckbox);
            button.appendChild(todoTitle);
            li.appendChild(button);

            todoListEl.appendChild(li);
        })
    }

    const renderTodoDetail = (todo) => {
        const todoDetailSide = document.querySelector('#todo-detail');
        const todoDetailStatus = document.querySelector('#todo-detail-status');
        const todoDetailTitle = document.querySelector('#todo-detail-title');
        const todoDetailDesc = document.querySelector('#todo-detail-desc');
        const todoDetailDate = document.querySelector('#todo-detail-date');
        const todoDetailTime = document.querySelector('#todo-detail-time');

        todoDetailSide.classList.remove('visibility-hidden');
        todoDetailStatus.checked = todo.completed;        
        todoDetailTitle.value = todo.title;        
        todoDetailDesc.value = todo.desc;        
        todoDetailDate.value = todo.date;        
        todoDetailTime.value = todo.time;        
    }

    const render = (allProjects, project, todo) => {
        renderProjects(allProjects);
        renderTodoList(project);
        renderTodoDetail(todo);
    }

    return { render, renderProjects, renderTodoList, renderTodoDetail }
})();

const controller = (() => {
    let state = {
        _selectedProject: 0,
        _selectedTodo: 0,
    }

    const addProject = (project) => {
        projectStorage.addProject(project);
        const projects = projectStorage.getProjects();
        view.renderProjects(projects);
    }

    const removeProject = (projectIndex) => {
        projectStorage.removeProject(projectIndex);
        const projects = projectStorage.getProjects();
        if (state._selectedProject === projectIndex) {
            state._selectedProject = 0;
            const project = projectStorage.getProjectByIndex(state._selectedProject);
            const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
            view.render(projects, project, todo);
        } else {
            view.renderProjects(projects);
        }
    }

    const updateProject = (projectIndex, title) => {
        projectStorage.updateProject(projectIndex, title);
        const projects = projectStorage.getProjects();
        const project = projectStorage.getProjectByIndex(state._selectedProject);
        const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
        view.render(projects, project, todo);
    }

    const addTodo = (todo) => {
        projectStorage.addTodo(state._selectedProject, todo);
        const project = projectStorage.getProjectByIndex(state._selectedProject);
        if (state._selectedTodo === -1) {
            changeSelectedTodo(0)
        }
        view.renderTodoList(project);
        view.renderTodoDetail(todo);
    }

    const removeTodo = () => {
        const todoDetailSide = document.querySelector('#todo-detail');
        const projects = projectStorage.getProjects();
        const project = projectStorage.getProjectByIndex(state._selectedProject);
        const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);            
        project.removeTodo(state._selectedTodo);
        if (project.todos.length === 0) {
            todoDetailSide.classList.add('visibility-hidden');
            view.renderProjects(projects);
            view.renderTodoList(project);
        } else {
            changeSelectedTodo(state._selectedTodo - 1);
            view.renderTodoDetail(todo);
            view.renderTodoList(project);
        }
    }

    const changeSelectedProject = (projectIndex) => {
        state._selectedProject = projectIndex;
    }

    const changeSelectedTodo = (todoIndex) => {
        state._selectedTodo = todoIndex;
    }

    const initializeProjects = () => {
        const sampleProject1 = new Project('Default');
        const sampleProject2 = new Project('Errands');
        projectStorage.addProject(sampleProject1);
        projectStorage.addProject(sampleProject2);

        const sampleTodo1 = new Todo('Buy drone', 'Now man!', '', '', false);
        const sampleTodo2 = new Todo('Buy earring', 'Now man!', '', '', true);
        sampleProject1.addTodo(sampleTodo1);
        sampleProject2.addTodo(sampleTodo2);

        const projects = projectStorage.getProjects();
        const project = projectStorage.getProjectByIndex(state._selectedProject);
        const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
        
        view.render(projects, project, todo);
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

        // Todo list side
        const todoInput = document.querySelector('#todo-input');
        todoInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const todoInputVal = e.target.value;
                const newTodo = new Todo(todoInputVal, '', '', '', false);
                addTodo(newTodo);
            }
        });

        // Todo detail side        
        const todoDetailStatus = document.querySelector('#todo-detail-status');
        const todoDetailTitle = document.querySelector('#todo-detail-title');
        const todoDetailDesc = document.querySelector('#todo-detail-desc');
        const todoDetailDate = document.querySelector('#todo-detail-date');
        const todoDetailTime = document.querySelector('#todo-detail-time');
        const todoDeleteBtn = document.querySelector('#todo-delete-btn');

        todoDetailStatus.addEventListener('change', () => {
            const project = projectStorage.getProjectByIndex(state._selectedProject);
            const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
            todo.toggleCompleted();
            view.renderTodoList(project);
        });

        todoDetailTitle.addEventListener('change', () => {
            const project = projectStorage.getProjectByIndex(state._selectedProject);
            const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
            todo.title = todoDetailTitle.value;
            view.renderTodoList(project);
        });

        todoDetailDesc.addEventListener('keypress', () => {
            const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
            todo.desc = todoDetailDesc.value;
        });

        todoDetailDate.addEventListener('change', () => {
            const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
            todo.date = todoDetailDate.value;
        });

        todoDetailTime.addEventListener('change', () => {
            const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
            todo.time = todoDetailTime.value;
        });

        todoDeleteBtn.addEventListener('click', () => {
            removeTodo()
        });
    }

    return { removeProject, updateProject, changeSelectedProject, changeSelectedTodo, initializeProjects, initializeEventListener }
})();

controller.initializeProjects();
controller.initializeEventListener();