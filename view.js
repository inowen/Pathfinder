



// How to wait until these images load?
/*
    According to SO, this can be done using Promise. 
    A function that returns a promise. 
        The executor sets the onload callback, and inside that callback it uses resolve.
         (this way the promise is only resolved once the image loads).
    - Can I then await that from the main thread, or is that one not allowed to wait for stuff?
*/


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
    async waitImagesLoaded() {
        await this.car_tex;
        await this.boat_tex; // ... (make them into promises?)
    }
    
}