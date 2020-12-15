'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    addHeaderBtn = document.querySelector('#add');

let todoData = [];
const getInfoTodoData = function(){
    if(JSON.parse(localStorage.getItem('todoData'))) {
        todoData = JSON.parse(localStorage.getItem('todoData'));
    } else {
        return;
    }
};

getInfoTodoData();

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.insertAdjacentHTML('afterbegin', `<span class="text-todo"> ${item.value}</span>
            <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
            </div>`);

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
            
        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(){
            todoData.splice(todoData.indexOf(item), 1); 
            render();
        });

    });

    localStorage.setItem('todoData', JSON.stringify(todoData));
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false,
    };

    todoData.push(newTodo);
    headerInput.value = '';
    render();

});

addHeaderBtn.disabled = true;
headerInput.addEventListener('input', () => {
    if(headerInput.value === '') {
        addHeaderBtn.disabled = true;
    } else {
        addHeaderBtn.disabled = false;
    }
});

render();

