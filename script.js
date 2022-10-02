const myGrid =  document.querySelector(".grid");
const startButton = document.querySelector("button");
const gridWidth = 50;
let myArray;   
  
// main function
function play() {

    myArray = create2DArray();

    // fill in the array with random values of 0 and 1
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            myArray[i][j] = Math.round(Math.random());
        }
    }

    // generate grid every 100 milliseconds
    setInterval(generateGrid, 100);
}


// click button to begin play
startButton.addEventListener("click", () => {
    play();
})

function generateGrid() {
    // empty the values
    myGrid.replaceChildren();

    // draw on the grid
    for (let i = 0; i < gridWidth; i++) { 
        for (let j = 0; j < gridWidth; j++) {
            const block = document.createElement("div");
            myGrid.appendChild(block);
                
            if (myArray[i][j]) {
                block.classList.remove("blank");
                block.classList.add("occupied");
            }
            else {
                block.classList.remove("occupied");
                block.classList.add("blank")
            }
        }
    }

    let newArray = create2DArray();

    // Compute newArray based on old array
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            
            // ignore edges
            if (i == 0 || i == gridWidth -1 || j == 0 || j == gridWidth -1) {
                newArray[i][j] = 0;
            }
            else {
                // count occupied neighbors 
                let sumNeighbors = 0;
                sumNeighbors += myArray[i][j - 1];
                sumNeighbors += myArray[i][j + 1];
                sumNeighbors += myArray[i - 1][j - 1];
                sumNeighbors += myArray[i - 1][j];
                sumNeighbors += myArray[i - 1][j + 1];
                sumNeighbors += myArray[i + 1][j - 1];
                sumNeighbors += myArray[i + 1][j];
                sumNeighbors += myArray[i + 1][j + 1];
    
                // apply rules
                if (myArray[i][j] == 0 && sumNeighbors == 3) {
                    newArray[i][j] = 1;
                    
                } else if (myArray[i][j] == 1 && (sumNeighbors < 2 || sumNeighbors > 3)) {
                    newArray[i][j] = 0;
                } else {
                    newArray[i][j] = myArray[i][j];
                }

            }
        }
    }
    
    // store the value before changing the new array value
    myArray = newArray;
}

function create2DArray() {
    let arr = new Array(gridWidth);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(gridWidth);
    }
    return arr;
}
