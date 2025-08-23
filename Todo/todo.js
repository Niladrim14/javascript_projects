document.addEventListener('DOMContentLoaded', ()=>{

    const todolist = document.getElementById("todo-list");
const todoinput = document.getElementById("todo-input");
const taskbtn = document.getElementById("add-task-btn");

let tasks = JSON.parse(localStorage.getItem('tasks'))  || [];
   
  tasks.forEach ( task=> rendertask(task));

    taskbtn.addEventListener("click",()=> {
         
        const tasktext = todoinput.value.trim();
         
        if(tasktext === "") return;

        const newtask = {
            id: Date.now(),
            text:tasktext,
            complete:false

        };
        tasks.push(newtask);
        savetask();
        rendertask(newtask);
        todoinput.value ="";
         
        console.log(tasks);
        
               
    })

    function savetask (){
         localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    function rendertask (task){
        const li = document.createElement('li');
        li.setAttribute("data-id",task.id);
        if(task.completed) li.classList.add('completed');

        li.innerHTML = `<span>${task.text}</span>
                         <button>delete</button>`;
      
     li.addEventListener('click',(e)=> {
         if(e.target.tagName === 'BUTTON') return;
         li.completed = !li.completed;
         li.classList.toggle('completed');
              savetask();
                   });   

                   
    li.querySelector('button').addEventListener('click',(e)=>{
             e.stopPropagation();
             tasks = tasks.filter(t =>t.id !== task.id);
              li.remove();
              savetask();

    })  

           todolist.appendChild(li);                        
    }

})