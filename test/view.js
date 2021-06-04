
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
