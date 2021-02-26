const clearEl = document.querySelector('.clear');
const dateEl = document.getElementById('date');
const toDoList = document.getElementById('list');
const toDoInput = document.getElementById('input-to-do');
const plus = document.getElementById('plus');

const doneToDo = "fa-check-circle";
const undoneToDo = "fa-circle-thin";
const line = "lineThrough";

const options = {weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();

dateEl.innerHTML = today.toLocaleDateString('en-US', options);

let list = [];
let id = 0;

let data = localStorage.getItem('TODO');

if(data){
    list = JSON.parse(data);
    id = list.lenght;
    loadList(list);
}
else{
    list = [];
    id = 0;
}

function loadList(array){
    array.forEach(element => {
        addToDo(element.id, element.name, element.done, element.trash);
    });
}


clearEl.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});


function addToDo(id, toDo, done, trash){

    if(trash) return;

    const DONE = done ? doneToDo : undoneToDo;
    const LINE = done ? line : '';

    const item = `
        <li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
    `;

    const position = 'beforeend';

    toDoList.insertAdjacentHTML(position, item);
}

toDoInput.addEventListener('keyup', e => {
    
    if(e.key === 'Enter'){
        const toDo = toDoInput.value;

        if(toDo){
            addToDo(id, toDo, false, false);

            list.push({
                id: id,
                name: toDo,
                done: false,
                trash: false
            });
            localStorage.setItem('TODO', JSON.stringify(list));
            id++;
        }
        toDoInput.value = '';
    }

});

plus.addEventListener('click', e => { 
   
    const toDo = toDoInput.value;

    if(toDo){
        addToDo(id, toDo, false, false);

        list.push({
            id: id,
            name: toDo,
            done: false,
            trash: false
        });
        localStorage.setItem('TODO', JSON.stringify(list));
        id++;
    }
    toDoInput.value = '';

});


function completeToDo(element){
    element.classList.toggle(doneToDo);
    element.classList.toggle(undoneToDo);
    element.parentNode.querySelector('.text').classList.toggle(line);

    list[element.id].done = list[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    list[element.id].trash = true;
}

toDoList.addEventListener('click', e => {
    const el = e.target;
    const elJob = el.attributes.job.value;

    if(elJob == 'complete'){
        completeToDo(el);
    }
    else if(elJob == 'delete'){
        removeToDo(el);
    }
    localStorage.setItem('TODO', JSON.stringify(list));
});