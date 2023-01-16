const taskInput = document.querySelector(".task-input input");
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(" .clear-btn");
  taskBox =document.querySelector(".task-box");
     let todos = JSON.parse(localStorage.getItem("todo-list"));

     let editId;
    let isEditedTask =false;
 

         filters.forEach (btn => {
         btn.addEventListener("click", () => {
          document.querySelector("span.active").classList.remove("active");
          btn.classList.add("active");
          showTodo(btn.id);
         });
         });
     function showTodo(filter){
            let li = "";
           if (todos) {
          todos.forEach((todo, id) => {
        let isCompleted =todo.status =="completed" ? "checked" : "";
        if (filter == todo.status || filter =="all") {
          li += `<li class="task">
                   <label for ="${id}">
                       <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                       <p class="${isCompleted}">${todo.name}</p>
                   </label>
                   <div class="settings">
                       <i onclick="showmenu(this)"class="uil uil-ellipsis-h"></i>
                       <ul class="task-menu">
                           <li onclick="editTask(${id})", '${todo.name}' ><i class="uil uil-pen"> </i>Edit</li>
                           <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                       </ul>
                   </div>
               </li>`;
          
        }
     });
    }
    taskBox.innerHTML = li  || '<span> you dont have any task here </span>';
  }
  showTodo("all");
     function showmenu(selectedTask){
      let taskMenu = selectedTask.parentElement.lastElementChild;
      taskMenu.classList.add("show");
      document.addEventListener("click", e=> {
        if(e.target.tagname !="I" || e.target != selectedTask){
          taskMenu.classList.remove("show");

        }
      });
     }
     
       function editTask(taskId, taskName ){
        editId = taskId;
        let isEditedTask =true;
           taskInput.value =taskName;

       }

     function deleteTask(deleteId){
     todos.splice(0, todos.length);
     localStorage.setItem("todo-list", JSON.stringify(todos));
     showTodo();
     }
     clearAll.addEventListener("click", () => {
      todos.splice(deletedId, 1);
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo();
     })
  function updateStatus(selectedTask) {
    let taskName= selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
      taskName.classList.add("checked");
      todos[selectedTask.id].status ="completed";
    } else{
      taskName.classList.remove("checked");
      todos[selectedTask.id].status ="pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
  }
taskInput.addEventListener('keyup', e => {
    let userTask = taskInput.value.trim();
    if (e.key =="Enter" && userTask) {
      if (!isEditedTask) {
        if (!todos) {
          todo=[];
        
        }
        
        let taskInfo = {name: userTask, status:"pending"};
        todos.push(taskInfo);
        
        } else {
          let isEditedTask =false;
          todos[editId].name = userTask;
        }
        taskInput.value ="";
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo();
    }
});