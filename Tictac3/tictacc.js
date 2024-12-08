const boxes = Array.from(document.getElementsByClassName('box'));

const playText = document.getElementById('player');  // Targeting the display element
const restartbtn = document.getElementById('restartbtn');
const spaces = Array(9).fill(null);  // Initialize an array with 9 null values
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;

const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';

        if (index < 3) 
        {
            styleString += 'border-bottom: 3px solid #000;';
        }

        if (index % 3 === 0) 
           {
            styleString += 'border-right: 3px solid #000;';
           }

        if (index % 3 === 2) 
          {
            styleString += 'border-left: 3px solid #000;';
          }

        if (index > 5)
            {
                styleString += 'border-top: 3px solid #000;';
            } 

        box.style = styleString;
        box.addEventListener('click', boxClicked);
    });
};

const boxClicked = (e) => {
    const id = e.target.id;
    console.log(id);
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;
        
        if (playerHasWon()) {
            playText.innerHTML = `${currentPlayer} has won!`;
            return;
        }
        
        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    }
};

const playerHasWon = () => {
    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} wins across the top.`);
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins down the left.`);
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally.`);
            return true;
        }
    } else if (spaces[8] === currentPlayer) {
        if (spaces[5] === currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} wins across the right.`);
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[0] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally.`);
            return true;
        }
        if (spaces[7] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins across the bottom.`);
            return true;
        }
    } else if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins vertically in the middle.`);
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins horizontally in the middle.`);
            return true;
        }
        if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally.`);
            return true;
        }
    }
    return false;
};

// Restart function to reset the board and game state
const restart = () => {
    spaces.fill(null);  // Reset all spaces to null
    boxes.forEach((box) => {
        box.innerHTML = '';  // Clear each box
    });
    playText.innerHTML = `Let's play`;
    currentPlayer = O_TEXT;
};

restartbtn.addEventListener('click', restart);  // Event listener for restart button

drawBoard();
restart();  // Initialize the board
