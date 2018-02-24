// Initialize variables here

// Store the randomly generated gem values in an array for reference later
gemValues = [0,0,0,0];

// Store the randomly generated goal in an integer variable
goal = 0;

// Store the accumulation of clicked gems in this variable
// Unsurprisingly, this starts at 0
count = 0;

// Initialize wins and losses at 0.
wins = 0;
loss = 0;
// Bones of the game, generate elements, fetch elements, store elements.
// Fetch the goal element so we can alter it

var goalPanel = document.getElementById("goal-panel");

// Fetch the count element so we can alter it

var countPanel = document.getElementById("count-panel");

// Fetch the win and loss panels for later manipulation

var winPanel = document.getElementById("win-panel");
var lossPanel = document.getElementById("loss-panel");

// This function keeps the load order predictable
$(document).ready(function () {
    // These functions initialize my board
    initialWrite();
    console.log("This bit is actually running");

    // Watches my elements for clicks so I can pass them along
    // Each one listens to a different gem, and when clicked on passes along information to the count function
    // which will update the UI for the user.
    $("#gem1").click(function () {
        count = countUpdate(0,count,gemValues);
        check();
    });
    $("#gem2").click(function () {

        count = countUpdate(1,count,gemValues);
        check();
    }
    );
    $("#gem3").click(function () {

        count = countUpdate(2,count,gemValues);
        check();
    }
    );
    $("#gem4").click(function () {

        count = countUpdate(3,count,gemValues);
        check();
    }
    );









// randomly generate gem values between from 1-12

function gemGen() {
    for (var i = 0; i < gemValues.length; i++) {
        // Generate a random decimal, multiply it by 12, round down to the nearest whole number, and add 1.
        // Math.random * 12 rounded down will never give a 12, and may return a zero. Add one to eliminate zeros, add 12.
        // Viola, random int from 1-12
        gemValues[i] = (Math.floor(Math.random() * 12) + 1);
    }

    // For the sake of debugging, I'd like to see the hidden values in the console, just in case
    console.log(gemValues);
    return gemValues;
}

// randomly generate the goal from 19-120

function goalGen() {
    // As in the earlier generation, we multiple a variable by 102. It never reaches 102, and can return 0.
    // It's functionally 0-101 until we add 19, then it becomes 19-120
    goal = (Math.floor(Math.random() * 102) + 19);
    return goal;
}

// Our count starts at zero, and we have our goal generated, let's push it to the page for the user

function initialWrite() {
    goal = goalGen() // I was going to put these functions elsewhere, but since the only time they really need to be
    console.log("Generated the goal, it's "+goal);
    gemValues = gemGen()    // called is when the board is initialized, there's no real need to put them anywhere but here.
    console.log("Generated the gem array, it is "+gemValues);
    count = 0;
    countPanel.innerHTML = "Current count: 0";
    goalPanel.innerHTML = ("Goal: " + goal);
    winPanel.innerHTML = ("Wins: " + wins);
    lossPanel.innerHTML = ("Losses: " + loss);
    console.log("Called the intialize function");
}

// Accepting input, then processing it.
// We need a function to calculate the count
// I'll create the event listeners in the DOM because that's what I remember how to do, then we'll pass it here in a function
// In this function, we'll tally up the count
function countUpdate(clicked, count, array) {
    // From here, we'll process which gem was clicked
    count = array[clicked] + count;
    countPanel.innerHTML = count;
    // After scoring, run a check to see if the game is over
    console.log("Calling the count function, added " + array[clicked] + " to " + count)
    return count;
}

// Then something needs to check and see if there's a win condition met
function check() {
    if (count === goal) {
        win()   // The player met the goal, congratulations
    }
    else if (count > goal) {
        lose()  // The player's count has exceeded the goal, loss conditon
    }

}




// Handlers for wins and losses, this isn't too complex.
// Iterate upon the players wins or losses, and then reset the values for another go.
// No need to individually write or update any values, should all be handled by the above functions.
function win() {
    console.log("You've met the win condition")
    wins++
    goalGen()
    gemGen()
    initialWrite()
}

function lose() {
    console.log("You have met the loss condition")
    loss++
    goalGen()
    gemGen()
    initialWrite()

}

});