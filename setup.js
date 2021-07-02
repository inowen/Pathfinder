
function testStuff() {
    return new Promise((resolve, reject) => {
        resolve("");
    });
}

async function main() {
    await testStuff();
    console.log("Hello, world! This is the main function. From async-landia.");
}


main();




// Initialize the Controller singleton, map, view, etc.





// END:
// Set up listeners on html elements to call appropriate controller methods
