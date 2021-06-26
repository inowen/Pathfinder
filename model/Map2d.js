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
    size () {
        return this.size;
    }


    read(map_name) {
        // Read file.
        map_name = map_name + ".txt";
        const request = new XMLHttpRequest();
        request.open('get', 'maps/'+map_name ,false);
        request.send();
        var map_str = request.responseText;
        var lines = map_str.split('\n');
        this.size = lines[0].split(' ')[0];
        lines.shift(); // Eliminate size header
        for (var l=0; l<lines.length; ++l) {
            lines[l] = lines[l].trim();
        }

        // Create and populate matrix
        this.matrix = new Array();
        for (let i=0; i<lines.length; ++i) {
            this.matrix[i] = new Array();
            let chars = lines[i].split(' ');
            for (let c=0; c<chars.length; ++c) {
                this.matrix[i][c] = chars[c];
            }
        }
        console.log(this.matrix);
        console.log("Saved size: " + this.size);
        console.log("Num. rows in the matrix: " + this.matrix.length);
        console.log("Num. cols in the first col: " + this.matrix[0].length);
    }
}