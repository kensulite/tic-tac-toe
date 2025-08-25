
const createGameboard = () => {
    const board = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]];
    const placePiece = (row, col, piece) => {
        if (board[row][col].length === 1) {
            return false;
        }
        board[row][col] = piece;
        return true;
    }

    const checkEqualColumns = () => {
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return i;
            }
        }
        return -1;
    }

    const checkEqualRows = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return i;
            }
        }
        return -1;
    }

    const checkEqualDiagonals = () => {
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return 1;
        } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            return 2;
        } else {
            return -1;
        }
    }

    return { placePiece, checkEqualColumns, checkEqualRows, checkEqualDiagonals }
}

const createPlayer = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;
    return { getName, getPiece };
}

const createGame = (firstName, secondName) => {
    let round = 1;
    const board = createGameboard();
    const playerOne = createPlayer(firstName, "x");
    const playerTwo = createPlayer(secondName, "o");
    const getCurrentPlayer = () => round % 2 === 0 ? playerOne : playerTwo;
    const increaseRound = () => round += 1;

    const checkGameOver = () => {
        const columnsCheck = board.checkEqualColumns();
        const rowsCheck = board.checkEqualRows();
        const diagonalsCheck = board.checkEqualDiagonals();
        if (columnsCheck >= 0) {
            return {
                direction: "column",
                position: columnsCheck
            }
        } else if (rowsCheck >= 0) {
            return {
                direction: "row",
                position: rowsCheck
            }
        } else if (diagonalsCheck >= 0) {
            return {
                direction: "diagonal",
                position: diagonalsCheck
            }
        } else {
            return null;
        }
    }

    return {
        placeBoardPiece: board.placePiece,
        getCurrentPlayer, increaseRound,
        checkGameOver
    }
}

const DisplayController = (function () {
    const game = createGame("default1", "default2");
    const grid = document.querySelector(".grid");

    const fillGrid = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const gridButton = ElementCreator.createGridButton(i, j);
                grid.append(gridButton);
            }
        }
    }

    const handleBoardButtonClick = (e) => {
        const row = e.target.getAttribute("data-row");
        const col = e.target.getAttribute("data-col");
        const player = game.getCurrentPlayer();
        if (game.placeBoardPiece(row, col, player.getPiece())) {
            e.target.textContent = player.getPiece();
            game.increaseRound();
            const gameOver = game.checkGameOver();
            if (gameOver) {
                endGame();
            }
        }
    }

    const endGame = () => {
        disableBoardButtons();
    }

    const addGridButtonEvents = () => {
        const boardButtons = document.querySelectorAll(".grid button");
        for (const button of boardButtons) {
            button.addEventListener("click", handleBoardButtonClick);
        }
    }


    const disableBoardButtons = () => {
        const boardButtons = document.querySelectorAll(".grid button")
        for (const button of boardButtons) {
            button.disabled = true;
        }
    }

    return { addGridButtonEvents, fillGrid }
})();

const ElementCreator = (function () {
    const createGridButton = (row, col) => {
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("data-col", col);
        button.setAttribute("data-row", row);
        return button;
    }

    return { createGridButton }
})();

DisplayController.fillGrid();
DisplayController.addGridButtonEvents();