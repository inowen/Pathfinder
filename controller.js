/**
 * A singleton, is initialized and accessed from setup.
 * Then linked into the html elements on the game page.
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


    // This is a singleton. The initialization is started from setup.js

    // The controller creates the model and the view.

    // The setup script attaches event listeners to the html buttons, and those callbacks 
    //      use the controller singleton.

}