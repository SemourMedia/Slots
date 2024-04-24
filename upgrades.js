// upgrades.js

// Upgrade data
const upgrades = [
    {
        id: 'production_1',
        name: 'Production Upgrade 1',
        description: 'Increases resource production rate by 10%.',
        baseCost: 100,
        type: 'production',
        effect: 0.1, // 10% increase per purchase
        unlocked: false,
        repurchaseable: true,
        purchaseCount: 0 // Track number of purchases
    },
    {
        id: 'efficiency_1',
        name: 'Efficiency Upgrade 1',
        description: 'Reduces resource cost by 20%.',
        baseCost: 200,
        type: 'efficiency',
        effect: 0.2, // 20% reduction per purchase
        unlocked: false,
        repurchaseable: true,
        purchaseCount: 0 // Track number of purchases
    }
    // Add more upgrades as needed
];

// Function to render upgrades
// upgrades.js

// Function to render upgrades
function renderUpgrades() {
    const upgradeList = document.getElementById('upgradeList');
    if (upgradeList) {
        // Remember current scroll position to prevent scroll reset
        const scrollPosition = upgradeList.scrollTop;

        // Create a new document fragment to build the list without triggering reflow
        const fragment = document.createDocumentFragment();

        // Build the list items without triggering animation directly
        upgrades.forEach(upgrade => {
            const listItem = document.createElement('li');
            const cost = calculateUpgradeCost(upgrade);

            listItem.textContent = `${upgrade.name} - Cost: ${cost} resources (Owned: ${upgrade.purchaseCount})`;
            listItem.id = upgrade.id; // Set ID for targeting

            // Apply appropriate CSS class based on upgrade state
            if (!upgrade.unlocked) {
                if (resources >= cost) {
                    listItem.classList.add('affordable'); // Apply CSS class for affordable upgrades
                    listItem.addEventListener('click', () => {
                        purchaseUpgrade(upgrade);
                    });
                } else {
                    listItem.classList.add('locked'); // Apply CSS class for locked upgrades
                }
            } else {
                listItem.classList.add('unlocked');
            }

            fragment.appendChild(listItem); // Append to document fragment
        });

        // Clear existing list and append the new fragment with upgrades
        upgradeList.innerHTML = '';
        upgradeList.appendChild(fragment);

        // Restore scroll position after rebuilding the list
        upgradeList.scrollTop = scrollPosition;
    }
}




// Function to purchase and apply upgrades
function purchaseUpgrade(upgrade) {
    const cost = calculateUpgradeCost(upgrade);
    if (!upgrade.unlocked || upgrade.repurchaseable) {
        if (resources >= cost) {
            resources -= cost;
            upgrade.unlocked = true;
            upgrade.purchaseCount++; // Increment purchase count

            applyUpgradeEffect(upgrade); // Apply upgrade effect

            updateDisplay(); // Update resource display
            saveGame(); // Save the game state after purchasing upgrade
            renderUpgrades(); // Update the upgrade list

            // Visual feedback (e.g., highlight the purchased upgrade)
            const upgradedItem = document.getElementById(upgrade.id);
            if (upgradedItem) {
                upgradedItem.style.backgroundColor = '#d4edda'; // Light green background for purchased upgrade
                setTimeout(() => {
                    upgradedItem.style.backgroundColor = ''; // Reset background color after a short delay
                }, 1000);
            }
        }
    }
}


// Function to calculate upgrade cost based on base cost and purchase count
function calculateUpgradeCost(upgrade) {
    const baseCost = upgrade.baseCost;
    const costMultiplier = 1.2; // Cost increase rate (e.g., 20% increase per purchase)
    const purchaseCount = upgrade.purchaseCount;
    return Math.floor(baseCost * Math.pow(costMultiplier, purchaseCount));
}

// Function to apply upgrade effect
function applyUpgradeEffect(upgrade) {
    switch (upgrade.type) {
        case 'production':
            productionRate *= (1 + upgrade.effect);
            break;
        case 'efficiency':
            resourceCostMultiplier *= (1 - upgrade.effect);
            break;
        // Add more cases for different upgrade types
    }
}
