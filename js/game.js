const gameSettings = document.querySelector('#gameSettings');
const playerOneSettings = document.querySelector('#playerOneSettings');
const playerTwoSettings = document.querySelector('#playerTwoSettings');
const playerOneMark = document.querySelector('#playerOneMark');
const playerTwoMark = document.querySelector('#playerTwoMark');

const game = () =>{
    const gameSize = 3;
    let players = [];
    let playerOneTurn = true;

    const gameContainer = document.querySelector('#gameContainer');
    const gameBoard = document.createElement('div');
    let gameBoardArr = []

    //const winRowAmount = gameSize;
    const winningPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [1,4,8],
        [2,4,6]
    ]
    let gameStarted = false;

    function initGame(){
        gameBoard.style = `display:grid;
                        grid-template: repeat(${gameSize},1fr) / repeat(${gameSize},1fr);
                        width:800px;
                        height:800px;
                        border:1px solid black;`;

        for(let i=0; i<gameSize*gameSize; i++){
            gameBoardArr.push(null);
            const gameSquare = document.createElement('div');
            gameSquare.setAttribute('class', 'gameSquare');
            gameSquare.dataset.idx = i;
            gameSquare.style = `
                                background:red;
                                border: 1px solid black;`;
            gameBoard.appendChild(gameSquare);
        }
        gameContainer.appendChild(gameBoard);
    }

    document.querySelector('#startGame').addEventListener('click', (e) =>{
        e.preventDefault();
        gameOn();
    });

    function gameSettings(){
        
    }

    let playSquare = function(e){
        gameBoard.style.fontSize = '200px'; 
        target = e.target;

        if(gameBoardArr[target.dataset.idx] === null){
            if(playerOneTurn){
                gameBoardArr[target.dataset.idx] = target.innerHTML = players[0].mark;
                checkWinner();
                playerOneTurn = false;
            }
            else{
                gameBoardArr[target.dataset.idx] = target.innerHTML = players[1].mark;
                checkWinner();
                playerOneTurn=true;
            }
        }
        else if(target != null)
            console.log("choose another spot")
       }


    function gameOn(){
        console.log('game on..');
        reset();
        let playerOne = Player(playerOneMark.value, '');
        let playerTwo = Player(playerTwoMark.value, '');

        players.push(playerOne);
        players.push(playerTwo);

       if(playerOneMark.value == ''){
           playerOne.mark = 'X';
       }
       else if(playerTwoMark.value == ''){
           playerTwo.mark = 'O';
       }
       else{
           playerOne.mark = playerOneMark.value;
           playerTwo.mark = playerTwoMark.value;
       }

        gameBoard.addEventListener('click', playSquare);
    }

    function checkWinner(){
        for(let i=0; i<gameBoardArr.length; i+=gameSize){
            if(gameBoardArr[i] != null && gameBoardArr[i] === gameBoardArr[i+1] && gameBoardArr[i+1] === gameBoardArr[i+2]){
                console.log(gameBoardArr[i] + 'won!');
                gameBoard.removeEventListener('click', playSquare);
            }
        }
        for(let i=0; i<gameBoardArr.length/gameSize; i++){
            if(gameBoardArr[i] != null && gameBoardArr[i] === gameBoardArr[i+gameSize] && gameBoardArr[i+gameSize] === gameBoardArr[i+(gameSize*2)]){
                console.log(gameBoardArr[i] + ' won');
            }
        }

        for(let i=0; i<=3; i+=2){

            if(gameBoardArr[i] != null && gameBoardArr[i] === gameBoardArr[i+gameSize+1] && gameBoardArr[i+gameSize+1] === gameBoardArr[i+(gameSize*gameSize)-1] ||
               gameBoardArr[i] != null && gameBoardArr[i] === gameBoardArr[i+(gameSize-1)] && gameBoardArr[i+(gameSize-1)] === gameBoardArr[i+(gameSize+1)]){
                   console.log("lapanen");
               }
        }
    }

    function reset(){
        console.log('reset');

        for(let i=0; i<gameBoardArr.length; i++){

            gameBoardArr[i] = null;

        }
        console.log(gameBoardArr);
    }

    initGame();


}

const Player = (mark, name) =>{

    return {mark, name}
}

game();