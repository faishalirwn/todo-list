const projectStorage = (() => {
    let _projects = [];

    const getProjects = () => _projects;

    const getProjectByIndex = (index) => _projects[index];

    const getTodos = (projectIndex) => _projects[projectIndex].todos;

    const getTodoByIndex = (projectIndex, todoIndex) => _projects[projectIndex].todos[todoIndex];

    const addProject = (project) => {
        _projects.push(project);
    };

    const removeProject = (index) => {
        _projects.splice(index, 1);
    };

    const updateProject = (index, title) => {
        _projects[index].changeTitle(title);
    };
    
    return { addProject, removeProject, updateProject, getProjects, getProjectByIndex, getTodos, getTodoByIndex }
})();

export default projectStorage;