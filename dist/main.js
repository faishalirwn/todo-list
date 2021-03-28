/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\nclass Project {\n    constructor(title) {\n        this.title = title;\n        this.todos = [];\n    }\n\n    addTodo(todo) {\n        this.todos.push(todo);\n    };\n\n    removeTodo(todoIndex) {\n        this.todos.splice(todoIndex, 1);\n    };\n\n    changeTitle(title) {\n        this.title = title;\n    }\n};\n\n//# sourceURL=webpack://todo-list/./src/Project.js?");

/***/ }),

/***/ "./src/Todo.js":
/*!*********************!*\
  !*** ./src/Todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Todo)\n/* harmony export */ });\nclass Todo {\n    constructor(title, desc, due, completed) {\n        this.title = title;\n        this.desc = desc;\n        this.due = due;\n        this.completed = completed;\n    }\n\n    toggleCompleted() {\n        this.completed = !this.completed;\n    };\n};\n\n//# sourceURL=webpack://todo-list/./src/Todo.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _projectStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectStorage */ \"./src/projectStorage.js\");\n/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Todo */ \"./src/Todo.js\");\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Project */ \"./src/Project.js\");\n\n\n\n\nconst view = (() => {\n    const renderProjects = (projects) => {\n        const projectListEl = document.querySelector('#project-list');\n        while (projectListEl.firstChild) {            \n            projectListEl.removeChild(projectListEl.lastChild);\n        }\n\n        projects.forEach((project, index) => {\n            const li = document.createElement('li');\n            // li.setAttribute('data-index', index);\n\n            const titleBtn = document.createElement('button');\n            titleBtn.textContent = project.title;\n            titleBtn.classList.add('project-title');\n            titleBtn.addEventListener('click', () => {\n                controller.changeSelectedProject(index);\n                renderTodoList(project);\n                renderTodoDetail(project.todos[0]);\n            });\n\n            const removeBtn = document.createElement('button');\n            removeBtn.textContent = '✖';\n            removeBtn.classList.add('project-remove-btn');\n            removeBtn.addEventListener('click', () => {\n                controller.removeProject(index);\n            });\n\n            const editInput = document.createElement('input');\n            editInput.setAttribute('type', 'text');\n            editInput.classList.add('project-edit-input', 'display-none');\n            editInput.addEventListener('keydown', (e) => {\n                if (e.key === 'Enter' || e.key === 'Escape') {\n                    const editInputVal = e.target.value;\n                    controller.updateProject(index, editInputVal);\n                }\n            });\n            editInput.addEventListener('blur', (e) => {\n                const editInputVal = e.target.value;\n                controller.updateProject(index, editInputVal);\n            });\n            \n            const editBtn = document.createElement('button');\n            editBtn.textContent = '✏️';\n            editBtn.classList.add('project-edit-btn');\n            editBtn.addEventListener('click', () => {\n                titleBtn.classList.toggle('display-none');\n                editInput.classList.toggle('display-none');\n                editInput.value = project.title;\n                editInput.focus();\n                editInput.select();\n            });            \n\n            li.appendChild(titleBtn);\n            li.appendChild(editInput);\n            li.appendChild(editBtn);\n            li.appendChild(removeBtn);\n\n            projectListEl.appendChild(li);\n        });\n    };\n\n    const renderTodoList = (project) => {\n        const todoListTitleEl = document.querySelector('#todo-list-project-title');\n        const todoInput = document.querySelector('#todo-input');\n        const todoListEl = document.querySelector('#todo-list');\n        \n        todoListTitleEl.textContent = project.title;\n        \n        todoInput.setAttribute('placeholder', `Add todo to \"${project.title}\"`);\n        todoInput.value = '';\n\n        while (todoListEl.firstChild) {            \n            todoListEl.removeChild(todoListEl.lastChild);\n        }\n        project.todos.forEach((todo) => {\n            const li = document.createElement('li');\n            const button = document.createElement('button');\n            const todoCheckbox = document.createElement('input');\n            const todoTitle = document.createElement('span');\n\n            li.addEventListener('click', () => {\n                renderTodoDetail(todo);\n            })\n\n            todoCheckbox.setAttribute('type', 'checkbox');            \n            todoCheckbox.checked = todo.completed;\n            \n            todoTitle.textContent = todo.title;\n\n            button.appendChild(todoCheckbox);\n            button.appendChild(todoTitle);\n            li.appendChild(button);\n\n            todoListEl.appendChild(li);\n        })\n    }\n\n    const renderTodoDetail = (todo) => {\n        const todoDetailStatus = document.querySelector('#todo-detail-status');\n        const todoDetailTitle = document.querySelector('#todo-detail-title');\n        const todoDetailDesc = document.querySelector('#todo-detail-desc');\n        const todoDetailDate = document.querySelector('#todo-detail-date');\n        const todoDetailTime = document.querySelector('#todo-detail-time');        \n\n        todoDetailStatus.checked = todo.completed;\n        todoDetailTitle.value = todo.title;\n        todoDetailDesc.value = todo.desc;\n        // todoDetailDate.value = todo.date;\n        // todoDetailTime.value = todo.time;\n    }\n\n    const render = (allProjects, project, todo) => {\n        renderProjects(allProjects);\n        renderTodoList(project);\n        renderTodoDetail(todo);\n    }\n\n    return { render, renderProjects, renderTodoList, renderTodoDetail }\n})();\n\nconst controller = (() => {\n    let state = {\n        _selectedProject: 0,\n        _selectedTodo: 0,\n    }\n\n    const addProject = (project) => {\n        _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.addProject(project);\n        const projects = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getProjects();\n        view.renderProjects(projects);\n    }\n\n    const removeProject = (projectIndex) => {\n        _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.removeProject(projectIndex);\n        const projects = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getProjects();\n        if (state._selectedProject === projectIndex) {\n            state._selectedProject = 0;\n            const project = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getProjectByIndex(state._selectedProject);\n            const todo = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getTodoByIndex(state._selectedProject, state._selectedTodo);\n            view.render(projects, project, todo);\n        } else {\n            view.renderProjects(projects);\n        }\n    }\n\n    const updateProject = (projectIndex, title) => {\n        _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.updateProject(projectIndex, title);\n        const projects = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getProjects();\n        const project = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getProjectByIndex(state._selectedProject);\n        const todo = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getTodoByIndex(state._selectedProject, state._selectedTodo);\n        view.render(projects, project, todo);\n    }\n\n    const addTodo = (todo) => {\n        _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.addTodo(state._selectedProject, todo);\n        const project = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getProjectByIndex(state._selectedProject);\n        view.renderTodoList(project);\n    }\n\n    const removeTodo = (projectIndex, todoIndex) => {\n        \n    }\n\n    const changeSelectedProject = (projectIndex) => {\n        state._selectedProject = projectIndex;\n    }\n\n    const initializeProjects = () => {\n        const sampleProject1 = new _Project__WEBPACK_IMPORTED_MODULE_2__.default('Default');\n        const sampleProject2 = new _Project__WEBPACK_IMPORTED_MODULE_2__.default('Errands');\n        _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.addProject(sampleProject1);\n        _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.addProject(sampleProject2);\n\n        const sampleTodo1 = new _Todo__WEBPACK_IMPORTED_MODULE_1__.default('Buy drone', 'Now man!', '1/1/1', false);\n        const sampleTodo2 = new _Todo__WEBPACK_IMPORTED_MODULE_1__.default('Buy earring', 'Now man!', '1/1/1', true);\n        sampleProject1.addTodo(sampleTodo1);\n        sampleProject2.addTodo(sampleTodo2);\n\n        const projects = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getProjects();\n        const project = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getProjectByIndex(state._selectedProject);\n        const todo = _projectStorage__WEBPACK_IMPORTED_MODULE_0__.default.getTodoByIndex(state._selectedProject, state._selectedTodo);\n        view.render(projects, project, todo);\n    }\n\n    const initializeEventListener = () => {\n        // Project sidebar\n        const projectTitleInput = document.querySelector('#project-name-input');\n\n        const modalBg = document.querySelector('#modal-bg');\n        modalBg.addEventListener('click', (e) => {\n            if (e.target.id === 'modal-bg') {\n                modalBg.removeAttribute('style');\n                modalBg.classList.toggle('display-none');\n            }\n        });\n         \n        const addProjectModalBtn = document.querySelector('#add-project-modal-btn');\n        addProjectModalBtn.addEventListener('click', () => {\n            modalBg.classList.toggle('display-none');\n            modalBg.style.display = 'flex';\n            projectTitleInput.focus();\n            projectTitleInput.select();\n        });\n\n        const addProjectBtn = document.querySelector('#add-project-btn');\n        addProjectBtn.addEventListener('click', () => {\n            const newProject = new _Project__WEBPACK_IMPORTED_MODULE_2__.default(projectTitleInput.value);\n            addProject(newProject);\n            modalBg.removeAttribute('style');\n            modalBg.classList.toggle('display-none');\n        });\n\n        // Todo list side\n        const todoInput = document.querySelector('#todo-input');\n        todoInput.addEventListener('keydown', (e) => {\n            if (e.key === 'Enter') {\n                const todoInputVal = e.target.value;\n                const newTodo = new _Todo__WEBPACK_IMPORTED_MODULE_1__.default(todoInputVal, '', '', false);\n                addTodo(newTodo);\n            }\n        });\n    }\n\n    return { removeProject, updateProject, changeSelectedProject, initializeProjects, initializeEventListener }\n})();\n\ncontroller.initializeProjects();\ncontroller.initializeEventListener();\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/projectStorage.js":
/*!*******************************!*\
  !*** ./src/projectStorage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst projectStorage = (() => {\n    let _projects = [];\n\n    const getProjects = () => _projects;\n\n    const getProjectByIndex = (index) => _projects[index];\n\n    const getTodos = (projectIndex) => _projects[projectIndex].todos;\n\n    const getTodoByIndex = (projectIndex, todoIndex) => _projects[projectIndex].todos[todoIndex];\n\n    const addProject = (project) => {\n        _projects.push(project);\n    };\n\n    const removeProject = (index) => {\n        _projects.splice(index, 1);\n    };\n\n    const updateProject = (index, title) => {\n        _projects[index].changeTitle(title);\n    };\n\n    const addTodo = (index, todo) => {\n        _projects[index].addTodo(todo);\n    }\n    \n    return { addProject, removeProject, updateProject, getProjects, getProjectByIndex, addTodo, getTodos, getTodoByIndex }\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectStorage);\n\n//# sourceURL=webpack://todo-list/./src/projectStorage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;