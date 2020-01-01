const gameSettings = document.querySelector('#gameSettings');

document.body.addEventListener('click', () =>{

})

const game = () =>{
    const playerOneMark = document.querySelector('#playerOneMark').value;
    const playerOneName = document.querySelector('#playerOneName').value;
    const playerTwoMark = document.querySelector('#playerTwoMark').value;
    const playerTwoName = document.querySelector('#playerTwoName').value;
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

    function playAi(arr){
        console.log("ai engaged");
        let aiPlay = Player('O', 'AI');
        players.push(aiPlay);
        for(let i=0; i<arr.length; i++){
            if(arr[i] === null){
                arr[i] = gameBoard.innerHTML[i] =  aiPlay.mark;
                console.log(i);
            }
        }
    }

    function createGrid(gBoard,gBoardArr, gSize){
        for(let i=0; i<gSize*gSize; i++){
            gBoardArr.push(null);
            const gameSquare = document.createElement('div');
            gameSquare.setAttribute('class', 'gameSquare');
            gameSquare.dataset.idx = i;
            gameSquare.style = `
                                background:red;
                                border: 1px solid black;`;
            gBoard.appendChild(gameSquare);
        }
    }
    function initGame(){
        gameBoard.style = `
                        display:grid;
                        grid-template: repeat(${gameSize},1fr) / repeat(${gameSize},1fr);
                        width:800px;
                        height:800px;
                        border:1px solid black;`;

        createGrid(gameBoard,gameBoardArr, gameSize);
        gameContainer.appendChild(gameBoard);
    }

    document.querySelector('#startGame').addEventListener('click', (e) =>{
        e.preventDefault();
        gameOn();
    });

    function assignPlayerInfo(){
        if(playerOneMark == ''){
            let playerOne = Player('X', playerOneName);
            players.push(playerOne);
       }
       if(playerTwoMark == ''){
            playAi(gameBoardArr);
       }
       else{
            let playerTwo = Player(playerTwoMark, playerOneName);
            let playerOne = Player(playerOneMark, playerOneName);
            players.push(playerOne);
            players.push(playerTwo);
       }

       console.log("asisng: " + players.length);
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
        gameSettings.style.visibility = 'hidden';
        console.log('game on..');
        reset();

       console.log(players.length);

        gameBoard.addEventListener('click', playSquare);
    }

    function checkWinner(){
        //let winScreen = createElement('div');
        let winner;
        //HORIZONTAL CHECKING
        for(let i=0; i<gameBoardArr.length; i+=gameSize){
            if(gameBoardArr[i] != null && gameBoardArr[i] === winningPositions[i] /*gameBoardArr[i] === gameBoardArr[i+1] && gameBoardArr[i+1] === gameBoardArr[i+2]*/){
                if(gameBoardArr[i] === players[0].mark){
                    playerOneName != '' ? console.log(playerOneName + ' wins') : console.log(playerOneMark + ' wins')
                }
                else{
                    playerTwoName != '' ? console.log(playerTwoName + ' wins') : console.log(playerTwoMark + ' wins')
                };
                gameBoard.removeEventListener('click', playSquare);
            }
        }
        //VERTICAL CHECKING
        for(let i=0; i<gameBoardArr.length/gameSize; i++){
            if(gameBoardArr[i] != null && gameBoardArr[i] === gameBoardArr[i+gameSize] && gameBoardArr[i+gameSize] === gameBoardArr[i+(gameSize*2)]){
                if(gameBoardArr[i] === players[0].mark){
                    playerOneName != '' ? console.log(playerOneName + ' wins') : console.log(playerOneMark + ' wins')
                }
                else{
                    playerTwoName != '' ? console.log(playerTwoName + ' wins') : console.log(playerTwoMark + ' wins')
                };
                gameBoard.removeEventListener('click', playSquare);
            }
        }
        //DIAGONAL CHECKING
        for(let i=0; i<=gameSize; i+=gameSize-1){
            if(gameBoardArr[i] != null && gameBoardArr[i] === gameBoardArr[i+gameSize+1] && gameBoardArr[i+gameSize+1] === gameBoardArr[i+(gameSize*gameSize)-1] || 
            gameBoardArr[i] != null && gameBoardArr[i] === gameBoardArr[i+(gameSize-1)] && gameBoardArr[i+(gameSize-1)] === gameBoardArr[i+(gameSize+1)]){
                if(gameBoardArr[i] === players[0].mark){
                    playerOneName != '' ? console.log(playerOneName + ' wins') : console.log(playerOneMark + ' wins')
                }
                else{
                    playerTwoName != '' ? console.log(playerTwoName + ' wins') : console.log(playerTwoMark + ' wins')
                };
                gameBoard.removeEventListener('click', playSquare);
               }
        }
    }

    function reset(){
        console.log('reset');
        players = [];
        assignPlayerInfo();
        playerOneTurn=true;
        gameBoard.innerHTML = '';
        gameBoardArr = [];
        createGrid(gameBoard, gameBoardArr, gameSize);
    }

    initGame();
}

const Player = (mark, name) =>{
    return {mark, name}
}

game();