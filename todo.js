//NOTE - Import the readline module for handling command line input/output 
const readline = require('readline')

// import the fs (filesystem) modeule for reading/writing files
const fs = require('fs')

//NOTE - Define the file where tasks will be saved
const FILE = 'tasks.json'

//Initialize an empty array to store tasks
let todo = []

//TODO - Check if the tasks.json file exists
if(fs.existsSync(FILE)){
    try{
        // IF file exists, read it's contents (sync)
        const data = fs.readFileSync(FILE, utf8)
        // Parse JSON string into the todos array 
        todos = JSON.parse(data)
    } catch(e){
        // If there is any error, start with an empty array
        todos = []
    }
}

//NOTE - Create a readline interface for command line interface
const rl = readline.createInterface({
    input: process.stdin, // Set standard input (keyboard as input source)
    output: process.stdout // Set standard output (keyboard) as out target
})

//TODO - Function to display the main menu options 
function showMenuu(){
    console.log('\n To-Do List app ===') // Option 4: Delete a task
    console.log('1. Show Tasks') // Option 1: Show Tasks
    console.log('2. Add Task') // Option 2: Add Task
    console.log('3. Mark task as Done') // Option 4: Mark task as Done
    console.log('4. Delete a Task') // option 5: Delete a Task
    console.log('5. Exit') // option 5: Exit the app

    rl.question('\n Choose an option (1-5)', handleMenu) // Prompt user for menu choice
}
//NOTE - function to save tasks array to the task, json file
function saveTasks(){
    fs.writeFileSync(FILE, JSON.stringify(todos, null, 2)) // Write the todos array as pretty JSON
}

//TODO - Function to handle the menu option entered by the user 
function handleMenu(choice){
    switch(choice.trim()) { // Use the trimmed input for comparsion
        case '1':
        listTasks() // if '1', show all tasks
        break
    

    case '2':
        addTask() // if '2', add a new task
        break
    
    case '3':
        prompt
        break
    case '4':
        promptDeleteTask() // if '4', delete a task
        break
    case '5':
        console.log('Goodbye!') //If '5', print goodbye and close the app
        rl.close() // Close readline interface
        break
    default:
        console.log('Invalid choice. Try again.') // If not 1-5, show error message
        showMenuu() // Show menu again
        break
    }

}
//NOTE - Function to display all task in the list
function listTasks(){
    console.log('\nYour TO-DO List:') // Print list header
    if(todos,length === 0) {
        console.log('No tasks found.') // inform user that list is empty
    } else {
        todos.forEach((task, idx) => {
            const status = task.done ? 'Complete' : 'Not Complete' // Determine status task
            console.log(`${idx + 1}, (${status}) ${task.text}`) // Print task number, status and description
        });
    }
    showMenu()
}

// Funciton to add a new task to the list
function addTask(){
    rl.question('\nEnter the task: ', (task) => {
        if(task.trim() === ''){ // If input is empty or only spaces
            console.log('Task cannot be empty.') // Show error message
        } else {
            todos.push({text: task, done: false}) // Add a new task object (not completed by default)
            saveTasks() // Save updated tasks to file
            console.log('Task added!') // addition 
        }
        showMenu() // Show menu again
    })
}
//NOTE - Function to prompt the user to select a task to mark as completed
function promptMarkTaskAsDone() {
    if(todos.length === 0) { //If there are no tasks
        console.log('\nNo tasks to mark as done.') // Inform user
        return showMenu()
    }
    console.log('\nSelect the number of task to mark as completed:') // print prompt header
    todos.forEach((task, idx) => {                              // list all tasks with their numbers
        const status = task.done ? 'Completed' : 'Not Completed' // Status as text
        console.log(`${idx +1}. (${status}) ${task.text}`) // Print each task
    })
    rl.question ('\nTask number: ', (num) => { // Prompt for task number
        promptMarkTaskAsDone(num) // Pass input to markTaskAsDone function
    })
}
//NOTE - Funciton to mark the selected task as completed
function markTaskAsDone(num) {
    let idx = parseInt(num) -1 // Convert user input to array index
    if(todos[idx]) { // If a task exists at the index
        todos[idx].done = true // Mark the task as completed
        saveTasks()     // Save changes to file
        console.log('Task mark as completed!') // Confirm completion
    } else {
        console.log('Invalid task number.') // If input invalid, show error
    }
    showMenu() // Show menu again
}
//NOTE - Function to prompt the user to select a task to delete 
function promptDeleteTask() {
    if(todos.length === 0) {
        console.log('\nNo tasks to delete.')
        return showMenu()
    }
    console.log('\nSelect the number of the task to delete:')
    todos.forEach((task,idx) => {
        const status = task.done ? 'Completed' : 'Not Complete'
        console.log(`${idx +1}. (${status}) ${task.text}`)
    })
}