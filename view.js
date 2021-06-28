



// How to wait until these images load?


class View {
    constructor() {
        // Do other constructor stuff... something like linking the canvas to the view?


        // Load the textures required to paint 
        // (start loading anyway, later when using them wait for the loading to be completed)
        this.car_tex = new Image();
        this.boat_tex = new Image();
        this.sm_tex = new Image();
        this.snow = new Image();
        this.road = new Image();
        this.floor = new Image();
        this.cliff = new Image();
        this.water = new Image();
        this.obstacle = new Image();
        car_tex.src = "textures/";
        boat_tex.src = "textures/";
        sm_tex.src = "textures/";
        snow.src = "textures/";
        road.src = "textures/";
        floor.src = "textures/";
        cliff.src = "textures/";
        water.src = "textures/";
        obstacle.src = "textures/";
    }

    /**
     * Blocks the thread until all the texture images are done loading.
     */
    waitImagesLoaded() {

    }
    
}