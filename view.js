
class View {
    constructor(parentDivId) {
        this.gameState = null;
        this.p5_object = null; // p5.js object (with setup and draw functions)

        this.car_skin = null; // textures/character.png
        this.boat_skin = null; // textures/character.png
        this.sm_skin = null; // textures/character.png
        this.snow = null; // textures/snow.png
        this.road = null; // textures/road.png
        this.floor = null; // textures/grass.png
        this.cliff = null; // textures/death.jpg
        this.water = null; // textures/water.jpg
        this.obstacle = null; // textures/brick.jpg
        this.car = null; // textures/garage.jpg
        this.boat = null; // textures/port.jpg
        this.snowmobile = null; // textures/snowmobile_garage.jpg

        var this_view = this;

        let myp5 = new p5( (p) => {
            p.preload = function () {
                // Load the textures
                this_view.car_skin = p.loadImage("textures/character.png");
                this_view.boat_skin = p.loadImage("textures/character.png");
                this_view.sm_skin = p.loadImage("textures/character.png");
                this_view.snow = p.loadImage("textures/snow.png");
                this_view.road = p.loadImage("textures/road.png");
                this_view.floor = p.loadImage("textures/grass.png");
                this_view.cliff = p.loadImage("textures/death.jpg");
                this_view.water = p.loadImage("textures/water.jpg");
                this_view.obstacle = p.loadImage("textures/brick.jpg");
                this_view.car = p.loadImage("textures/garage.jpg");
                this_view.boat = p.loadImage("textures/port.jpg");
                this_view.snowmobile = p.loadImage("textures/snowmobile_garage.jpg");

                this_view.p5_object = p;
            }

            p.setup = function() {
                // Change canvas size to parent div size somehow?
                let canvas = p.createCanvas(1500, 900);
                p.noLoop();
                // Debug: 
                this_view.printTextures();
            }

            p.draw = function() {
                this_view.drawGameState(this_view.gameState);
            }
        }, parentDivId);
    }


    drawGameState(gameState) {
        if (gameState != null) {
            this.drawMap(gameState.map);
            this.drawPath(gameState.plan);
            this.drawPlayer(gameState.x, gameState.y, gameState.orientation);
        }   
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

    }


    drawPath(actionsArray) {

    }

    drawGridLines(numRowsCols) {

    }

    paintParcel(x, y, texChar, numRowCols) {

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

    
}