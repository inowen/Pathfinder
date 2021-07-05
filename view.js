



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


    drawGameState(gameState) {
        this.drawMap(gameState.map);
        this.drawPath(gameState.plan);
        this.drawPlayer(gameState.x, gameState.y, gameState.orientation);
    }


    drawMap(map2d) {
        this.drawGridLines(map2d.size);
        for (var f=0; f<map2d.size; ++f) {
            for (var c=0; c<map2d.size; ++c) {
                this.paintParcel(c, f, map2d.get(c, f), map2d.size);
            }
        }
    }

    // (x,y) are the grid coordinates of the parcel where the player is
    // numRowsCols is the size of the map (the number of rows, also the number of colums)
    drawPlayer(parcel_x, parcel_y, orientation, numRowsCols) {
        let distHorizontal = this.canvas.width / numRowsCols;
        let distVertical = this.canvas.height / numRowsCols;
        let x = parcel_x * distHorizontal;
        let y = parcel_y * distVertical;
        var ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "rgb(255,0,0)";
        // Draw and fill a triangle. Two points on the back edge, one in the center of the opposite side.
        ctx.beginPath();
        switch (orientation) {
            case 0: // Upwards: point bottom left, bottom right, middle up
                ctx.moveTo(x,y+distVertical);
                ctx.lineTo(x+distHorizontal, y+distVertical);
                ctx.lineTo(x+distHorizontal/2, y);
                break;
            case 1: // Right: point bottom left, top left, middle right
            ctx.moveTo(x,y);
            ctx.lineTo(x,y+distVertical);
            ctx.lineTo(x+distHorizontal, y+distVertical/2);
                break;
            case 2: // Downwards: point top left, top right, middle bottom
                ctx.moveTo(x,y);
                ctx.lineTo(x+distHorizontal,y);
                ctx.lineTo(x+distHorizontal/2, y+distVertical);
                break;
            case 3: // Left: point top right, bottom right, middle left
                ctx.moveTo(x+distHorizontal, y);
                ctx.lineTo(x+distHorizontal, y+distVertical);
                ctx.lineTo(x, y+distVertical/2);
                break;
        }
        ctx.closePath();
        ctx.stroke();
    }


    drawPath(actionsArray) {


    }

    drawGridLines(numRowsCols) {
        var distHorizontal = this.canvas.width / numRowsCols;
        var ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.lineWidth = 1;
        for (var i=0.5; i<this.canvas.width; i+=distHorizontal) {
            //ctx.fillRect(i, 0, 1, this.canvas.height);
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i,this.canvas.height);
            ctx.closePath();
            ctx.stroke();
        }
        var distVertical = this.canvas.height / numRowsCols;
        for (var i=0.5; i<this.canvas.height; i+=distVertical) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(this.canvas.width, i);
            ctx.closePath();
            ctx.stroke();
        }
    }

    paintParcel(x, y, texChar, numRowCols) {
        var parcelWidth = this.canvas.width / numRowCols;
        var parcelHeight = this.canvas.height / numRowCols;
        var ctx = this.canvas.getContext('2d');
        var texture = this.getTextureFromChar(texChar);
        ctx.drawImage(texture, x*parcelWidth+1, y*parcelHeight+1, parcelWidth-1, parcelHeight-1);
    }

    getTextureFromChar(texChar) {
        // snow, road, cliff, floor, water, obstacle, car, boat, snowmobile
        switch(texChar) {
            case 'c':
                return this.car;
            case 'b':
                return this.boat;
            case 's':
                return this.snowmobile;
            case 'S':
                return this.snow;
            case 'R':
                return this.road;
            case 'C':
                return this.cliff;
            case 'F':
                return this.floor;
            case 'W':
                return this.water;
            case 'O':
                return this.obstacle;
        }
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