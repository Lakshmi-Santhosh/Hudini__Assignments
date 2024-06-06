const allButton = document.querySelector('#all');
const completedButton = document.querySelector('#completed');
const activeButton = document.querySelector('#active');
const clearCompletedButton = document.querySelector('#clearCompleted');
const filterButtons = document.querySelector('.filter-todos');
const selectAllCheckbox = document.querySelector('#selectAll'); 


let tasks = [];

let addItem = () => {
    const taskText = inputBox.value.trim();
    if (taskText) {
        tasks.unshift({ text: taskText, done: false }); 
        renderTasks(); 
        inputBox.value = ''; 
        updateItemsLeft(); 
        showFilterButtons(); 
    }
};

inputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});



function renderTasks() {
    list.innerHTML = '';  
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = task.text;
        if (task.done) {
            listItem.classList.add('done');
        }
        listItem.addEventListener("click", function () {
            task.done = !task.done; // Toggle task completion status
            this.classList.toggle('done');
            updateItemsLeft(); // Update items left count
        });
        const closeButton = document.createElement("span");
        closeButton.classList.add('close');
        closeButton.innerHTML = '×';
        closeButton.addEventListener("click", (event) => {
            tasks.splice(index, 1); // Remove the task from the array
            renderTasks(); // Render tasks to update the UI
            updateItemsLeft(); // Update items left count
        });
        listItem.appendChild(closeButton);

        list.appendChild(listItem); // Append the new task to the list
    });
}
function updateItemsLeft() {
    const itemsLeftCount = tasks.filter(task => !task.done).length;
    itemsLeft.textContent = `${itemsLeftCount} item${itemsLeftCount === 1 ? '' : 's'} left`;
}
selectAllCheckbox.addEventListener('click', () => {
    const isChecked = selectAllCheckbox.checked;
    tasks.forEach(task => {
        task.done = isChecked;
    });
    renderTasks();
    updateItemsLeft();
});
function showFilterButtons() {
    filterButtons.style.display = 'block';
}
// Event listener for "All" filter button
allButton.addEventListener('click', () => {
    const allTasks = document.querySelectorAll('li');
    allTasks.forEach(task => task.style.display = 'block');
    updateItemsLeft(); // Update items left count for all tasks

});
// Event listener for "Active" filter button
activeButton.addEventListener('click', () => {
    const activeTasks = document.querySelectorAll('li:not(.done)');
    const completedTasks = document.querySelectorAll('.done');
    activeTasks.forEach(task => task.style.display = 'block');
    completedTasks.forEach(task => task.style.display = 'none');
    updateItemsLeft(); 
});
// Event listener for "Completed" filter button
completedButton.addEventListener('click', () => {
    const completedTasks = document.querySelectorAll('.done');
    const activeTasks = document.querySelectorAll('li:not(.done)');
    completedTasks.forEach(task => task.style.display = 'block');
    activeTasks.forEach(task => task.style.display = 'none');
    updateItemsLeft();
});

clearCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.done);
    renderTasks();
    updateItemsLeft();
});


// Event listener for "Clear Completed" button
clearCompletedButton.addEventListener('click', clearCompletedTasks);
// Initial render (show all tasks)
renderTasks(); 