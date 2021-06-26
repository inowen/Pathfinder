/*
 * Maps are squared, meaning their height is the same as their width.
 */
class Map2d {
    constructor(map_name) {
        this.map_name = map_name;
        this.matrix = new Array();
        this.size = 0;
        this.read(map_name);
    }

    get name() {
        return this.map_name;
    }

    /**
     * The size of the map is NxN.
     * This method returns N.
     */
    size () {
        return this.size;
    }

    matrix () {
        return new Array(this.matrix);
    }

    isWalkable(x, y) {

    }

    isObstacle(x, y) {

    }

    isVehicle(x, y) {

    }

    isInsideMap(x, y) {

    }

    get(x, y) {

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
        for (let i=0; i<lines.length; ++i) {
            this.matrix[i] = new Array();
            let chars = lines[i].split(' ');
            for (let c=0; c<chars.length; ++c) {
                this.matrix[i][c] = chars[c];
            }
        }
    }

}