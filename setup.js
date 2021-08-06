
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

    // Setters for player and goal position
    var playerSetter = document.getElementById("btn_player_pos");
    playerSetter.onclick = function() {
        var x_input = document.getElementById("player_x_input");
        var y_input = document.getElementById("player_y_input");
        var x = x_input.value;
        var y = y_input.value;
        if (!isNaN(x) && !isNaN(y)) {
            var controller = new Controller();
            if (controller.initialized()) {
                controller.setPlayerPosition(new Placement(y,x,0));
            }
        }
    }

    var goalSetter = document.getElementById("btn_goal_pos");
    goalSetter.onclick = function() {
        var x_input = document.getElementById("goal_x_input");
        var y_input = document.getElementById("goal_y_input");
        var x = x_input.value;
        var y = y_input.value;
        if (!isNaN(x) && !isNaN(y)) {
            var controller = new Controller();
            if (controller.initialized()) {
                controller.setGoalPosition(new Placement(y,x,0));
            }
        }
    }

    // The run/stop button
    var looping = false;
    var runStopButton = document.getElementById('run_btn');
    runStopButton.onclick = function() {
        if (looping) {
            looping = false;
            runStopButton.textContent = "Run";
        }
        else {
            looping = true;
            runStopButton.textContent = "Stop";
            gameLoop();
        }
    }

    var gameLoop = function() {
        if (looping) {
            var controller = new Controller();
            controller.step();
            var speedInput = document.getElementById('speed_seekbar');
            var durationPercentage = 1 - (speedInput.value/100);
            var timeout = 1000 * durationPercentage;
            setTimeout(gameLoop, timeout);
        }
    }


}

// Test the priority queue
var comparator = function (a, b) {
    if (a == undefined || b == undefined) {
        return false;
    }
    return a.cost < b.cost;
}
let pq = new PriorityQueue(comparator);

pq.enqueue({cost:10});
pq.enqueue({cost:40});
pq.enqueue({cost:1});

console.log("Taking out:");
console.log(pq.pop());
console.log(pq.pop());
console.log(pq.pop());
console.log(pq.pop());

main();
console.log("Launched main function, setup exits.");