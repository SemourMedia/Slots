// Game state
let resources = 0;

// Function to gather resources
function gatherResource() {
    resources += 1; // Increment resources by 1
    updateDisplay(); // Update the display
    saveGame(); // Save the game state
}

// Function to update the display
function updateDisplay() {
    document.getElementById('resourceCount').textContent = resources;
}

// Function to automate resource gathering
function automateGathering(interval) {
    setInterval(function() {
        resources += 1; // Increment resources automatically
        updateDisplay(); // Update the display
        saveGame(); // Save the game state
    }, interval);
}

// Function to save game state
function saveGame() {
    localStorage.setItem('idleGameSave', JSON.stringify(resources));
}

// Function to load game state
function loadGame() {
    const savedData = localStorage.getItem('idleGameSave');
    if (savedData) {
        resources = JSON.parse(savedData);
        updateDisplay(); // Update the display with loaded resources
    }
}

// Initial setup
loadGame(); // Load saved game state
updateDisplay(); // Update the display initially

// Automatically gather resources every second
automateGathering(1000); // Pass interval in milliseconds (e.g., 1000ms = 1 second)
