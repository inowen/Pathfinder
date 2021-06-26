// Stores a nxn char matrix that represents a map.
// Getters for size, get(x,y), isObstacle(x,y), isWalkable(x,y)
// Constructor takes name of a map. Then read(string) reads the map from the textfile.
// All maps have height=width

class Map2d {
    constructor(map_name) {
        this.map_name = map_name;
        this.read(map_name);
    }

    get name() {
        return this.map_name;
    }

    /**
     * The size of the array is NxN.
     * This method returns N.
     */
    get size () {
        return this.size;
    }


    read(map_name) {
        // Read file: Make an ajax request, wait for it. Then take the response and do whatever.
        map_name = map_name + ".txt";
        const request = new XMLHttpRequest();
        request.open('get', 'maps/'+map_name ,false);
        request.send();
        console.log("Read:");
        console.log(request.responseText);

        // Get dimensions. Set this.size

        // Create and populate matrix
    }
}