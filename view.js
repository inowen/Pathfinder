
class View {
    constructor(parentDivId, initialGameState, mousepressCallback) {
        this.gameState = initialGameState;
        this.p5_object = null; // p5.js object (with setup and draw functions)
        this.canvas = null;

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
            };

            p.setup = function() {
                this_view.canvas = p.createCanvas(1500, 900);
                p.noLoop();
            };

            p.draw = function() {
                this_view.drawGameState(this_view.gameState);
            };

            // The event that it takes is a MouseEvent
            p.mousePressed = function(event) {
                if (mousepressCallback != null) {
                    mousepressCallback(event);
                }
            };
        }, parentDivId);
    }

    // ---------- PUBLIC ---------------------------------------------------------------
    setGameState(gameState) {
        this.gameState = gameState;
    }

    refresh() {
        if (this.p5_object != null) {
            this.p5_object.redraw();
        }
    }


    // ---------- PRIVATE ---------------------------------------------------------------

    drawGameState(gameState) {
        this.drawMap(gameState.map);
        if (gameState.plan != null) {
            this.drawPlan(gameState.plan, gameState.map.size);
        }
        this.drawPlayer(gameState.playerPlacement.col, gameState.playerPlacement.row, 
                            gameState.playerPlacement.orientation, gameState.map.size);
        this.drawGoal(gameState.goalPlacement, gameState.map.size);
    }

    drawGoal(goalPlacement, numRowCols) {
        // Goal = something like an aiming target thingy? Like where you shoot arrows, white and red circles.
        var p = this.p5_object;
        var block_width = this.canvas.width / numRowCols;
        var block_height = this.canvas.height / numRowCols;
        var real_x = goalPlacement.col * block_width;
        var real_y = goalPlacement.row * block_height;
        p.fill(255,255,255);
        p.circle(real_x + block_width/2, real_y + block_height/2, block_width/2);
        p.fill(255, 0, 0);
        p.circle(real_x + block_width/2, real_y + block_height/2, block_width/3);
        p.fill(255, 255, 255);
        p.circle(real_x + block_width/2, real_y + block_height/2, block_width/4);
        p.fill(255, 0, 0);
        p.circle(real_x + block_width/2, real_y + block_height/2, block_width/5);
    }


    drawMap(map2d) {
        for (var f=0; f<map2d.size; ++f) {
            for (var c=0; c<map2d.size; ++c) {
                this.paintParcel(c, f, map2d.get(f,c), map2d.size);
            }
        }
        this.drawGridLines(map2d.size);
    }

    // (x,y) are the grid coordinates of the parcel where the player is (transposed row,col)
    // numRowsCols is the size of the map (the number of rows, also the number of colums)
    drawPlayer(parcel_x, parcel_y, orientation, numRowsCols) {
        let p = this.p5_object;
        let block_width = this.canvas.width / numRowsCols;
        let block_height = this.canvas.height / numRowsCols;
        let real_x = parcel_x * block_width;
        let real_y = parcel_y * block_height;

        p.fill(180, 0, 0);
        var spaceSize = 4;

        if (orientation == 0) {
            p.triangle(real_x+block_width/2, real_y, // Upper middle
                       real_x, real_y+block_height - spaceSize, // Lower left
                       real_x + block_width, real_y+block_height - spaceSize // Lower right
            );
        }
        else if (orientation == 1) {
            p.triangle(real_x+block_width, real_y+block_height/2, // Right middle
                       real_x + spaceSize, real_y+block_height, // Lower left
                       real_x + spaceSize, real_y // Upper left
                );
        }
        else if (orientation == 2) {
            p.triangle(real_x+block_width/2, real_y+block_height, // Lower middle
                       real_x, real_y + spaceSize, // Upper left
                       real_x + block_width, real_y + spaceSize // Upper right

            );
        }
        else if (orientation == 3) {
            p.triangle(real_x, real_y+block_height/2, // Left middle
                       real_x + block_width - spaceSize, real_y, // Upper right
                       real_x + block_width - spaceSize, real_y+block_height // Lower right

            );
        }
        else {
            console.error("View#drawPlayer: Orientation not in [0,3]. Should never happen.");
        }
        
    }

    // A plan consists of an array of Placement(s).
    // Drawing a plan = drawing a series of points where the player would go through.
    // numRowCols: The number of rows/columns in the view (depends on the map)
    drawPlan(plan, numRowCols) {
        let block_width = this.canvas.width / numRowCols;
        let block_height = this.canvas.height / numRowCols;
        for (var i=0; i<plan.length; ++i) {
            var placement = plan[i];
            var p = this.p5_object;
            let x = placement.col * block_width + block_width/2;
            let y = placement.row * block_height + block_height/2;
            let diameter_inner = block_height/4;
            p.fill(255, 255, 255);
            p.circle(x, y, diameter_inner*2);
            p.fill(0, 0, 200);
            p.circle(x, y, diameter_inner);
        }
    }

    drawGridLines(numRowsCols) {
        let block_width = this.canvas.width / numRowsCols;
        let block_height = this.canvas.height / numRowsCols;
        var p = this.p5_object;
        for (var i=0; i<numRowsCols; ++i) {
            p.line(i*block_width, 0, i*block_width, this.canvas.height);
            p.line(0, i*block_height, this.canvas.width, i*block_height);
        }
    }

    paintParcel(x, y, texChar, numRowsCols) {
        let block_width = this.canvas.width / numRowsCols;
        let block_height = this.canvas.height / numRowsCols;
        var p = this.p5_object;
        var texture = this.getTextureFromChar(texChar);
        p.image(texture, x*block_width, y*block_height, block_width, block_height);
    }

    getTextureFromChar(texChar) {
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