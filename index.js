const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const grid=9;
var numL = [];
var val;
let num;
var tileSize = 48;
let startDiv = document.getElementById("start")
let resetDiv = document.getElementById("reset")
let clockDiv = document.getElementById("clock")

canvas.width = window.screen.width - 10
canvas.height = 546
gameScreenWidth = 640
startPosX = (window.screen.width / 4)
startPosY= 40 
var xFill = startPosX
var time = 0
var win = true

board = [];

class Tile {
    constructor(value, visible, posX, posY){
       this.posX = posX
       this.posY = posY
       this.value = value;
       this.visible = visible;
       this.input = document.createElement('input');
       this.input.type = 'text';
       this.input.style.position = 'fixed';
       this.input.size = "3"
       this.input.style.height = "48px"
       this.input.style.width = "48px"
       this.input.style.fontSize = "20pt"
       this.input.maxLength = "1"
       this.input.style.textAlign = "center"
       this.input.style.left = (this.posX + 8) + 'px';
       this.input.style.top = (this.posY + 8) + 'px';
       document.body.appendChild(this.input);
       this.input.style.display = "none"
       this.input.addEventListener('keydown', function(e) {
           var key   = e.keyCode ? e.keyCode : e.which;

           if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
                (key == 65 && ( e.ctrlKey || e.metaKey  ) ) ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
                (key >= 96 && key <= 105)
              )) e.preventDefault();
       })
    }

    draw(){

        if (this.visible == false){
            this.input.style.display = "block"
        }

        if (this.visible == true){
            c.fillStyle = "white";
            c.fillRect(this.posX, this.posY, tileSize, tileSize)
            c.font = "bold 48px serif"
            c.fillStyle = "black"
            c.fillText(this.value, this.posX + 12, this.posY + 40)
            this.input.style.display = "none"
        }
    }

    init(){
        c.fillStyle = "white";
        c.fillRect(this.posX, this.posY, tileSize, tileSize)
    }
}

function checkBoard(){
    win = true
    for (i = 0; i < grid; i++){
        for (j = 0; j < grid; j++){
            if (board[i][j].visible == false){
                if (board[i][j].input.value != board[i][j].value) {
                    win = false
                }
            }
        }
    }
}
function timer(){
    time++
    minute = parseInt(time / 60, 10)
    second = parseInt(time % 60, 10)
    second = second < 10 ? "0" + second: second;
    document.querySelector("#clock").innerHTML = minute + ":" + second
    checkBoard()
    if (win == true){
        console.log("game over")
        resetDiv.style.display = "none"
        time = 0
        return true;
    }
    else{
        setTimeout(timer, 1000)
    }
}

for (var i = 0; i < grid; i++){
    let yFill = startPosY
    xPos = i%3;
    if (xPos == 0){
        xFill += 5;
    }
        xFill += 5;
    for (var j = 0; j < grid; j++){
        yPos = j%3;
        yFill += 5;
        if (yPos == 0){
            yFill += 5;
        }
        let posX = (i * tileSize) + xFill;
        let posY = (j * tileSize) + yFill;
        board[i] = [...(board[i] ? board[i] : []),
            new Tile("0", false, posX, posY)
        ];
    }
}


function create_board(){
    for (var i = 0; i < grid; i++){
        for (var n = 0; n < grid; n++){
            let num = n+1
            numL.push(num.toString());
        }
        for (var j = 0; j < grid; j++){
            let ylist = [...numL];
            if (i >= 1){
                for (var k = 0; k < i; k++){
                    let index = ylist.indexOf(board[k][j].value);
                    if (index > -1){
                        ylist.splice(index, 1);
                    }
                }
                xPos = -(i%3);
                yPos = -(j%3);
                for (var l = 0; l < 3; l++){
                    for (var m = 0; m < 3; m++){
                        let index = ylist.indexOf(board[i + xPos][j + yPos].value)
                        if (index > -1){
                            ylist.splice(index, 1);
                        }
                       yPos++;
                    }
                    xPos++;
                    yPos = -(j%3);
                }
                if (ylist.length < 1){
                    j = -1;
                    numL = [];
                    for (var k = 0; k < grid; k++){
                        let num = k+1;
                        numL.push(num.toString());
                        board[i][k].value = "0"
                    }
                    continue;
                }
                val = ylist[Math.floor(Math.random() * ylist.length)];
            }
            else {
                val = numL[Math.floor(Math.random() * numL.length)];
            }
            board[i][j].value = val;
            numL.splice(numL.indexOf(val), 1);
            ylist = [];
        }
    }
}

function init(){
    canvas.style.display = "block"
    c.fillRect(startPosX, startPosY, gameScreenWidth, canvas.height);
    c.fillStyle = "white"
    c.fillRect(990, startPosY+10, 110, canvas.height - 66)
    startDiv.style.position = "absolute"
    startDiv.style.left = "1000px"
    startDiv.style.top = "378px"
    resetDiv.style.position = "absolute"
    resetDiv.style.left = "1000px"
    resetDiv.style.top = "431px"
    clockDiv.style.position = "absolute"
    clockDiv.style.left = "995px"
    clockDiv.style.top = "214px"
    resetDiv.style.display = "none"
    for (var i = 0; i < grid; i++){
        for (var j = 0; j < grid; j++){
            board[i][j].value = 0;
            board[i][j].visible = false;
            board[i][j].init();
        }

    }
}

function start_game(){

    for (var i = 0; i < grid; i++){
        for (var j = 0; j < grid; j++){
            board[i][j].value = 0;
            board[i][j].visible = false;
        }
    }

    win = true
    resetDiv.style.display = "flex"
    create_board()

    for (var l = 0; l < 41; l++){
        let rx = Math.floor(Math.random() * grid);
        let ry = Math.floor(Math.random() * grid);
        if (board[rx][ry].visible == true){
            l--;
        }
        else {
            board[rx][ry].visible = true;
        }
    }

    for (var i = 0; i < grid; i++){
        for (var j = 0; j < grid; j++){
            board[i][j].draw();
        }

    }

    for (i = 0; i < grid; i++){
        console.log(board[0][i].value, board[1][i].value, board[2][i].value, board[3][i].value, board[4][i].value, board[5][i].value, board[6][i].value, board[7][i].value, board[8][i].value)
    }
    if (time == 0){
        timer()
        console.log("timer initiated")
    }
    else{
        time = 0
        document.querySelector("#clock").innerHTML = "0:00"
    }
}

function reset_game(){
    for (var i = 0; i < grid; i++){
        for (var j = 0; j < grid; j++){
            board[i][j].input.value = "";
            time = 0
            win = true
            document.querySelector("#clock").innerHTML = "0:00"
        }
    }
}

init()

