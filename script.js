
const Gameboard = () => {
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

const Player = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;
    return { getName, getPiece };
}