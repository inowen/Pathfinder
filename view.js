



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

        this.promises = new Array();
        this.promises.push(this.getLoadPromise(this.car_tex, "textures/"));
        this.promises.push(this.getLoadPromise(this.boat_tex, "textures/"));
        this.promises.push(this.getLoadPromise(this.sm_tex, "textures/"));
        this.promises.push(this.getLoadPromise(this.snow, "textures/"));
        this.promises.push(this.getLoadPromise(this.road, "textures/"));
        this.promises.push(this.getLoadPromise(this.floor, "textures/grass.png"));
        this.promises.push(this.getLoadPromise(this.cliff, "textures/"));
        this.promises.push(this.getLoadPromise(this.water, "textures/"));
        this.promises.push(this.getLoadPromise(this.obstacle, "textures/"));

    }

    /**
     * Wait until all the texture images are done loading.
     * To wait for the textures to load, await his function.
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
                resolve("Error");
            }
            img.src = src;
        });
    }

    // Debugging purposes
    printTextures() {
        console.log(this.car_tex);
        console.log(this.boat_tex);
        console.log(this.sm_tex);
        console.log(this.water);
        console.log(this.obstacle);
        console.log(this.cliff);
        console.log(this.road);
        console.log(this.snow);
        console.log(this.floor);
        // Remove this part later. Just testing
        console.log(".........");
        console.log(this.promises);
        console.log(this.promises[0]);
        setTimeout(() => {console.log("I waited");
            console.log(this.promises);
        }, 1000);
        
    }
    
}