/**
 * A GameState contains all information needed to determine the state of the game
 * (or draw it).
 * - A map
 * - A plan, optionally 
 * - A player position and orientation
 */

class GameState {
    constructor(map, plan, row, col, orientation) {
        this.map = map;
        this.plan = plan;
        this.row = row;
        this.col = col;
        this.orientation = orientation;
    }
}