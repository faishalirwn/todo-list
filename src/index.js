import projectStorage from "./projectStorage";
import Todo from "./Todo";
import Project from "./Project";
import { parse, compareAsc, isToday, format } from "date-fns";

const view = (() => {
    const renderProjects = () => {
        const projectListEl = document.querySelector('#project-list');
        while (projectListEl.firstChild) {            
            projectListEl.removeChild(projectListEl.lastChild);
        }

        const projects = projectStorage.getProjects();

        projects.forEach((project, index) => {
            const li = document.createElement('li');

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

    const renderTodoList = () => {
        const todoListTitleEl = document.querySelector('#todo-list-project-title');
        const todoInput = document.querySelector('#todo-input');
        const todoListEl = document.querySelector('#todo-list');
        const todoListCompletedEl = document.querySelector('#todo-list-completed');

        const project = projectStorage.getProjectByIndex(controller.getSelectedProject());
        
        todoListTitleEl.textContent = project.title;
        
        todoInput.setAttribute('placeholder', `Add todo to "${project.title}"`);
        todoInput.value = '';

        while (todoListEl.firstChild) {            
            todoListEl.removeChild(todoListEl.lastChild);            
        }

        while (todoListCompletedEl.firstChild) {            
            todoListCompletedEl.removeChild(todoListCompletedEl.lastChild);            
        }

        const sortedTodos = project.todos.slice().sort((a, b) => {
            const aDate = parse(`${a.date} ${a.time}`, 'yyyy-MM-dd HH:mm', new Date());
            const bDate = parse(`${b.date} ${b.time}`, 'yyyy-MM-dd HH:mm', new Date());
            return compareAsc(aDate, bDate);
        });

        sortedTodos.forEach((todo, todoIndex) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            const div = document.createElement('div');
            const todoCheckbox = document.createElement('input');
            const todoTitle = document.createElement('span');
            const todoDateTimeEl = document.createElement('span');

            button.classList.add('todo-item');
            button.addEventListener('click', () => {
                controller.changeSelectedTodo(todoIndex);
                renderTodoDetail(todo);
            })

            todoCheckbox.setAttribute('type', 'checkbox');            
            todoCheckbox.checked = todo.completed;
            todoCheckbox.addEventListener('change', () => {
                todo.toggleCompleted();
                renderTodoDetail(todo);
                renderTodoList(project);
            })
            
            todoTitle.textContent = todo.title;

            const todoDate = parse(`${todo.date} ${todo.time}`, 'yyyy-MM-dd HH:mm', new Date());
            todoDateTimeEl.textContent = isToday(todoDate) ? todo.time : format(todoDate, 'MMM dd');

            div.appendChild(todoCheckbox);
            div.appendChild(todoTitle);
            button.appendChild(div);
            button.appendChild(todoDateTimeEl);
            li.appendChild(button);

            if (todoCheckbox.checked) {
                todoListCompletedEl.appendChild(li);
            } else {                
                todoListEl.appendChild(li);
            }
        })
    }

    const renderTodoDetail = () => {
        const todoDetailSide = document.querySelector('#todo-detail');
        const todoDetailStatus = document.querySelector('#todo-detail-status');
        const todoDetailTitle = document.querySelector('#todo-detail-title');
        const todoDetailDesc = document.querySelector('#todo-detail-desc');
        const todoDetailDate = document.querySelector('#todo-detail-date');
        const todoDetailTime = document.querySelector('#todo-detail-time');
        const todoProjectCurrentText = document.querySelector('#todo-project-current span');
        const todoProjectDropdown = document.querySelector('#todo-project-dropdown');
        
        const projects = projectStorage.getProjects();        
        const project = projectStorage.getProjectByIndex(controller.getSelectedProject());        
        const todo = projectStorage.getTodoByIndex(controller.getSelectedProject(), controller.getSelectedTodo());

        todoDetailSide.classList.remove('visibility-hidden');
        todoDetailStatus.checked = todo.completed;        
        todoDetailTitle.value = todo.title;   
        todoDetailDesc.value = todo.desc;
        todoDetailDate.value = todo.date;
        todoDetailTime.value = todo.time;
        todoProjectCurrentText.textContent = project.title;

        while (todoProjectDropdown.firstChild) {            
            todoProjectDropdown.removeChild(todoProjectDropdown.lastChild);            
        }

        projects.forEach((projectVal, projectIndex) => {
            if (projectIndex !== todo.projectIndex) {
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = projectVal.title;
                li.append(button);

                button.addEventListener('click', () => {
                    project.removeTodo(controller.getSelectedTodo());
                    
                    todo.projectIndex = projectIndex;
                    const todosProject = projectStorage.getProjectByIndex(projectIndex);
                    todosProject.addTodo(todo);
                    
                    todoProjectDropdown.classList.add('display-none');
                    todoProjectCurrentText.textContent = todosProject.title;

                    controller.changeSelectedProject(projectIndex);
                    controller.changeSelectedTodo(todosProject.todos.length - 1);
                    
                    renderTodoList();
                    renderTodoDetail();
                });

                todoProjectDropdown.append(li);
            }
        });
    }

    const render = () => {
        renderProjects();
        renderTodoList();
        renderTodoDetail();
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
        localStorage.setItem("projects", JSON.stringify(projects));

        state._selectedTodo = 0;
        state._selectedProject = projects.length - 1;
        const todoListSide = document.querySelector('#todo-list-container');
        todoListSide.classList.remove('visibility-hidden');
        const todoDetailSide = document.querySelector('#todo-detail');
        todoDetailSide.classList.add('visibility-hidden');
        const todoInput = document.querySelector('#todo-input');
        todoInput.focus();
        
        view.renderProjects()        
        view.renderTodoList();
    }

    const removeProject = (projectIndex) => {
        projectStorage.removeProject(projectIndex);

        const projects = projectStorage.getProjects();
        localStorage.setItem("projects", JSON.stringify(projects));
   
        if (projects.length === 0) {
            state._selectedProject = -1;
            state._selectedTodo = -1;
            const todoListSide = document.querySelector('#todo-list-container');
            todoListSide.classList.add('visibility-hidden');
            const todoDetailSide = document.querySelector('#todo-detail');
            todoDetailSide.classList.add('visibility-hidden');
            view.renderProjects();
        }
        else if (state._selectedProject === projectIndex) {
            state._selectedProject = 0;
            state._selectedTodo = 0;

            view.render();
        } else {
            view.renderProjects();
        }        
    }

    const updateProject = (projectIndex, title) => {
        projectStorage.updateProject(projectIndex, title);

        const projects = projectStorage.getProjects();
        localStorage.setItem("projects", JSON.stringify(projects));

        view.render();
    }

    const addTodo = (todo) => {
        const project = projectStorage.getProjectByIndex(controller.getSelectedProject());
        project.addTodo(todo);
        if (state._selectedTodo === -1) {
            state._selectedTodo = 0;
        } else {
            state._selectedTodo = project.todos.length - 1;
        }

        const projects = projectStorage.getProjects();
        localStorage.setItem("projects", JSON.stringify(projects));

        view.renderTodoList();
        view.renderTodoDetail();
    }

    const removeTodo = () => {
        const todoDetailSide = document.querySelector('#todo-detail');
                
        const project = projectStorage.getProjectByIndex(controller.getSelectedProject());
        project.removeTodo(state._selectedTodo);
        if (project.todos.length === 0) {
            state._selectedTodo = -1;
            todoDetailSide.classList.add('visibility-hidden');
            view.renderProjects();
            view.renderTodoList();
        } else {
            state._selectedTodo = state._selectedTodo - 1;
            view.renderTodoDetail();
            view.renderTodoList();
        }

        const projects = projectStorage.getProjects();
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    const updateTodo = (prop, value) => {
        const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
        todo[prop] = value;

        const projects = projectStorage.getProjects();
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    const getSelectedProject = () => state._selectedProject;

    const getSelectedTodo = () => state._selectedTodo;

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

        const timeElapsed = Date.now();
        const dateNow = new Date(timeElapsed);
        const sampleTodo1 = new Todo('Buy drone', 'Now man!', format(dateNow, 'yyyy-MM-dd'), '00:00', false, 0);
        const sampleTodo2 = new Todo('Buy earring', 'Now man!', format(dateNow, 'yyyy-MM-dd'), '00:00', true, 1);
        sampleProject1.addTodo(sampleTodo1);
        sampleProject2.addTodo(sampleTodo2);        

        const projects = projectStorage.getProjects();
        localStorage.setItem("projects", JSON.stringify(projects));

        view.render();
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

        projectTitleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const newProject = new Project(projectTitleInput.value);
                addProject(newProject);
                modalBg.removeAttribute('style');
                modalBg.classList.toggle('display-none');                
            }
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
                const timeElapsed = Date.now();
                const dateNow = new Date(timeElapsed);
                const newTodo = new Todo(todoInputVal, '', format(dateNow, 'yyyy-MM-dd'), '00:00', false, state._selectedProject);
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
        const todoProjectCurrentBtn = document.querySelector('#todo-project-current');
        const todoProjectDropdown = document.querySelector('#todo-project-dropdown');

        todoDetailStatus.addEventListener('change', () => {
            const todo = projectStorage.getTodoByIndex(state._selectedProject, state._selectedTodo);
            todo.toggleCompleted();
            view.renderTodoList();
        });

        todoDetailTitle.addEventListener('change', () => {
            updateTodo('title', todoDetailTitle.value);
            view.renderTodoList();
        });

        todoDetailDesc.addEventListener('keypress', () => {
            updateTodo('desc', todoDetailDesc.value);
        });

        todoDetailDate.addEventListener('change', () => {
            updateTodo('date', todoDetailDate.value);
            view.renderTodoList();
        });

        todoDetailTime.addEventListener('change', () => {
            updateTodo('time', todoDetailTime.value);
            view.renderTodoList();
        });

        todoDeleteBtn.addEventListener('click', () => {
            removeTodo()
        });

        todoProjectCurrentBtn.addEventListener('click', () => {
            if (todoProjectDropdown.firstChild) {
                todoProjectDropdown.classList.toggle('display-none');
            }
        });
    }

    return { removeProject, updateProject, getSelectedProject, getSelectedTodo, changeSelectedProject, changeSelectedTodo, initializeProjects, initializeEventListener }
})();


if (!localStorage.getItem('projects')) {
    alert('ha');
    controller.initializeProjects();
} else {
    alert('hu');
    const projectsLocalStorage = JSON.parse(localStorage.getItem('projects'));
    projectsLocalStorage.forEach((project) => {
        const newProject = new Project(project.title);
        projectStorage.addProject(newProject)
        project.todos.forEach((todo) => {
            const newTodo = new Todo(todo.title, todo.desc, todo.date, todo.time, todo.completed, todo.projectIndex);
            newProject.addTodo(newTodo);
        });
    });
    view.render();
}
controller.initializeEventListener();