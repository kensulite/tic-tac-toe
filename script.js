
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

    const checkBoardFull = () => board.flat().every((slot) => slot.length === 1);

    const printBoard = () => console.log(board);

    return { placePiece, checkEqualColumns, checkEqualRows, checkEqualDiagonals, checkBoardFull, printBoard }
}

const createPlayer = (name, piece, score = 0) => {
    const getName = () => name;
    const getPiece = () => piece;
    const getScore = () => score;
    const increaseScore = () => score += 1;
    return { getName, getPiece, getScore, increaseScore };
}

const createGame = (firstName, secondName) => {
    let round = 1;
    let board = createGameboard();
    const playerOne = createPlayer(firstName, "x");
    const playerTwo = createPlayer(secondName, "o");
    const getCurrentPlayer = () => round % 2 === 0 ? playerOne : playerTwo;
    const increaseRound = () => round += 1;
    const getRound = () => round;
    const resetBoard = () => {
        board = createGameboard();
    }
    const getBoard = () => board;
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
        } else if (board.checkBoardFull()) {
            return {
                direction: "draw",
                position: -1
            }
        } else {
            return null;
        }
    }

    const increaseCurrentPlayerScore = () => {
        const currentPlayer = getCurrentPlayer();
        currentPlayer.increaseScore();
    }

    const getPlayerOneScore = () => playerOne.getScore();
    const getPlayerTwoScore = () => playerTwo.getScore();

    return {
        getBoard,
        getCurrentPlayer,
        increaseRound,
        checkGameOver,
        getRound,
        resetBoard,
        increaseCurrentPlayerScore,
        getPlayerOneScore,
        getPlayerTwoScore
    }
}

const DisplayController = (function () {
    let game = createGame("default1", "default2");

    const initialize = () => {
        fillGrid();
        addGridButtonEvents();
        alternateBoardButtons(true);
        addStartEvent();
    }

    const startGame = () => {
        if (game.getRound() === 1) {
            const playerOneName = document.querySelector(".playerOne input").value;
            const playerTwoName = document.querySelector(".playerTwo input").value;
            game = createGame(
                playerOneName ? playerOneName : "Yuzuki Yukari",
                playerTwoName ? playerTwoName : "Megpoid"
            );
        } else {
            game.resetBoard();
        }
        resetGrid();
        alternateBoardButtons(false);
        alternateUserInputs(true);
        alternateStartButton(true);
    }

    const alternateStartButton = (state) => {
        const startButton = document.querySelector(".start");
        startButton.disabled = state;
    }

    const alternateUserInputs = (state) => {
        const inputs = document.querySelectorAll("input");
        for (const input of inputs) {
            input.disabled = state;
        }
    }

    const addStartEvent = () => {
        const startButton = document.querySelector(".start");
        startButton.addEventListener("click", startGame);
    }

    const fillGrid = () => {
        const grid = document.querySelector(".grid");
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
        if (game.getBoard().placePiece(row, col, player.getPiece())) {
            e.target.textContent = player.getPiece();
            e.target.classList.add(game.getCurrentPlayer().getPiece());
            const gameOver = game.checkGameOver();
            if (gameOver) {
                if (gameOver.direction !== "draw") {
                    game.increaseCurrentPlayerScore();
                }
                endGame(gameOver);
            }
            game.increaseRound();
        }
    }

    const resetGrid = () => {
        const grid = document.querySelector(".grid");
        grid.replaceChildren();
        fillGrid();
        addGridButtonEvents();
    }

    const endGame = (state) => {
        alternateStartButton(false);
        alternateBoardButtons(true);
        updateScores();
        switch (state.position) {

        }
    }

    const addGridButtonEvents = () => {
        const boardButtons = document.querySelectorAll(".grid button");
        for (const button of boardButtons) {
            button.addEventListener("click", handleBoardButtonClick);
        }
    }

    const updateScores = () => {
        const firstScore = document.querySelector(".playerOne.score");
        const secondScore = document.querySelector(".playerTwo.score");
        firstScore.textContent = game.getPlayerOneScore();
        secondScore.textContent = game.getPlayerTwoScore();
    }

    const alternateBoardButtons = (state) => {
        const boardButtons = document.querySelectorAll(".grid button")
        for (const button of boardButtons) {
            button.disabled = state;
        }
    }

    return { addGridButtonEvents, fillGrid, initialize }
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

DisplayController.initialize();