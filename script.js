const inputbox=document.getElementById('inputbox');

const listContainer=document.querySelector('.list-container')

document.getElementById('addbtn').addEventListener('click',()=>{
    if(inputbox.value===''){ alert("you must write something");}
    else{
        let li=document.createElement("li");
        li.innerHTML=inputbox.value;
        listContainer.appendChild(li);
        let span=document.createElement('span')
        span.innerHTML='\u00d7'
        li.appendChild(span)
    }
    inputbox.value='';
    saveData();

});

listContainer.addEventListener('click',(e)=>{
    if(e.target.tagName==='LI'){
        e.target.classList.toggle('checked');
        saveData();

    }
    else if(e.target.tagName==='SPAN'){
        e.target.parentElement.remove()
        saveData();
    }
},false)


const saveData=()=>{
    localStorage.setItem('data',listContainer.innerHTML)
}

const showTask=()=>{
    listContainer.innerHTML=localStorage.getItem('data');
}


showTask();

