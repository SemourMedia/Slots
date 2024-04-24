// Initialize startT variable, birth date, and direction (1 for increasing, -1 for default decrease)
let startT = 0;
let birthYear, birthMonth, birthDay;
let lastUpdateTime = Date.now();
let direction = -1; // Initial direction is set to decrease (-1)
let uGPS = 1;
let dGPS = 1;
let negEssence = 0;
let posEssence = 0;


function claimEssence(){
    let ess = startT/10;
    if(ess>0){
        posEssence += ess;
        posEssence = Math.round(posEssence); 
        uGPS = (posEssence/20) * 1+1;
        startT = 0;
    } else {
        negEssence += ess;
        negEssence = Math.round(negEssence);
        dGPS = ((negEssence/20)  *-1) +1;
        startT = 0;
    }
    document.getElementById("vertedEssence").innerHTML = posEssence;
    document.getElementById("invertedEssence").innerHTML = negEssence;
    return;
}

// Function to update the counter display
function updateCounter() {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastUpdateTime;


    // Calculate the gain per second based on direction and value of startT
    let gainPerSecond = uGPS;
    if (startT < 0) {
        gainPerSecond = dGPS; // Subtract 5 every second when startT is negative
    }

    const gain = gainPerSecond * direction * (deltaTime / 1000);

    // Update the counter (startT) by adding the gain
    startT += gain;

    // Check if startT has crossed zero to adjust direction and behavior
    if (startT >= 0 && direction === -1) {
        // If startT is zero or positive and the default direction is to decrease (-1), switch to increase (1)
        direction = 1; // Change direction to increase
        document.body.style.backgroundColor = 'white'; // Reset background color
        document.getElementById('counterDisplay').style.color = 'black'; // Reset text color
        document.getElementById('invertedEssence').style.color = 'black'; // Reset text color
        document.getElementById('vertedEssence').style.color = 'blue'; // Reset text color        
    } else if (startT < 0 && direction === 1) {
        // If startT is negative and the default direction is to increase (1), switch to decrease (-1)
        direction = -1; // Change direction to decrease
        document.body.style.backgroundColor = 'black'; // Change background color to black
        document.getElementById('counterDisplay').style.color = 'white'; // Change text color to white
        document.getElementById('invertedEssence').style.color = 'red'; // Change text color to white
        document.getElementById('vertedEssence').style.color = 'white'; // Change text color to white 
    }

    // Update the last update time to the current time
    lastUpdateTime = currentTime;

    // Update the counter display
    const counterElement = document.getElementById('counterDisplay');
    counterElement.textContent = Math.floor(startT).toLocaleString(); // Display large number with commas
}


// Function to handle the click event (increment or decrement startT based on current direction)
function handleCounterClick() {
    if (startT < 0) {
        // When startT is negative, clicking adds a positive value (10) to bring startT closer to 0
        startT += 2; // Increase startT by 10 but ensure it doesn't go above 0
    } else {
        // When startT is non-negative, clicking decrements startT by 1
        startT -= 2;
    }

    // Immediately update the counter display after click
    updateCounter();
}

updateCounter(); // Update the counter display initially
// Call updateCounter every second to continuously update the counter
setInterval(updateCounter, 1000); 
// Add event listener to the document for mousedown events (for rapid clicking)
document.addEventListener('mousedown', handleCounterClick);
// Call promptForBirthDate function initially to prompt user for birth date