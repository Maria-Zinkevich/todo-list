'use strict';

const header = document.querySelector('.header__input'),
    headerInput = document.querySelector('.header__input'),
    todoListUnchecked = document.querySelector('.todo__list--unchecked'),
    todoListChecked = document.querySelector('.todo__list--checked'),
    headerBtn = document.querySelector('.header__button')

const todoDataList = [] //массив для всех дел

function addTodoData() {
    todoListUnchecked.textContent = ''//очищаю список от предыдущих дел
    todoListChecked.textContent = ''//очищаю список от предыдущих дел

    //с помощью перебора массива добавляю каждое дело из этого массива на страницу
    todoDataList.forEach(function(item) {
        const liChecked = document.createElement('li')
        const liUnchecked = document.createElement('li')
        liUnchecked.classList.add('todo__item')
        liChecked.classList.add('todo__item')

        liUnchecked.innerHTML = '<span class="todo__text">' + item.value + '</span>' +
            '<div class="todo__buttons">' +
                '<button class="todo__remove"></button>' +
                '<button class="todo__complete"></button>' +
            '</div>'

        liChecked.innerHTML = '<span class="todo__text">' + item.value + '</span>' +
            '<div class="todo__buttons">' +
                '<button class="todo__remove"></button>' +
                '<button class="todo__completed"></button>' +
            '</div>'

        //проверка в какой список добавлять элементы
        item.completed ? todoListChecked.append(liChecked) : todoListUnchecked.append(liUnchecked)
        switchList()
    })
    // добавляю дело в localestorage
    localStorage.setItem('todoDataList', JSON.stringify(todoDataList))
}

//добавление значения из инпута в массив дел
headerBtn.addEventListener('click', function() {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };
  
    todoDataList.push(newTodo);
    headerInput.value = ''//очищение инпута
    addTodoData()
});

function switchList() {
    todoDataList.forEach(function(item) {
        let btnTodoComplete = document.querySelector('.todo__complete')
        let btnTodoCompleted = document.querySelector('.todo__completed')
        let btnTodoRemove = document.querySelector('.todo__remove')

        if(!btnTodoComplete) {
            return
        } else {
            btnTodoComplete.addEventListener('click', function(){
                item.completed = !item.completed;//если true станет false, если false станет true
                addTodoData()
            });
        }

        if(btnTodoCompleted) {
            btnTodoCompleted.addEventListener('click', function(){
                item.completed = !item.completed;//если true станет false, если false станет true
                addTodoData()
            });
        } else {
            return
        }
       
        btnTodoRemove.addEventListener('click', function(){
            item.style.display = 'none'
            localStorage.clear()
            addTodoData()
        });
    })
}

