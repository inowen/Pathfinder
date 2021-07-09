
let y_pos = 0;
var attached = 0;

// I will draw a rectangle, and it will move down at each step (by 10px).

let myp5 = new p5((p) => {
    p.setup = function () {
        p.createCanvas(600, 600);
        p.background(100);
        p.noLoop();
        attached = p;
    }

    p.draw = function () {
        p.rect(10, y_pos, 100, 100);
        console.log("Drawing!");
    }

}, 'parentContainer');

let button = document.getElementById('button');
button.onclick = function() {
    y_pos += 10;
    if (attached) {
        attached.redraw();
    }
}

