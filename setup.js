
async function main() {
    /**
     * In here: Await loading the textures, load map, initialize model, view and controller.
     * Then finally attach the listeners to the html elements. The listeners call controller methods
     * (the controller is a singleton).
     */

    // Create view, wait for images to load
    var canvas = document.getElementById('view_canvas');
    let view = new View(canvas);
    await view.waitTexturesLoaded();
    



    // Create and initialize model

    // Start controller, pass references to view and model

    // Add the callbacks to the html elements


    // DOWN HERE, DEBUGGING
    let map = new Map2d('country_roads');
    view.drawMap(map);
    view.drawPlayer(4, 2, 1);
    view.drawPlayer(4, 3, 1);
    view.drawPlayer(4, 4, 1);
    
}


main();
console.log("Launched main function, setup exits.");