const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit',addTask);
  taskList.addEventListener('click', removeTask);
  filter.addEventListener('keyup', filterTasks);
}
function getTasks(){
  let tasks;
   if(localStorage.getItem('tasks')===null){
   tasks=[];
   }else{
     tasks =JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.forEach(function(task){
   
    const inputText=taskInput.value;
  const link=document.createElement('a');
  link.className='delete-item secondary-content';
  link.innerHTML='<i class="fa fa-remove"></i>';
  
  const li=document.createElement('li');
  li.className='collection-item';
  li.textContent=task;
  taskList.appendChild(li);
  li.appendChild(link);


   })
}

function addTask(e){
  if(taskInput.value===''){
    alert('Enter Task Name')
  }

  const inputText=taskInput.value;
  const link=document.createElement('a');
  link.className='delete-item secondary-content';
  link.innerHTML='<i class="fa fa-remove"></i>';
  
  const li=document.createElement('li');
  li.className='collection-item';
  li.textContent=inputText;
  taskList.appendChild(li);
  li.appendChild(link);

  storeTaskInLocalStorage(taskInput.value);
  
  taskInput.value='';
  
  e.preventDefault();

}
function storeTaskInLocalStorage(task){
   let tasks;
   if(localStorage.getItem('tasks')===null){
   tasks=[];
   }else{
     tasks =JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.push(task);
   localStorage.setItem('tasks',JSON.stringify(tasks));
   
}



function removeTask(e){
  if(e.target.classList.contains('fa')){
    e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentNode.parentNode);
    
    
  }else{
    if(e.target.classList.contains('clear-tasks')){
      while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
      }
      clearTasksFromLocalStorage();
    }
  }
}
function clearTasksFromLocalStorage(){
  localStorage.clear();
}


function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
  tasks=[];
  }else{
    tasks =JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
  if(taskItem.textContent===task){
    tasks.splice(index,1);
  }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(e){
   const text = e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach
   (function(task){
     const item = task.firstChild.textContent;
     if(item.toLowerCase().indexOf(text)!=-1){
       task.style.display='block';
     }else{
       task.style.display='none';
     }
   })
   
}