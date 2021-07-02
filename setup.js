// DEBUGGING 


// Test reading in a map (into a Map object)
map = new Map2d("country_roads");

async function testload(img, src) {
    return new Promise((resolve, reject) => {
        img.src = src;
        img.onload = () => {
            console.log("I am the onload event handler");
            resolve("");
        }
        console.log("Handler has been attached.");
    });
}


var img = new Image();
await testload(img, "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fpath&psig=AOvVaw2mtO2q1_NKT8I2xZQa73tc&ust=1625293812859000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCIDln7Thw_ECFQAAAAAdAAAAABAD");

























// Initialize the Controller singleton, map, view, etc.






















// END:
// Set up listeners on html elements to call appropriate controller methods
