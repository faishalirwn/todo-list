(()=>{const e=(()=>{let e=[];return{addProject:t=>{e.push(t)},removeProject:t=>{e.splice(t,1)},updateProject:(t,o)=>{e[t].changeTitle(o)},getProjects:()=>e,getProjectByIndex:t=>e[t]}})();class t{constructor(e,t,o,d,c){this.title=e,this.desc=t,this.due=o,this.priority=d,this.completed=c}toggleCompleted(){this.completed=!this.completed}}class o{constructor(e){this.title=e,this.todos=[]}addTodo(e){this.todos.push(e)}removeTodo(e){this.todos.splice(e,1)}changeTitle(e){this.title=e}}const d=(()=>{const t=()=>{const t=document.querySelector("#project-list");for(;t.firstChild;)t.removeChild(t.lastChild);e.getProjects().forEach(((e,o)=>{const d=document.createElement("li"),n=document.createElement("button");n.textContent=e.title,n.classList.add("project-title"),n.addEventListener("click",(()=>{c.renderTaskList(o)}));const r=document.createElement("button");r.textContent="✖",r.classList.add("project-remove-btn"),r.addEventListener("click",(()=>{c.removeProject(o)}));const s=document.createElement("input");s.setAttribute("type","text"),s.classList.add("project-edit-input","display-none"),s.addEventListener("keydown",(e=>{if("Enter"===e.key||"Escape"===e.key){const t=e.target.value;c.updateProject(o,t)}})),s.addEventListener("blur",(e=>{const t=e.target.value;c.updateProject(o,t)}));const l=document.createElement("button");l.textContent="✏️",l.classList.add("project-edit-btn"),l.addEventListener("click",(()=>{n.classList.toggle("display-none"),s.classList.toggle("display-none"),s.value=e.title,s.focus(),s.select()})),d.appendChild(n),d.appendChild(s),d.appendChild(l),d.appendChild(r),t.appendChild(d)}))},o=t=>{const o=document.querySelector("#todo-list-project-title"),d=document.querySelector("#todo-input"),c=document.querySelector("#todo-list"),n=e.getProjectByIndex(t);for(o.textContent=n.title,d.setAttribute("placeholder",`Add todo to "${n.title}"`);c.firstChild;)c.removeChild(c.lastChild);n.todos.forEach((e=>{const t=document.createElement("li"),o=document.createElement("button"),d=document.createElement("input"),n=document.createElement("span");d.setAttribute("type","checkbox"),d.checked=e.completed,n.textContent=e.title,o.appendChild(d),o.appendChild(n),t.appendChild(o),c.appendChild(t)}))};return{render:(e,d)=>{t(),o(e)},renderProjects:t,renderTaskList:o}})(),c=(()=>{let c={_selectedProject:0,_selectedTodo:0};const n=t=>{e.addProject(t),d.renderProjects()};return{addProject:n,removeProject:t=>{e.removeProject(t),c._selectedProject===t&&(c._selectedProject=0),d.render(c._selectedProject,c._selectedTodo)},updateProject:(t,o)=>{e.updateProject(t,o),d.render(c._selectedProject,c._selectedTodo)},renderTaskList:e=>{d.renderTaskList(e)},initializeProjects:()=>{const n=new o("Default"),r=new o("Errands");e.addProject(n),e.addProject(r);const s=new t("Buy drone","Now man!","1/1/1",1,!1),l=new t("Buy earring","Now man!","1/1/1",1,!0);n.addTodo(s),r.addTodo(l),d.render(c._selectedProject,c._selectedTodo)},initializeEventListener:()=>{const e=document.querySelector("#project-name-input"),t=document.querySelector("#modal-bg");t.addEventListener("click",(e=>{"modal-bg"===e.target.id&&(t.removeAttribute("style"),t.classList.toggle("display-none"))})),document.querySelector("#add-project-modal-btn").addEventListener("click",(()=>{t.classList.toggle("display-none"),t.style.display="flex",e.focus(),e.select()})),document.querySelector("#add-project-btn").addEventListener("click",(()=>{const d=new o(e.value);n(d),t.removeAttribute("style"),t.classList.toggle("display-none")}))}}})();c.initializeProjects(),c.initializeEventListener()})();