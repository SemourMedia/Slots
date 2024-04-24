// Game state
let resources = 0;
let productionRate = 1; // Initial production rate (resources per second)
let resourceCostMultiplier = 1; // Initial resource cost multiplier

// Upgrade data
const upgrades = [
    {
        id: 'production_1',
        name: 'Production Upgrade 1',
        description: 'Increases resource production rate by 10%.',
        cost: 100,
        type: 'production',
        effect: 0.1, // 10% increase
        unlocked: false
    },
    {
        id: 'efficiency_1',
        name: 'Efficiency Upgrade 1',
        description: 'Reduces resource cost by 20%.',
        cost: 200,
        type: 'efficiency',
        effect: 0.2, // 20% reduction
        unlocked: false
    }
    // Add more upgrades as needed
];

// Function to gather resources
function gatherResource() {
    resources += productionRate; // Increment resources by production rate
    updateDisplay(); // Update the display
    saveGame(); // Save the game state
}

// Function to update the display
function updateDisplay() {
    document.getElementById('resourceCount').textContent = resources.toFixed(2); // Show resources with two decimal places
    renderUpgrades(); // Update upgrade list
}

// Function to render upgrades
function renderUpgrades() {
    const upgradeList = document.getElementById('upgradeList');
    upgradeList.innerHTML = ''; // Clear existing list

    upgrades.forEach(upgrade => {
        const listItem = document.createElement('li');
        listItem.textContent = `${upgrade.name} - Cost: ${upgrade.cost} resources`;
        listItem.addEventListener('click', () => {
            purchaseUpgrade(upgrade);
        });

        if (!upgrade.unlocked) {
            listItem.classList.add('locked'); // Apply CSS class for locked upgrades
        }

        upgradeList.appendChild(listItem);
    });
}

// Function to purchase and apply upgrades
function purchaseUpgrade(upgrade) {
    if (resources >= upgrade.cost && !upgrade.unlocked) {
        resources -= upgrade.cost;
        upgrade.unlocked = true;

        // Apply upgrade effect based on upgrade type
        switch (upgrade.type) {
            case 'production':
                productionRate *= (1 + upgrade.effect);
                break;
            case 'efficiency':
                resourceCostMultiplier *= (1 - upgrade.effect);
                break;
            // Add more cases for different upgrade types
        }

        renderUpgrades(); // Update the upgrade list
        updateDisplay(); // Update resource display
    }
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
        resources = savedState.resources;
        productionRate = savedState.productionRate;
        resourceCostMultiplier = savedState.resourceCostMultiplier;
        updateDisplay(); // Update the display with loaded game state
    }
}

// Initial setup
loadGame(); // Load saved game state
updateDisplay(); // Update the display initially

// Automatically gather resources every second
setInterval(gatherResource, 1000); // Auto-gather resources every second
