const projectStorage = (() => {
    let _projects = [];

    const getProjects = () => _projects;

    const getProjectByIndex = (index) => _projects[index];

    const addProject = (project) => {
        _projects.push(project);
    };

    const removeProject = (index) => {
        _projects.splice(index, 1);
    };

    const updateProject = (index, title) => {
        _projects[index].changeTitle(title);
    };

    const addTodo = (index, todo) => {
        _projects[index].addTodo(todo);
    }
    
    return { addProject, removeProject, updateProject, getProjects, getProjectByIndex, addTodo }
})();

export default projectStorage;