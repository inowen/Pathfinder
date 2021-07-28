
async function main() {
    /**
     * In here: Await loading the textures, load map, initialize model, view and controller.
     * Then finally attach the listeners to the html elements. The listeners call controller methods
     * (the controller is a singleton).
     */

    // Create view, wait for images to load


    // Create and initialize model

    // Start controller, pass references to view and model

    // Add the callbacks to the html elements


    // DOWN HERE, DEBUGGING
    let country_roads = new Map2d("country_roads");
    let gameState = new GameState(country_roads, null, 18, 2, 3);
    let view = new View('screen', gameState, null);

    let model = new Model("bfs", "country_roads");
    view.setGameState(model.getGameState());
    view.refresh();

    model.step();
    view.setGameState(model.getGameState());
    view.refresh();
}


main();
console.log("Launched main function, setup exits.");