
const gameContainer = document.querySelector('#gameContainer');
const gameBoard = document.createElement('div');

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

function createGameBoard(){
    const gameSize = 3;
    gameBoard.style = `display:grid;
                       grid-template: repeat(${gameSize},1fr) / repeat(${gameSize},1fr);
                       width:800px;
                       height:800px;
                       border:1px solid black;`;

    for(let i=0; i<gameSize*gameSize; i++){
        const gameSquare = document.createElement('div');
        gameSquare.setAttribute('class', 'gameSquare');
        gameSquare.style.background="red";
        gameSquare.style.border ="1px solid black";
        gameBoard.appendChild(gameSquare);
    }
    gameContainer.appendChild(gameBoard);
}

const square = Array.from(document.querySelectorAll('#gameBoard'));

gameBoard.addEventListener('click', (e) =>{
    console.log(square);
});
createGameBoard();