
const createGameboard = () => {
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

const createPlayer = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;
    return { getName, getPiece };
}

const createGame = () => {
    const board = Gameboard();
}

const DisplayController = (function () {
    const grid = document.querySelector(".grid");

    const fillGrid = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const gridButton = ElementCreator.createGridButton(i, j);
                grid.append(gridButton);
            }
        }
    }

    return { fillGrid }
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