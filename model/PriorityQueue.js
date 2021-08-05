
class PriorityQueue {
    constructor(comparator = function (a, b) { return a < b; }) {
        this.arr = [];
        this.numElements = 0;
        this.comparator = comparator;
    }

    enqueue(element) {
        this.numElements += 1;
        this.arr[this.numElements] = element;
        let currentIndex = this.numElements;
        let parentIndex = (currentIndex - (currentIndex % 2)) / 2;
        while (currentIndex != 1 && this.comparator(this.arr[currentIndex], this.arr[parentIndex])) {
            let temp = this.arr[currentIndex];
            this.arr[currentIndex] = this.arr[parentIndex];
            this.arr[parentIndex] = temp;
            currentIndex = parentIndex;
            parentIndex = (currentIndex - (currentIndex % 2)) / 2;
        }
    }

    pop() {
        let retMe = this.arr[1];
        if (retMe == undefined) {
            return undefined;
        }
        this.arr[1] = this.arr[this.numElements];
        this.arr[this.numElements] = undefined;
        this.numElements -= 1;

        
        let current = 1;
        let child1 = 2;
        let child2 = 3;
        while ( // While greater than one of the children
            this.comparator(this.arr[child1], this.arr[current]) ||
            this.comparator(this.arr[child2], this.arr[current])
        ) {
            if (this.arr[child2] < this.arr[child1]) {
                let temp = this.arr[child2];
                this.arr[child2] = this.arr[current];
                this.arr[current] = temp;
                current = child2;
            }
            else {
                let temp = this.arr[child1];
                this.arr[child1] = this.arr[current];
                this.arr[current] = temp;
                current = child1;
            }

            child1 = 2 * current;
            child2 = 2 * current + 1;
        }
        return retMe;
    }

    printContent() {
        console.log(this.arr);
        console.log("Current size: " + this.numElements);
    }
}


