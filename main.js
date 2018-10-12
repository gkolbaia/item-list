const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
  form.addEventListener('submit',addTask);
  taskList.addEventListener('click', removeTask);
  filter.addEventListener('keyup', filterTasks);


}

function addTask(e){
  if(taskInput.value===''){
    alert('Enter Task Name')
  }else{

  const inputText=taskInput.value;
  const link=document.createElement('a');
  link.className='delete-item secondary-content';
  link.innerHTML='<i class="fa fa-remove"></i>';
  
  const li=document.createElement('li');
  li.className='collection-item';
  li.textContent=inputText;
  taskList.appendChild(li);
  li.appendChild(link);

  
  taskInput.value='';
  }
  e.preventDefault();

}

function removeTask(e){
  
    

  if(e.target.classList.contains('fa')){
    e.target.parentNode.parentNode.remove();
  }else{
    if(e.target.classList.contains('clear-tasks')){
      for(let i=taskList.childElementCount;i!=3;i++){
        document.querySelectorAll('li')[0].remove(); 
      }
    }
  }
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