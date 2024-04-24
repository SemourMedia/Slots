// game.js

// Game state
let resources = 0;
let productionRate = 1; // Initial production rate (resources per second)
let resourceCostMultiplier = 1; // Initial resource cost multiplier

// Function to gather resources
function gatherResource() {
    resources += productionRate; // Increment resources by production rate
    updateDisplay(); // Update the display
    saveGame(); // Save the game state
}

// Function to update the display
function updateDisplay() {
    const resourceCountElement = document.getElementById('resourceCount');
    if (resourceCountElement) {
        resourceCountElement.textContent = resources.toFixed(2);
    }
    renderUpgrades(); // Update the upgrade list
}

// Function to save game state
function saveGame() {
    localStorage.setItem('idleGameSave', JSON.stringify({ resources, productionRate, resourceCostMultiplier }));
}

// Function to load game state
function loadGame() {
    const savedData = localStorage.getItem('idleGameSave');
    if (savedData) {
        const savedState = JSON.parse(savedData);
        resources = savedState.resources || 0; // Set resources to saved value or default to 0
        productionRate = savedState.productionRate || 1; // Set production rate to saved value or default to 1
        resourceCostMultiplier = savedState.resourceCostMultiplier || 1; // Set resource cost multiplier to saved value or default to 1
        updateDisplay(); // Update the display with loaded game state
    } else {
        console.log('No saved game found.');
    }
}

// Initial setup
loadGame(); // Load saved game state
updateDisplay(); // Update the display initially

// Automatically gather resources every second
setInterval(gatherResource, 1000); // Auto-gather resources every second
