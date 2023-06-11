//Declare Globals
let penColor = "black";
//Add Function to set Pen Color
function setPenColor(color) {
    penColor = color;
    document.getElementById("penColor").style.color = color;
    switch (color) {
        case "Black":
            document.getElementById("penColor").style.backgroundColor = "White";
            break;
        case "White":
            document.getElementById("penColor").style.backgroundColor = "Black";
            break;
        default:
            break;
    }
    return;
}
//Add Listening Events for Color Changing Buttons
function addSettingsListeners() {
    const btnSettings = document.querySelectorAll('button');
        //console.log(btnSettings); <-- Use to view button attributes
    btnSettings.forEach((button) => {
        if(button.className == "btnColor"){
            button.addEventListener('click',() => {
                setPenColor(button.innerText);
            })
        }
    })
    return;
}
//remove px
function removePx(target){
    if(target.includes("px")) {
        let length = target.length;
        let result = target.slice(0,length-2);
        result = parseInt(result,10);
        return result;
    }
}
//Add LoadBoard Function (Removes all divs with "grid" class name and creates more based on the number in the input box)
function generateBoard() {
    //get board size
    let boardsize = document.getElementById('gridNum').value;
    console.log(`grid size: ${boardsize}`);
    //generate X amount of squares
    let sketchPad = document.getElementById("sketchPad");
    //get max width and height
    let maxWidth = removePx(window.getComputedStyle(sketchPad).getPropertyValue("width"));
    let maxHeight = removePx(window.getComputedStyle(sketchPad).getPropertyValue("height"))
    // create a square in an X by X range
    for (let x = 0; x < boardsize; x++){
        for (let i = 0; i < boardsize; i++) {
            //create square and apply settings
            let gridSquare = document.createElement("div");
            gridSquare.className = "gridSquare";
            //ensures each square will fit in the sketch pad perfectly regardless of screen size
            gridSquare.style.width = `${maxWidth/boardsize}px`;
            gridSquare.style.height = `${maxHeight/boardsize}px`;
            //when mouse moves over a square it will change the color to the current pen color.
            gridSquare.addEventListener('mouseover',() => {

                gridSquare.style.backgroundColor = penColor;
            })
            //add grid square to sketchpad
            sketchPad.appendChild(gridSquare);
        }
    }
}
//remove board
function clearBoard() {
    console.log('Clear Board Called');
    //Clear Board
    const gridSquares = document.querySelectorAll('div');
        //console.log(btnSettings); <-- Use to view button attributes
    gridSquares.forEach((gridSquare) => {
        if(gridSquare.className == "gridSquare"){
            gridSquare.remove();
        }
    })
    //Generate new board
    generateBoard();
}