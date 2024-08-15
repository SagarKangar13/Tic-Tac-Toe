let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn = document.querySelector("#turn");
let title = document.querySelector("#title");
let container = document.querySelector(".container");

let turnO = false; // two players are- PlayerX (first Player) & PlayerO (second Player)

let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let btnCount = 0;

const resetGame = () => {
    turnO = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    title.classList.remove("hide");
    turn.classList.remove("hide");
    container.classList.remove("hide");
    resetbtn.classList.remove("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            //PlayerO
            box.innerText="O";
            box.style.color="#f99b45";
            turnO = false;
            btnCount++;
            turn.innerText="Turn for PlayerX";
        } else{
            //PlayerX
            box.innerText="X";
            box.style.color="#d95980";
            turnO = true;
            btnCount++;
            turn.innerText="Turn for PlayerO";
        }
        box.disabled = true;

        checkWinner();
        if (!msgContainer.classList.contains("hide")) return;
        checkDraw();
    });
});

const checkDraw = () => {
    if(btnCount === 9){
        msg.innerText = `Game Draw! Lets play again`;
        msgContainer.classList.remove("hide");
        btnCount = 0;
    }
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                btnCount = 0;
            }
        }
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is Player${winner}`;
    disableBoxes();
    highlightWinningBoxes();
    setTimeout( () => {
        msgContainer.classList.remove("hide");
        title.classList.add("hide");
        turn.classList.add("hide");
        container.classList.add("hide");
        resetbtn.classList.add("hide");
    },1000);
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color="";
        box.style.backgroundColor = "#819ff9a1";
    }
}

const highlightWinningBoxes = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val != "" && pos1val === pos2val && pos2val === pos3val) {
            boxes[pattern[0]].style.backgroundColor = "#ffd1dc";
            boxes[pattern[1]].style.backgroundColor = "#ffd1dc";
            boxes[pattern[2]].style.backgroundColor = "#ffd1dc";
        }
    }
};


newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);