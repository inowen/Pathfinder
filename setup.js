// DEBUGGING 


// Test reading in a map (into a Map object)
map = new Map2d("country_roads");

alert(map.name);
console.log(map.matrix);
console.log(map.isWalkable(1,1));

var found = false;
for(var f=0; f<map.size && !found; ++f) {
    for (var c=0; c<map.size && !found; ++c) {
        if (map.isWalkable(f,c)) {
            found = true;
            console.log("Found walkable at " + f + "," + c + ".");
        }
    }
}

found = false;
for (var f = 0; f < map.size && !found; ++f) {
    for (var c = 0; c < map.size && !found; ++c) {
        if (map.isVehicle(f, c)) {
            found = true;
            console.log("Found vehicle at " + f + "," + c + ".");
        }
    }
}

found = false;
for (var f = 0; f < map.size && !found; ++f) {
    for (var c = 0; c < map.size && !found; ++c) {
        if (map.isObstacle(f, c)) {
            found = true;
            console.log("Found obstacle at " + f + "," + c + ".");
        }
    }
}


console.log("Should be false: " + map.isInsideMap(-1,0));
console.log("Should be true: " + map.isInsideMap(2, 2));




























// Initialize the Controller singleton, map, view, etc.






















// END:
// Set up listeners on html elements to call appropriate controller methods
