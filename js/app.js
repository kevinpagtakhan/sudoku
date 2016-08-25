var $innerContainer = $(".inner-container");

var BOARD_SIZE = 9;

var $box = $(".box");
var $activeBox = null;
var $boxArray = [];
var $miniBoxArray = [];

updateBoxArray();

for (var i = 0; i < BOARD_SIZE; i++) {
    $boxArray[i] = [];
    for (var j = 0; j < BOARD_SIZE; j++) {
        $boxArray[i][j] = $box.eq(i * BOARD_SIZE + j);
    }
}

$box.on("click", function(){
    if($activeBox !== null){
        $activeBox.removeClass("active");
    }

    $activeBox = $(this);
    $(this).addClass("active");
});

for (var i = 0; i < $box.length; i++) {
    if($box.eq(i).text() !== ""){
        $box.eq(i).off();
        $box.eq(i).addClass("off");
    }
}

$(document).keypress(function(e){
    var input = e.keyCode;
    if(input >= 49 && input <= 57){
        if(isNumberCorrect(input)){
            $activeBox.text(input - 48);
            console.log("Correct!", input - 48);
        }
        else{
            console.log("Wrong!", input - 48);
        }

    } else if (e.keyCode == 32) {
        $activeBox.text("");
    }

    updateBoxArray(input);
});

function updateBoxArray(){
    var i = 0, j = 0;

    for (i = 0; i < BOARD_SIZE; i++) {
        $boxArray[i] = [];
        for (j = 0; j < BOARD_SIZE; j++) {
            $boxArray[i][j] = $box.eq(i * BOARD_SIZE + j);
        }
    }

    var miniRow = 0;
    var miniBox = 0;

    for (i = 0; i < BOARD_SIZE; i++) {
        $miniBoxArray[i] = [];
        for (j = 0; j < BOARD_SIZE; j++) {
            $miniBoxArray[i][j] = $boxArray[Math.floor(j / 3) + (Math.floor(miniBox / 3) * 3)][j % 3 + (miniBox * 3) % 9];
            miniRow++;
        }
        miniBox++;
    }
}

function isNumberCorrect(input){
    var eq = $box.index($activeBox);
    var x = Math.floor(eq / BOARD_SIZE);
    var y = eq % BOARD_SIZE;
    var modX = Math.floor(y / 3) + (Math.floor(x / 3) * 3)
    var modY = ((y % 3) + (x * 3)) % 9;

    //Check horizontal
    var horizontal = true;
    var vertical = true;
    var mini = true;
    for (var i = 0; i < BOARD_SIZE; i++) {
        if(i != y){
            if($boxArray[x][i].text() != input - 48){
                horizontal = horizontal && true;
            } else {
                horizontal = horizontal && false;
            }
        }
    }

    for (i = 0; i < BOARD_SIZE; i++) {
        if(i != x){
            if($boxArray[i][y].text() != input - 48){
                vertical = vertical && true;
                // console.log($boxArray[i][y].text(), "==", input - 48);
            } else {
                vertical = vertical && false;
            }
        }
    }

    for (i = 0; i < BOARD_SIZE; i++) {
        if(i != modY){
            if($miniBoxArray[modX][i].text() != input - 48){
                mini = mini && true;
                // console.log(i + ":", $miniBoxArray[modX][i].text(), "==", input - 48);
                // console.log(i);
            } else {
                mini = mini && false;
                // console.log(i);
            }
        }
        // console.log(modX, i, $miniBoxArray[modX][i].text(), $miniBoxArray[modX][i].text() != input - 48);
    }
    // console.log(modX, modY);
    return horizontal && vertical && mini;
}
