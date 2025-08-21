
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
