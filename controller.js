/**
 * A singleton, is initialized and accessed from setup.
 * Then linked into the html elements on the game page.
 */


/**
 * View and Model have to be set to use the Controller.
 * Get an instance with new to use the controller.
 */
class Controller {
    // Use new to get the instance each time.
    constructor() {
        if (Controller.instance) {
            return Controller.instance;
        }
        Controller.instance = this;

        // Initialization
    }

    setView(view) {
        this.view = view;
    }

    setModel(model) {
        this.model = model;
    }

    // Advances the model one step.
    // Refreshes the view.
    step() {
        this.model.step();
        this.view.setGameState(this.model.getGameState());
        this.view.refresh();
    }


    // This is a singleton. The initialization is started from setup.js

    // The controller creates the model and the view.

    // The setup script attaches event listeners to the html buttons, and those callbacks 
    //      use the controller singleton.

}

