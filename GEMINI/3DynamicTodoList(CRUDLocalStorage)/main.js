const inputElement = document.getElementById('inputElement');
const addButtonElement = document.getElementById('addButtonElement');
let parentListElement = document.getElementById('parentListElement');

const STORAGE_KEY = 'todo_app';

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let ediitngId = null;

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function resetForm() {
    inputElement.value = '';
    addButtonElement.innerText = 'Add';
    ediitngId = null;
}

renderList()

addButtonElement.addEventListener('click', () => {
    const title = inputElement.value.trim();

    if (title === ''){
        return;
    }

    if(ediitngId !== null) {
        todos = todos.map(todo => {
            if (todo.id === ediitngId) {
                return {...todo, title: title};
            };

            return todo;
        });
    } else {
        const newTodo = {
            id: Date.now(),
            title: title,
            completed: false
        };
        todos.push(newTodo);
    }

    console.log(todos)


    saveTodos();
    resetForm();
    renderList();
});

function renderList() {
    parentListElement.innerText = '';

    let containerList = document.createElement('ul');
    containerList.className = 'w-full max-w-md mx-auto space-y-3'
    
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = 'bg-blue-500 flex justify-between items-center p-4 bg-white shadow-lg border-4 hover:shadow-xl hover:bg-gray-100 transition'

        let todoText = document.createElement('span');
        todoText.innerText = todo.title;
        todoText.className = todoText.completed ? 'line-through text-gray-400 font-medium' : 'text-gray-800 font-medium';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex justify-center items-center gap-3'

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'bg-yellow-200 px-8 py-3 flex justify-center items-center border-4 font-bold hover:bg-yellow-300 transition';

        editButton.addEventListener('click', () => {
            inputElement.value = todo.title;
            ediitngId = todo.id;
            addButtonElement.innerText = 'Update';
        })


        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'bg-red-400 px-8 py-3 flex justify-center items-center border-4 font-bold hover:bg-red-500 transition';

        deleteButton.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            resetForm();
            renderList();
        });

        buttonContainer.append(editButton, deleteButton);
        listItem.append(todoText, buttonContainer);
        containerList.appendChild(listItem);
    });

    parentListElement.appendChild(containerList);
}