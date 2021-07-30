/**
 * View and Model have to be set to use the Controller.
 * Get an instance with new to use the controller.
 */
class Controller {
    constructor() {
        if (Controller.instance) {
            return Controller.instance;
        }
        Controller.instance = this;
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

    setPlayerPosition(placement) {
        this.model.setPlayerPosition(placement);
    }

    setGoalPosition(placement) {
        this.model.setGoalPosition(placement);
    }

}

