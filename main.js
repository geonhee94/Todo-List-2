//1.check 버튼을 클릭하는 순간 true>false
//2. true 이면 끝난걸로 간주하고 밑줄 보여주기 
//3. false이면 안끝난걸로 간주하고 그대로
let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = []
//전역변수로 mode를 선언해줌, all로 한 것은 처음 세팅이 모두(all)이니까, 이렇게 전역변수로 선언하면 렌더함수에서 쓸수 있게 된다.
let mode='all'
//얘도 mode와 같이 전역변수로 선언해줬음 render라는 함수가 접근가능하도록
let filterList=[]

//tabs에 분홍 밑줄 오게 하는거
let underLine = document.getElementById("under-line")
tabs.forEach(menu=>menu.addEventListener("click",(e)=>underLine2(e)))
function underLine2(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px"
    underLine.style.width = e.currentTarget.offsetWidth + "px"
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px"
}

taskInput.addEventListener("focus",function(){taskInput.value=""})
addButton.addEventListener("mousedown",addTask)
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    }
  })


for(let i=1;i<tabs.length;i++){
    //탭 같은 경우 이벤트를 해서 이벤트를 타겟으로..바꾼다?
tabs[i].addEventListener("click",function(event){filter(event)})
}
console.log(tabs);

function addTask(){
    let taskValue = taskInput.value
    if(taskValue === "") return alert("할일을 입력해주세요")
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
    taskInput.value = ""
    render()
}
//그림을 그려주는 거는 렌더로 처리해주자..?
//click을 js에서 직접적으로 주는 법 > button onclick ="함수" > 그 함수를 나중에 펑션으로 정의해주고 콘솔하면됨.
//리스트를 그려줄거야 그리는함수를 만들어줘
//object라고 뜨는 걸 바꿔줄 랜더>taskList[i].taskContent로 바꿔
function render(){
    //1. 내가 선택한 탭에 따라서(mode가 들고 있음) 따라서 let mode를 저 밑에 함수에서만 선언하지 말고 전역변수, 즉 맨 위에서 선언해주자.
    let list=[]
    if(mode === "all"){
    // 예를 들어 all을 선택하면 taskList보여주면 되는거고
    //all인 경우엔 taskList를 넣어주고
        list = taskList
    }else if(mode === "ongoing" || mode === "done"){
    //아니면 ongoing이나 done을 선택한거면 filterList를 보여줘야한다. 즉 상황에 따라 달리 보여줘야함.
    //ongoing이면 리스트에 filterList를 넣어준다. 근데 필터리스트를 필터라는 함수 안에 정의해준거기 때문에 여기서 못써 그래서 mode랑 똑같이 전역변수로 선언해주자.
        list = filterList
    }
    //2. 상황에따라서 리스트를 달리 보여준다 (let list()로 위에 만들어준다.)
    let resultHTML = ''
    //taskList를 보여주는게 아니라 list를 보여준다. 따라서 테스크리스트를 전부 리스트로 바꿔라.
    for(let i=0; i<list.length;i++){
        //체크해서 할일이 끝나면 밑줄그어지게 하는것. 
        if(list[i].isComplete == true){
            resultHTML+=`<div class="task">
        <div class="task task-done task-live">${list[i].taskContent}</div>
        <div class="button-box">
            <button class="rotate" onclick ="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right fa-rotate-180 fa-2xl" style="color: #a8b0bd;"></i></i></button>
            <button class ="xmark" onclick ="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark fa-2xl" style="color: #ee2b52;"></i></button>
        </div>
     </div> `
        }else{
            resultHTML += `<div class="task">
        <div class="task-live">${list[i].taskContent}</div>
        <div class="button-box">
            <button class="check" onclick ="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-2xl" style="color: #74C0FC;"></i></button>
            <button class="xmark" onclick ="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark fa-2xl" style="color: #ee2b52;"></i></button>
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
    filter()
    
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
    filter()
}
function filter(e){
    //event.target.id이거를 변수 mode로 만들어 준다.
    if (e) {
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top =
          e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
      }
    //이제 event.target.id를 mode로 대체해준다.
    //진행중인 아이템들을 모아주는 어레이 변수선언 필터리스트 
     filterList =[]
    if(mode ==="all"){
        //전체 리스트를 보여준다.
        render()
    }else if(mode === "ongoing"){
        //진행중인 아이템을 보여준다.
        //task.isComplete=false(진행중인 애) 인 값을 보여주면 되는 것.
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
            filterList.push(taskList[i])
            }
        }
        //render는 ui 바꾸는거(직접 보이게 하는 것)
        //render()해도 ui가 안나오는데 render함수를 손봐줘야함.
        render()
        
    }else if(mode === "done"){
        //끝나는 케이스   
        //task.isComplete=true 인 값을 보여주면 되는 것이다.
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
     render()
    }
}

//데이터에 id 값을 부여하는 것이다. (주민등록번호 생각하면 됨)
//위의 task에서 랜덤아이디 제너레이트 함수를 호출하면 밑으로 와서 리턴 함수를 리턴해주면 id가 바로 봐줄수 있음?
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}