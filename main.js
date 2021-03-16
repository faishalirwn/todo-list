/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const projectStorage = (() => {\n    let _projects = [];\n\n    const getProjects = () => _projects;\n\n    const getProjectByIndex = (index) => _projects[index];\n\n    const addProject = (project) => {\n        _projects.push(project);\n    };\n\n    const removeProject = (index) => {\n        _projects.splice(index, 1);\n    };\n\n    const updateProject = (index, title) => {\n        _projects[index].changeTitle(title);\n    };\n\n    const addTodo = (index, todo) => {\n        _projects[index].addTodo(todo);\n    }\n    \n    return { addProject, removeProject, updateProject, getProjects, getProjectByIndex, addTodo }\n})();\n\nclass Todo {\n    constructor(title, desc, due, priority, completed) {\n        this.title = title;\n        this.desc = desc;\n        this.due = due;\n        this.priority = priority;\n        this.completed = completed;\n    }\n\n    toggleCompleted() {\n        this.completed = !this.completed;\n    };\n};\n\nclass Project {\n    constructor(title) {\n        this.title = title;\n        this.todos = [];\n    }\n\n    addTodo(todo) {\n        this.todos.push(todo);\n    };\n\n    removeTodo(todoIndex) {\n        this.todos.splice(todoIndex, 1);\n    };\n\n    changeTitle(title) {\n        this.title = title;\n    }\n};\n\nconst view = (() => {\n    const renderProjects = () => {\n        const projectListEl = document.querySelector('#project-list');\n        while (projectListEl.firstChild) {            \n            projectListEl.removeChild(projectListEl.lastChild);\n        }\n        const projects = projectStorage.getProjects();\n        projects.forEach((project, index) => {\n            const li = document.createElement('li');\n            // li.setAttribute('data-index', index);\n\n            const titleBtn = document.createElement('button');\n            titleBtn.textContent = project.title;\n            titleBtn.classList.add('project-title');\n            titleBtn.addEventListener('click', () => {\n                controller.renderTaskList(index);\n            });\n\n            const removeBtn = document.createElement('button');\n            removeBtn.textContent = '✖';\n            removeBtn.classList.add('project-remove-btn');\n            removeBtn.addEventListener('click', () => {\n                controller.removeProject(index);\n            });\n\n            const editInput = document.createElement('input');\n            editInput.setAttribute('type', 'text');\n            editInput.classList.add('project-edit-input', 'display-none');\n            editInput.addEventListener('keydown', (e) => {\n                if (e.key === 'Enter' || e.key === 'Escape') {\n                    const editInputVal = e.target.value;\n                    controller.updateProject(index, editInputVal);\n                }\n            });\n            editInput.addEventListener('blur', (e) => {\n                const editInputVal = e.target.value;\n                controller.updateProject(index, editInputVal);\n            });\n            \n            const editBtn = document.createElement('button');\n            editBtn.textContent = '✏️';\n            editBtn.classList.add('project-edit-btn');\n            editBtn.addEventListener('click', () => {\n                titleBtn.classList.toggle('display-none');\n                editInput.classList.toggle('display-none');\n                editInput.value = project.title;\n                editInput.focus();\n                editInput.select();\n            });            \n\n            li.appendChild(titleBtn);\n            li.appendChild(editInput);\n            li.appendChild(editBtn);\n            li.appendChild(removeBtn);\n\n            projectListEl.appendChild(li);\n        });\n    };\n\n    const renderTaskList = (projectIndex) => {\n        const todoListTitleEl = document.querySelector('#todo-list-project-title');\n        const todoInput = document.querySelector('#todo-input');\n        const todoListEl = document.querySelector('#todo-list');\n        \n        const project = projectStorage.getProjectByIndex(projectIndex);\n        \n        todoListTitleEl.textContent = project.title;\n        \n        todoInput.setAttribute('placeholder', `Add todo to \"${project.title}\"`);\n        todoInput.value = '';\n\n        while (todoListEl.firstChild) {            \n            todoListEl.removeChild(todoListEl.lastChild);\n        }\n        project.todos.forEach((todo) => {\n            const li = document.createElement('li');\n            const button = document.createElement('button');\n            const todoCheckbox = document.createElement('input');\n            const todoTitle = document.createElement('span');\n\n            todoCheckbox.setAttribute('type', 'checkbox');\n            todoCheckbox.checked = todo.completed;\n            \n            todoTitle.textContent = todo.title;\n\n            button.appendChild(todoCheckbox);\n            button.appendChild(todoTitle);\n            li.appendChild(button);\n\n            todoListEl.appendChild(li);\n        })\n    }\n\n    const render = (selectedProjectIndex, selectedTodoIndex) => {\n        renderProjects();        \n        renderTaskList(selectedProjectIndex);\n    }\n\n    return { render, renderProjects, renderTaskList }\n})();\n\nconst controller = (() => {\n    let state = {\n        _selectedProject: 0,\n        _selectedTodo: 0,\n    }\n\n    const addProject = (project) => {\n        projectStorage.addProject(project);\n        view.renderProjects();\n    };\n\n    const removeProject = (projectIndex) => {\n        projectStorage.removeProject(projectIndex);\n        if (state._selectedProject === projectIndex) {\n            state._selectedProject = 0;\n        }\n        view.render(state._selectedProject, state._selectedTodo);\n    }\n\n    const updateProject = (projectIndex, title) => {\n        projectStorage.updateProject(projectIndex, title);\n        view.render(state._selectedProject, state._selectedTodo);\n    }\n\n    const addTodo = (projectIndex, todo) => {\n        projectStorage.addTodo(projectIndex, todo);\n        view.renderTaskList(projectIndex);\n    }\n\n    const renderTaskList = (projectIndex) => {\n        state._selectedProject = projectIndex;\n        view.renderTaskList(projectIndex);\n    }\n\n    const initializeProjects = () => {\n        const sampleProject1 = new Project('Default');\n        const sampleProject2 = new Project('Errands');\n        projectStorage.addProject(sampleProject1);\n        projectStorage.addProject(sampleProject2);\n\n        const sampleTodo1 = new Todo('Buy drone', 'Now man!', '1/1/1', 1, false);\n        const sampleTodo2 = new Todo('Buy earring', 'Now man!', '1/1/1', 1, true);\n        sampleProject1.addTodo(sampleTodo1);\n        sampleProject2.addTodo(sampleTodo2);\n\n        view.render(state._selectedProject, state._selectedTodo);\n    }\n\n    const initializeEventListener = () => {\n        // Project sidebar\n        const projectTitleInput = document.querySelector('#project-name-input');\n\n        const modalBg = document.querySelector('#modal-bg');\n        modalBg.addEventListener('click', (e) => {\n            if (e.target.id === 'modal-bg') {\n                modalBg.removeAttribute('style');\n                modalBg.classList.toggle('display-none');\n            }\n        });\n         \n        const addProjectModalBtn = document.querySelector('#add-project-modal-btn');\n        addProjectModalBtn.addEventListener('click', () => {\n            modalBg.classList.toggle('display-none');\n            modalBg.style.display = 'flex';\n            projectTitleInput.focus();\n            projectTitleInput.select();\n        });\n\n        const addProjectBtn = document.querySelector('#add-project-btn');\n        addProjectBtn.addEventListener('click', () => {\n            const newProject = new Project(projectTitleInput.value);\n            addProject(newProject);\n            modalBg.removeAttribute('style');\n            modalBg.classList.toggle('display-none');\n        });\n\n        // Task list side\n        const todoInput = document.querySelector('#todo-input');\n        todoInput.addEventListener('keydown', (e) => {\n            if (e.key === 'Enter') {\n                const todoInputVal = e.target.value;\n                const newTodo = new Todo(todoInputVal, '', '', 0, false);\n                addTodo(state._selectedProject, newTodo);\n            }\n        });\n    }\n\n    return { removeProject, updateProject, renderTaskList, initializeProjects, initializeEventListener }\n})();\n\ncontroller.initializeProjects();\ncontroller.initializeEventListener();\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;