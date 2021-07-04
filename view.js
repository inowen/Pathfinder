



// How to wait until these images load?
/*
    According to SO, this can be done using Promise. 
    A function that returns a promise. 
        The executor sets the onload callback, and inside that callback it uses resolve.
         (this way the promise is only resolved once the image loads).
    - Can I then await that from the main thread, or is that one not allowed to wait for stuff?
*/


class View {
    constructor(canvas) {
        this.canvas = canvas;


        // Load the textures required to paint 
        // (start loading anyway, later when using them wait for the loading to be completed)
        this.car_skin = new Image();
        this.boat_skin = new Image();
        this.sm_skin = new Image();
        this.snow = new Image();
        this.road = new Image();
        this.floor = new Image();
        this.cliff = new Image();
        this.water = new Image();
        this.obstacle = new Image();
        this.car = new Image();
        this.boat = new Image();
        this.snowmobile = new Image();

        this.promises = new Array();
        this.promises.push(this.getLoadPromise(this.car_skin, "textures/character.png"));
        this.promises.push(this.getLoadPromise(this.boat_skin, "textures/character.png"));
        this.promises.push(this.getLoadPromise(this.sm_skin, "textures/character.png"));
        this.promises.push(this.getLoadPromise(this.snow, "textures/snow.png"));
        this.promises.push(this.getLoadPromise(this.road, "textures/road.png"));
        this.promises.push(this.getLoadPromise(this.floor, "textures/grass.png"));
        this.promises.push(this.getLoadPromise(this.cliff, "textures/death.jpg"));
        this.promises.push(this.getLoadPromise(this.water, "textures/water.jpg"));
        this.promises.push(this.getLoadPromise(this.obstacle, "textures/brick.jpg"));
        this.promises.push(this.getLoadPromise(this.car, "textures/garage.jpg"));
        this.promises.push(this.getLoadPromise(this.boat, "textures/port.jpg"));
        this.promises.push(this.getLoadPromise(this.snowmobile, "textures/snowmobile_garage.jpg"));
    }


















    /**
     * Wait until all the texture images are done loading.
     * To wait for the textures to load, await his function.
     * Might throw an exception if the promise is rejected.
     */
    async waitTexturesLoaded() {
        for(var i=0; i<this.promises.length; ++i) {
            await this.promises[i];
        }
    }
 
    
    // Get Promise that resolves as soon as the image loads the given source.
    getLoadPromise(img, src) {
        return new Promise((resolve, reject) => {
            img.onload = () => {
                resolve("DONE!");
            };
            img.onerror = () => {
                reject("Error");
            }
            img.src = src;
        });
    }

    // Debugging purposes
    printTextures() {
        console.log(this.car_skin);
        console.log(this.boat_skin);
        console.log(this.sm_skin);
        console.log(this.water);
        console.log(this.obstacle);
        console.log(this.cliff);
        console.log(this.road);
        console.log(this.snow);
        console.log(this.floor);
        console.log(this.car);
        console.log(this.boat);
        console.log(this.snowmobile);
    }

    printPromises() {
        console.log(this.promises);
    }

    testCanvas() {
        var ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
}