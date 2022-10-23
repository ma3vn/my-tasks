let form=document.querySelector(selectors='#task-form');
let taskList=document.querySelector(selectors='.collection');
let clearTask=document.querySelector(selectors='.clear-task');
let filter=document.querySelector(selectors='#filter');
let taskInput=document.querySelector(selectors='#task');

loadAllEvents();    

function loadAllEvents(){

    document.addEventListener( type= 'DOMContentLoaded' ,getTasks);   

    form.addEventListener(type= 'submit' ,addTask);
    taskList.addEventListener(type= 'click' ,removeTask);
    clearTask.addEventListener(type='click' ,removeAllTask);
    filter.addEventListener(type= 'keyup' ,filterTask);
}

function addTask(e) {
    e.preventDefault();
    if (taskInput.value==""){
        alert("لطفا ابتدا کار جدید، وارد کنید")
    }
    else{
        let li=document.createElement(tagName= 'li');
        li.className="collection-item";
        li.appendChild(document.createTextNode(taskInput.value))

        let link=document.createElement(tagName= 'a')
        link.className="delete-item secondary-content left"
        link.setAttribute(qualifieldName= "href" , value= "#");
        link.innerHTML="<i class='fa fa-times-circle'></i>"


        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskInLS(taskInput.value);

        taskInput.value='';
    }
}

function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')){
        if (confirm("آیا کار مورد نظر حذف شود؟")){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLs(e.target.parentElement.parentElement);
        }
    }
}

function removeAllTask(e){
    e.preventDefault();
    // taskList.innerHTML='';
    while (taskList.firstChild){
        taskList.firstChild.remove();
    }
    clearLs();
}

function filterTask(){
    let text =filter.value.toLowerCase();
    document.querySelectorAll(selectors= '.collection-item').forEach( callbackfn= (task) =>{
        let content=task.textContent.toLocaleLowerCase();
        if (content.indexOf(text) !=-1){
            task.style.display="block";
        }
        else{
            task.style.display="none";
        }
    })
}

function storeTaskInLS(taskItem){
    let tasks;
    if (localStorage.getItem(key='tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem( key='tasks'));
    }
    tasks.push(taskItem);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTasks(){
    let tasks;
    if (localStorage.getItem(key='tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem( key='tasks'));
    }
    tasks.forEach(callbackfn= (task) => {
        let li=document.createElement(tagName= 'li');
        li.className="collection-item";
        li.appendChild(document.createTextNode(task))

        let link=document.createElement(tagName= 'a')
        link.className="delete-item secondary-content left"
        link.setAttribute(qualifieldName= "href" , value= "#");
        link.innerHTML="<i class='fa fa-times-circle'></i>"


        li.appendChild(link);
        taskList.appendChild(li);

    });
}

function removeTaskFromLs(taskItem){
    let tasks;
    if (localStorage.getItem(key='tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem( key='tasks'));
    }
    tasks.forEach( callbackfn= (task,index)=>{
        if(taskItem.textContent===task){
            tasks.splice(index,1)
        }
    });
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function clearLs(){
    localStorage.clear()
}