
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
    let gameState = new GameState(new Map2d("country_roads"), null, 5, 5, 1)
    let view = new View('screen', gameState);
    
    
}


main();
console.log("Launched main function, setup exits.");