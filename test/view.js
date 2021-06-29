
canvas = document.getElementById("myCanvas");

window.onresize = function () {
    canvas = document.getElementById("myCanvas");
    canvas.height = window.innerHeight * .5;
    canvas.width = window.innerWidth * .5;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

console.log("The canvas: " + canvas);
context = canvas.getContext("2d");
context.fillStyle = "rgb(0,0,180)";
context.fillRect(0, 0, canvas.width, canvas.height);

// INFO: The image loads asynchronously. So wait until it is loaded before drawing it.
var img = new Image();
img.src = "hello-hi.jpg";
img.onload = function () {
    context.drawImage(img, 10, 10, 100, 100); // x,y,width,height. The image scales.
}

// Testing the drop-down thing
var button = document.getElementById("dropdown");
/*
button.onmousemove = function() {
    button.style.backgroundColor = "grey";
    button.style.padding = "30px";
}
*/

var action_button = document.getElementById("action_button");
action_button.onclick = function() {
    var sel = document.getElementById("sel");
    let value = sel.options[sel.selectedIndex].value;
    let text = sel.options[sel.selectedIndex].text;
    console.log(value, text);
}

var sub_link = document.getElementById("sub_link");
sub_link.onclick = function() {
    alert("Hello!");
}

// Apparently resolve and reject are callbacks provided by JavaScript. 
// We just say the executor has those two arguments, JS does the rest?
// Or is this related to the then/catch?

// Then and catch return Promise objects themselves, so they are "chainable".

// Promises have an internal state: pending, fulfilled, or rejected. 

// Call resolve(return_value) to change the state of the Promise to resolved and give it that value.
// Call reject(error) ... where I don't really know what type that error is supposed to be.

var v = new Promise((resolve, reject) => {
    console.log("I made it!");
    resolve(69);
});

v.then(response => {
    console.log("Response in then is: " + response);
})

// What the code above does: Asynchronously run the executor function, and store the promise 
// for what it's going to return in v. 
// After that, attach a callback to v, which (once the promise is resolved or rejected) takes
// the value returned by the executor and prints it out.
