
async function main() {
    /**
     * In here: Await loading the textures, load map, initialize model, view and controller.
     * Then finally attach the listeners to the html elements. The listeners call controller methods
     * (the controller is a singleton).
     */

    // Parse arguments
    const params = new URLSearchParams(window.location.search);
    var algorithm_name = params.get('algorithm');
    var map_name = params.get('map');

    // For debugging (DELETE LINE)
    console.log("Algorithm: " + algorithm_name + " Map: " + map_name);

    // Create view, wait for images to load
    let map = new Map2d(map_name);
    let gameState = new GameState(map, null, new Placement(1,1,1), new Placement(1,1,1));
    var view = new View('screen', gameState, null);

    // Create and initialize model
    var model = new Model(algorithm_name, map_name);
    view.setGameState(model.getGameState());
    view.refresh();

    // Start controller, pass references to view and model
    var controller = new Controller();
    controller.setModel(model);
    controller.setView(view);

    // Add the callbacks to the html elements
    var step_button = document.getElementById("step_btn");
    step_button.onclick = function() {
        controller.step();
    }

}


main();
console.log("Launched main function, setup exits.");