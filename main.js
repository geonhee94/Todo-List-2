//1.check 버튼을 클릭하는 순간 true>false
//2. true 이면 끝난걸로 간주하고 밑줄 보여주기 
//3. false이면 안끝난걸로 간주하고 그대로
let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []

addButton.addEventListener("click",addTask)


function addTask(){
    //개개인을 분리해서 보고 어떤걸 선택했는지 알 수 있게 하는것 > task에 id를 부여
    //각각의 아이템에 대해서 잘 나와있음 객체의 힘. let task{컨텐츠, 넣어야 할 것.} 그 후 푸시에 그 테스크를 넣어주는것.
    //추가정보를 만들기 위해 객체(필요한 관련정보를 하나로 묶어주는 것)가 필요. (체크버튼 나왔다 안나왔다)
    let task = {
        id:randomIDGenerate(),
        taskContent : taskInput.value,
        //끝났는지 안끝났는지 묻는 것 false라고 기본값 세팅
        isComplete:false,
    }
    taskList.push(task)
    console.log(taskList)
    render()
}
//그림을 그려주는 거는 렌더로 처리해주자..?
//click을 js에서 직접적으로 주는 법 > button onclick ="함수" > 그 함수를 나중에 펑션으로 정의해주고 콘솔하면됨.
//리스트를 그려줄거야 그리는함수를 만들어줘
//object라고 뜨는 걸 바꿔줄 랜더>taskList[i].taskContent로 바꿔
function render(){
    let resultHTML = ''
    for(let i=0; i<taskList.length;i++){
        //체크해서 할일이 끝나면 밑줄그어지게 하는것. 
        if(taskList[i].isComplete == true){
            resultHTML+=`<div class="task">
        <div class="task task-done task-live">${taskList[i].taskContent}</div>
        <div class="button-box">
            <button onclick ="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-right fa-rotate-180 fa-2xl" style="color: #a8b0bd;"></i></i></button>
            <button onclick ="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-xmark fa-2xl" style="color: #ee2b52;"></i></button>
        </div>
     </div> `
        }else{
            resultHTML += `<div class="task">
        <div class="task-live">${taskList[i].taskContent}</div>
        <div class="button-box">
            <button onclick ="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check fa-2xl" style="color: #74C0FC;"></i></button>
            <button onclick ="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-xmark fa-2xl" style="color: #ee2b52;"></i></button>
        </div>
      </div>`
        }
        

    }


    document.getElementById("task-board").innerHTML = resultHTML
}
function toggleComplete(id){
    //check를 함으로써 어떤 id 값을 받아왔는지 알 수 있게 됨
    //id 값을 불러왔으니까 id 값을 베이스로 아이템을 찾을것이다.
    for(let i=0;i<taskList.length;i++){
       if(taskList[i].id === id){
        //true와 false로 왔다갔다 하게 하기 !taskList[i].isComplete (!뜻은 not의 뜻)(A=!A이렇게 하는건데 A가 TRUE면 =FALSE가되는 것이고, A가 FALSE면 =TRUE가 되는것이다. 현재 갖고 있는 값의 반대값을 넣어주는 것 )
        taskList[i].isComplete=!taskList[i].isComplete
        //for문을 종료한다 > break
        //check를 누름으로써 true로 나올 수 있게 한것. 
        break;
       } 
    }
    //RENDER를 불러줘야 체크를 하면 선이 그어진다.
    render()
    console.log(taskList)
}

//delete를 누르면 할일 삭제되는 함수 온클릭으로 쓰고 지금 함수 만드는것.
function deleteTask(id){
    
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList.splice(i,1)
            break
        }
    }
    //값을 업데이트 해주면 ui도 업데이트 해줘야함
    render()
}


//데이터에 id 값을 부여하는 것이다. (주민등록번호 생각하면 됨)
//위의 task에서 랜덤아이디 제너레이트 함수를 호출하면 밑으로 와서 리턴 함수를 리턴해주면 id가 바로 봐줄수 있음?
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}