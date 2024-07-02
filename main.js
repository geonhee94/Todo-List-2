let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []

addButton.addEventListener("click",addTask)


function addTask(){
    
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log(taskList)
    render()
}

//리스트를 그려줄거야 그리는함수를 만들어줘
function render(){
    let resultHTML = ''
    for(let i=0; i<taskList.length;i++){
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
      </div>`

    }


    document.getElementById("task-board").innerHTML = resultHTML
}