// Apply the saved theme on every page (the toggle itself lives on the settings page).
try {
    if (localStorage.getItem("foodlab-dark-mode") === "true") document.body.classList.add("dark-mode");
} catch (error) {}

const recipes = {
    "chicken-curry": {
        name: "Indian Chicken Curry",
        category: "Chicken",
        image: "ASSET/CURRY MASALA/food curry 5.webp",
        description: "Rich, comforting curry for your first cooking adventure.",
        time: 40,
        servings: 2,
        ingredients: [
            { name: "Boneless chicken", amount: 300, unit: "g", nutrition: { calories: 120, protein: 22.5, carbs: 0, fat: 2.6, fibre: 0 } },
            { name: "Onion", amount: 100, unit: "g", nutrition: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fibre: 1.7 } },
            { name: "Tomato", amount: 150, unit: "g", nutrition: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fibre: 1.2 } },
            { name: "Cooking oil", amount: 15, unit: "ml", nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, fibre: 0 } },
            { name: "Ginger-garlic paste", amount: 10, unit: "g", nutrition: { calories: 80, protein: 3, carbs: 17, fat: 0.5, fibre: 2 } },
            { name: "Curry powder", amount: 2, unit: "tsp", nutrition: { calories: 325, protein: 14, carbs: 56, fat: 14, fibre: 33 } },
            { name: "Salt", amount: 0.5, unit: "tsp" },
            { name: "Water", amount: 150, unit: "ml" }
        ],
        steps: [
            { title: "Heat the oil", instruction: "Place a pan over medium heat. Add the oil and warm it for 30–60 seconds until it shimmers slightly. Do not let it smoke.", minutes: 1, heat: "Medium" },
            { title: "Soften the onion", instruction: "Add the chopped onion. Cook for 4–5 minutes, stirring regularly, until softened and lightly golden.", minutes: 5, heat: "Medium" },
            { title: "Cook the aromatics", instruction: "Add ginger-garlic paste and curry powder. Stir continuously for 30–60 seconds until fragrant. Reduce the heat if the spices begin to burn.", minutes: 1, heat: "Low-medium" },
            { title: "Cook the tomatoes", instruction: "Add the chopped tomatoes. Cook for 4–6 minutes, stirring occasionally, until soft and pulpy.", minutes: 5, heat: "Medium" },
            { title: "Add the chicken", instruction: "Add the chicken pieces and stir to coat them with the masala. Cook for 3–4 minutes, turning the pieces so they cook evenly on the outside.", minutes: 4, heat: "Medium" },
            { title: "Simmer until cooked", instruction: "Add water and salt. Bring to a gentle boil, then cover and simmer for about 10–15 minutes, stirring occasionally. The thickest chicken pieces must reach 74°C internally.", minutes: 12, heat: "Low-medium" },
            { title: "Finish and serve", instruction: "Taste the gravy and adjust the salt if needed. Turn off the heat and let the curry rest for 2 minutes before serving.", minutes: 2, heat: "Off" }
        ]
    },

    "paneer-curry": {
        name: "Paneer Curry",
        category: "Vegetarian",
        image: "ASSET/PANEER/paneer 5.webp",
        description: "A creamy Indian dish made with paneer and spices.",
        time: 30,
        servings: 2,
        
ingredients: [
    { name: "Paneer", amount: 200, unit: "g", nutrition: { calories: 265, protein: 18, carbs: 3, fat: 20, fibre: 0 } },
    { name: "Onion", amount: 100, unit: "g", nutrition: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fibre: 1.7 } },
    { name: "Tomato", amount: 150, unit: "g", nutrition: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fibre: 1.2 } },
    { name: "Cooking oil", amount: 15, unit: "ml", nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, fibre: 0 } },
    { name: "Curry powder", amount: 1, unit: "tsp", nutrition: { calories: 325, protein: 14, carbs: 56, fat: 14, fibre: 33 } },
    { name: "Water", amount: 100, unit: "ml" }
],

      
        steps: [
            { title: "Heat the oil", instruction: "Warm the oil in a pan for about 1 minute until it shimmers slightly, without smoking.", minutes: 1, heat: "Medium" },
            { title: "Soften the onion", instruction: "Add chopped onion. Cook for 4–5 minutes, stirring regularly, until soft and lightly golden.", minutes: 5, heat: "Medium" },
            { title: "Cook the masala", instruction: "Add chopped tomatoes and curry powder. Cook for 5–7 minutes, stirring until the tomatoes soften and form a thick sauce.", minutes: 6, heat: "Medium" },
            { title: "Prepare the gravy", instruction: "Add water and stir well. Bring to a gentle simmer for 2–3 minutes so the flavours combine.", minutes: 3, heat: "Low-medium" },
            { title: "Add the paneer", instruction: "Add paneer cubes gently. Simmer for 3–5 minutes, stirring carefully to keep the cubes intact and heat them through.", minutes: 4, heat: "Low" },
            { title: "Finish and serve", instruction: "Taste the gravy, adjust seasoning if needed, and turn off the heat. Serve warm.", minutes: 1, heat: "Off" }
        ]
    },

    "omelette": {
        name: "Simple Egg Omelette",
        category: "Egg",
        image: "ASSET/omelette/omelette 4.webp",
        description: "A quick beginner-friendly meal with everyday ingredients.",
        time: 10,
        servings: 1,
        
ingredients: [
    { name: "Eggs", amount: 2, unit: "pieces", nutrition: { calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8, fibre: 0 } },
    { name: "Onion", amount: 30, unit: "g", nutrition: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fibre: 1.7 } },
    { name: "Cooking oil", amount: 5, unit: "ml", nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, fibre: 0 } },
    { name: "Salt", amount: 1, unit: "pinch" }
],

     
        steps: [
            { title: "Beat the eggs", instruction: "Crack the eggs into a bowl. Beat with a fork for 30–45 seconds until the yolks and whites are combined.", minutes: 1, heat: "Off" },
            { title: "Season the mixture", instruction: "Add the chopped onion and salt. Mix well so the onion is evenly distributed.", minutes: 1, heat: "Off" },
            { title: "Warm the pan", instruction: "Heat the oil in a non-stick pan for about 1 minute. Tilt the pan to spread the oil across the surface.", minutes: 1, heat: "Medium-low" },
            { title: "Cook the omelette", instruction: "Pour in the egg mixture. Cook for 2–3 minutes until the edges set. Fold or flip carefully, then cook for another 1–2 minutes until the eggs are fully set with no runny egg remaining.", minutes: 4, heat: "Low-medium" }
        ]
    },

    "fish-fry": {
        name: "Spiced Fish Fry",
        category: "Fish",
        image: "ASSET/fish/fish 4.webp",
        description: "Fish coated in spices and cooked until golden.",
        time: 25,
        servings: 2,
        
ingredients: [
    { name: "Fish fillets", amount: 300, unit: "g", nutrition: { calories: 90, protein: 20, carbs: 0, fat: 1.3, fibre: 0 } },
    { name: "Cooking oil", amount: 15, unit: "ml", nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, fibre: 0 } },
    { name: "Chilli powder", amount: 1, unit: "tsp", nutrition: { calories: 282, protein: 13.5, carbs: 49.7, fat: 14.3, fibre: 34.8 } },
    { name: "Lemon juice", amount: 1, unit: "tbsp", nutrition: { calories: 22, protein: 0.4, carbs: 6.9, fat: 0.2, fibre: 0.3 } },
    { name: "Salt", amount: 0.5, unit: "tsp" }
],

       
        steps: [
            { title: "Prepare the fish", instruction: "Pat the fish dry with paper towels. Dry surfaces help the spice coating stick and the fish brown more evenly.", minutes: 2, heat: "Off" },
            { title: "Mix the marinade", instruction: "Combine chilli powder, lemon juice and salt in a bowl. Stir until a thick, spreadable mixture forms.", minutes: 1, heat: "Off" },
            { title: "Coat the fish", instruction: "Rub the spice mixture over both sides of the fish. Refrigerate for about 10 minutes while the flavours develop.", minutes: 10, heat: "Off" },
            { title: "Heat the pan", instruction: "Warm the oil until hot but not smoking. Carefully place the fish in the pan, leaving space between pieces.", minutes: 2, heat: "Medium" },
            { title: "Fry until cooked", instruction: "Cook for approximately 3–5 minutes per side, depending on thickness. Turn gently when the first side is golden. The fish should reach 63°C internally and flake easily.", minutes: 8, heat: "Medium" }
        ]
    },

    "fried-rice": {
        name: "Vegetable Fried Rice",
        category: "Vegetarian",
        image: "ASSET/veg fried rice/veg 5.webp",
        description: "A colorful rice dish using vegetables and simple seasonings.",
        time: 20,
        servings: 2,
        
ingredients: [
    { name: "Cooked rice", amount: 300, unit: "g", nutrition: { calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fibre: 0.4 } },
    { name: "Mixed vegetables", amount: 150, unit: "g", nutrition: { calories: 65, protein: 3.1, carbs: 12, fat: 0.3, fibre: 4.2 } },
    { name: "Cooking oil", amount: 15, unit: "ml", nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, fibre: 0 } },
    { name: "Soy sauce", amount: 1, unit: "tbsp", nutrition: { calories: 53, protein: 8, carbs: 5.6, fat: 0.6, fibre: 0.8 } }
],

       
        steps: [
            { title: "Prepare the ingredients", instruction: "Wash and chop the vegetables into small, even pieces. Use cooked rice that has been cooled safely and refrigerated promptly if prepared earlier.", minutes: 3, heat: "Off" },
            { title: "Heat the pan", instruction: "Warm the oil in a wok or large pan until it shimmers. Keep the vegetables ready because the next step cooks quickly.", minutes: 1, heat: "Medium-high" },
            { title: "Stir-fry the vegetables", instruction: "Add the vegetables and stir frequently for 4–6 minutes until tender but slightly crisp. Reduce the heat if they begin to burn.", minutes: 5, heat: "Medium-high" },
            { title: "Add rice and soy sauce", instruction: "Add the cooked rice and soy sauce. Break up clumps and toss gently so the sauce coats the rice evenly.", minutes: 2, heat: "Medium-high" },
            { title: "Finish the rice", instruction: "Stir-fry for another 2–3 minutes until the rice is steaming hot throughout. Serve immediately.", minutes: 3, heat: "Medium-high" }
        ]
    },

    "grilled-chicken": {
        name: "Simple Grilled Chicken",
        category: "Chicken",
        image: "ASSET/grilled chicken/grilled 4.webp",
        description: "A protein-rich meal with a simple spice marinade.",
        time: 35,
        servings: 2,
        
ingredients: [
    { name: "Chicken", amount: 300, unit: "g", nutrition: { calories: 120, protein: 22.5, carbs: 0, fat: 2.6, fibre: 0 } },
    { name: "Olive oil", amount: 15, unit: "ml", nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, fibre: 0 } },
    { name: "Lemon juice", amount: 1, unit: "tbsp", nutrition: { calories: 22, protein: 0.4, carbs: 6.9, fat: 0.2, fibre: 0.3 } },
    { name: "Black pepper", amount: 1, unit: "tsp", nutrition: { calories: 251, protein: 10.4, carbs: 64, fat: 3.3, fibre: 25.3 } },
    { name: "Salt", amount: 0.5, unit: "tsp" }
],

        
        steps: [
            { title: "Mix the marinade", instruction: "Combine olive oil, lemon juice, black pepper and salt in a bowl. Stir until evenly mixed.", minutes: 1, heat: "Off" },
            { title: "Marinate the chicken", instruction: "Coat the chicken evenly. For more flavour, refrigerate for at least 15 minutes. Keep raw chicken and its utensils separate from ready-to-eat food.", minutes: 15, heat: "Off" },
            { title: "Preheat the oven or grill", instruction: "Preheat the oven to 200°C, or prepare your grill according to its instructions. Lightly oil the cooking surface if appropriate.", minutes: 5, heat: "200°C oven or medium grill" },
            { title: "Cook the chicken", instruction: "Arrange the chicken in a single layer and turn as needed. Cooking time depends on thickness and equipment; verify 74°C internally in the thickest part.", minutes: 15, heat: "Medium or 200°C oven" },
            { title: "Rest and serve", instruction: "Transfer the chicken to a clean plate and rest for 3–5 minutes. Never reuse a plate or utensils that held raw chicken without washing them.", minutes: 4, heat: "Off" }
        ]
    }
};

const procedureImages = {
    "chicken-curry": [
        "ASSET/CURRY MASALA/food curry 1.webp",
        "ASSET/CURRY MASALA/food curry 3.webp",
        "ASSET/CURRY MASALA/food curry 2.webp",
        "ASSET/CURRY MASALA/food curry 4.webp",
        "ASSET/CURRY MASALA/food curry 5.webp",
        "ASSET/CURRY MASALA/food curry 6.webp",
        "ASSET/CURRY MASALA/food curry 7.webp"
    ],
    "fish-fry": [
        "ASSET/fish/fish 1.webp",
        "ASSET/fish/fish 2.webp",
        "ASSET/fish/fish 3.webp",
        "ASSET/fish/fish 4.webp"
    ],
    "grilled-chicken": [
        "ASSET/grilled chicken/grilled 1.webp",
        "ASSET/grilled chicken/grilled 2.webp",
        "ASSET/grilled chicken/grilled 3.webp",
        "ASSET/grilled chicken/grilled 4.webp"
    ],
    "omelette": [
        "ASSET/omelette/omelette 1.webp",
        "ASSET/omelette/omelette 2.webp",
        "ASSET/omelette/omelette 3.webp",
        "ASSET/omelette/omelette 4.webp"
    ],
    "paneer-curry": [
        "ASSET/PANEER/paneer 1.webp",
        "ASSET/PANEER/paneer 2.webp",
        "ASSET/PANEER/paneer 3.webp",
        "ASSET/PANEER/paneer 4.webp",
        "ASSET/PANEER/paneer 5.webp"
    ],
    "fried-rice": [
        "ASSET/veg fried rice/veg 1.webp",
        "ASSET/veg fried rice/veg 2.webp",
        "ASSET/veg fried rice/veg 3.webp",
        "ASSET/veg fried rice/veg 4.webp",
        "ASSET/veg fried rice/veg 5.webp"
    ]
};

const recipeGrid = document.getElementById("recipe-grid");
const recipeDetail = document.getElementById("recipe-detail");
const recipeContent = document.getElementById("recipe-content");
const searchInput = document.getElementById("search-input");
const recipeCount = document.getElementById("recipe-count");
const emptyMessage = document.getElementById("empty-message");

function formatAmount(amount) {
    return Number.isInteger(amount)
        ? String(amount)
        : String(Number(amount.toFixed(2)));
}

function formatTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}


function calculateNutrition(ingredients) {
    const totals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fibre: 0
    };

    let hasNutritionData = false;

    ingredients.forEach(function (ingredient) {
        if (!ingredient.nutrition) return;

        hasNutritionData = true;

        let quantity = Number(ingredient.amount) || 0;
        const unit = (ingredient.unit || "").toLowerCase();

        // Egg nutrition is stored per egg, not per 100 g.
        if (unit === "pieces") {
            // Keep the quantity as a number of eggs.
        } else {
            // Other nutrition values are per 100 g.
            if (unit === "ml") quantity *= 0.92;
            if (unit === "tsp") quantity *= 5;
            if (unit === "tbsp") quantity *= 15;

            quantity /= 100;
        }

        Object.keys(totals).forEach(function (key) {
            totals[key] +=
                (Number(ingredient.nutrition[key]) || 0) * quantity;
        });
    });

    return { ...totals, hasNutritionData };
}


function renderRecipes() {
    if (!searchInput || !recipeGrid || !recipeCount || !emptyMessage) return;

    const searchTerm = searchInput.value.trim().toLowerCase();
    const activeCategory =
        document.querySelector(".category.active")?.dataset.category || "All";
    const maxTime = document.getElementById("max-time")?.value || "all";
    const difficulty = document.getElementById("difficulty-filter")?.value || "all";
    const sortOrder = document.getElementById("sort-recipes")?.value || "default";
    const cards = Array.from(recipeGrid.querySelectorAll(".recipe-card"));
    let preferredCuisine = "all";
    try { preferredCuisine = localStorage.getItem("foodlab-cuisine") || "all"; } catch (error) {}
    // Remember the original card order so "Default order" always restores it.
    cards.forEach((card, position) => {
        if (card.dataset.order === undefined) card.dataset.order = String(position);
    });
    cards.forEach(card => card.classList.toggle(
        "preferred-cuisine",
        preferredCuisine !== "all" && card.dataset.cuisine === preferredCuisine
    ));

    cards.forEach(function (card) {
        const recipeId = card.querySelector(".recipe-button")?.dataset.recipe;
        const recipe = recipes[recipeId];

        if (!recipe) {
            card.hidden = true;
            return;
        }

        const ingredientNames = recipe.ingredients.map(item => item.name).join(" ");
        const searchableText =
            `${recipe.name} ${recipe.description} ${recipe.category} ${ingredientNames}`.toLowerCase();

        const time = Number(card.dataset.time || recipe.time);
        const cardDifficulty = card.dataset.difficulty || "Easy";

        const matchesSearch = searchableText.includes(searchTerm);
        const matchesCategory =
            activeCategory === "All" || recipe.category === activeCategory;
        const matchesTime =
            maxTime === "all" ||
            (Number.isFinite(time) && time > 0 && time <= Number(maxTime));
        const matchesDifficulty =
            difficulty === "all" || cardDifficulty === difficulty;

        card.hidden = !(
            matchesSearch && matchesCategory && matchesTime && matchesDifficulty
        );
    });

    
    const visibleCards = cards.filter(card => !card.hidden);


    visibleCards.sort(function (a, b) {
        const recipeA = recipes[a.querySelector(".recipe-button")?.dataset.recipe];
        const recipeB = recipes[b.querySelector(".recipe-button")?.dataset.recipe];
        const timeA = Number(a.dataset.time || recipeA.time) || Infinity;
        const timeB = Number(b.dataset.time || recipeB.time) || Infinity;

        if (sortOrder === "name-asc") {
            return recipeA.name.localeCompare(recipeB.name);
        }

        if (sortOrder === "default" && preferredCuisine !== "all") {
            const aPref = a.dataset.cuisine === preferredCuisine ? 0 : 1;
            const bPref = b.dataset.cuisine === preferredCuisine ? 0 : 1;
            if (aPref !== bPref) return aPref - bPref;
        }

        if (sortOrder === "time-asc") return timeA - timeB;
        if (sortOrder === "time-desc") return timeB - timeA;

        return Number(a.dataset.order) - Number(b.dataset.order);
    });

    visibleCards.forEach(card => recipeGrid.appendChild(card));

    recipeCount.textContent =
        `${visibleCards.length} recipe${visibleCards.length === 1 ? "" : "s"}`;

    emptyMessage.hidden = visibleCards.length !== 0;
}

function openRecipe(recipeId) {
    const recipe = recipes[recipeId];

    if (!recipe) {
        console.error("Recipe not found:", recipeId);
        return;
    }

    if (window.foodLabTimers) {
        window.foodLabTimers.forEach(timer => {
            if (timer.interval) clearInterval(timer.interval);
        });
    }

    window.foodLabTimers = new Map();

    const ingredientsHTML = recipe.ingredients.map(function (ingredient, index) {
        return `
            <li>
                <label>
                    <input type="checkbox" class="ingredient-check">
                    <span>
                        <strong class="ingredient-amount" data-index="${index}">
                            ${formatAmount(ingredient.amount)}
                        </strong>
                        ${ingredient.unit} ${ingredient.name}
                    </span>
                </label>
            </li>
        `;
    }).join("");

    const images = procedureImages[recipeId] || [];

    const stepsHTML = recipe.steps.map(function (step, index) {
        const photo = images[index] || recipe.image;
        const timerId = `foodlab-timer-${index}`;
        const seconds = step.minutes * 60;

        return `
            <article class="visual-step-card">
                <img
                    class="visual-step-image"
                    src="${photo}"
                    alt="${step.title}"
                    loading="lazy"
                >

                <div class="visual-step-content">
                    <span class="visual-step-number">
                        STEP ${index + 1} OF ${recipe.steps.length}
                    </span>

                    <h3>${step.title}</h3>
                    <p>${step.instruction}</p>
                    <p><strong>Heat level:</strong> ${step.heat}</p>

                    <div class="step-timer">
                        <p><strong>Estimated time:</strong>
                            ${step.minutes} minute${step.minutes === 1 ? "" : "s"}
                        </p>

                        <p class="timer-display" id="${timerId}">
                            ${formatTimer(seconds)}
                        </p>

                        <div class="timer-controls">
                            <button type="button" class="timer-start"
                                data-timer-id="${timerId}"
                                data-seconds="${seconds}">Start</button>

                            <button type="button" class="timer-pause"
                                data-timer-id="${timerId}" disabled>Pause</button>

                            <button type="button" class="timer-reset"
                                data-timer-id="${timerId}"
                                data-seconds="${seconds}">Reset</button>
                        </div>

                        <p class="timer-status"
                            id="${timerId}-status" aria-live="polite"></p>
                    </div>

                    <label class="visual-step-check">
                        <input type="checkbox" class="cooking-step-check">
                        <span>I've completed this step</span>
                    </label>
                </div>
            </article>
        `;
    }).join("");

    recipeContent.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <p class="food-label">${recipe.category.toUpperCase()}</p>
        <h1>${recipe.name}</h1>
        <p>${recipe.description}</p>

        <div class="agentcity-send-panel">
            <button type="button" id="send-to-agentcity" class="agentcity-send-button">
                🏙️ Send cooking task to AgentCity
            </button>
            <p id="agentcity-send-status" class="agentcity-send-status" aria-live="polite">
                Send this recipe to the AgentCity restaurant team.
            </p>
        </div>

        <p>⏱️ ${recipe.time} minutes total (${recipe.steps.reduce((s, x) => s + x.minutes, 0)} min of timed steps, the rest is prep) · Makes
            <span id="serving-display">${recipe.servings}</span> servings
        </p>

        <h2>Nutrition estimate per serving</h2>
        <div class="nutrition" id="nutrition-display"></div>
        <p>Nutrition values are estimates based on available ingredient data.</p>

        <label for="servings"><strong>Adjust servings:</strong></label>
        <select id="servings">
            ${[1, 2, 3, 4, 5, 6, 8].map(function (n) {
                return `<option value="${n}" ${n === recipe.servings ? "selected" : ""}>
                    ${n} serving${n === 1 ? "" : "s"}
                </option>`;
            }).join("")}
        </select>

        <h2>Ingredients</h2>
        <p>Tick each ingredient as you prepare it.</p>
        <ul id="ingredient-list">${ingredientsHTML}</ul>

        <div id="cooking-lock-message" class="cooking-lock-message">
            🔒 Tick every ingredient above to unlock cooking instructions.
        </div>

        <div id="cooking-instructions" hidden>
            <h2>Cooking instructions</h2>
            <p>Follow each step, use the timers as reminders, and tick steps when finished.</p>

            ${stepsHTML}

            <div class="food-ready-container">
                <p id="cooking-progress">0 of ${recipe.steps.length} steps completed</p>
                <button id="food-ready-button" type="button" disabled>
                    🍽️ Food Is Ready!
                </button>
                <p id="food-ready-message" hidden>
                    🎉 Great job! You've completed every cooking step. Enjoy your meal!
                </p>
            </div>
        </div>
    `;

    // Send real recipe data from FoodLab to AgentCity using shared localStorage.
    const sendToAgentCityButton = document.getElementById("send-to-agentcity");
    const sendToAgentCityStatus = document.getElementById("agentcity-send-status");

    sendToAgentCityButton.addEventListener("click", function () {
        const order = {
            id: `foodlab-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
            recipeId: recipeId,
            recipeName: recipe.name,
            cookingTime: recipe.time,
            servings: Number(document.getElementById("servings").value),
            ingredients: recipe.ingredients.map(function (ingredient) {
                return `${formatAmount(ingredient.amount)} ${ingredient.unit} ${ingredient.name}`;
            }),
            status: "New",
            sentAt: new Date().toISOString()
        };

        try {
            const savedOrders = JSON.parse(localStorage.getItem("agentcity-foodlab-orders") || "[]");
            savedOrders.push(order);
            const recentDone = savedOrders.filter(o => o.status === "Done").slice(-10);
            const kept = savedOrders.filter(o => o.status !== "Done" || recentDone.includes(o));
            localStorage.setItem("agentcity-foodlab-orders", JSON.stringify(kept));
            window.foodLabLastOrderId = order.id;

            sendToAgentCityStatus.textContent =
                `✅ ${recipe.name} was sent to AgentCity. The restaurant chef can now receive this task.`;

            sendToAgentCityButton.textContent = "✅ Sent — change servings to send again";
            sendToAgentCityButton.disabled = true;

            // Open AgentCity in one named tab; sending again reuses that tab instead of opening a new one.
            window.open("../AgentCity/index.html", "agentcity-tab");
        } catch (error) {
            console.error("Could not send recipe to AgentCity:", error);
            sendToAgentCityStatus.textContent =
                "Could not send the task. Please make sure both projects are opened from the AgentCity-FoodLab-Integration folder using Live Server.";
        }
    });

    function updateRecipe(servings) {
        const multiplier = servings / recipe.servings;

        document.getElementById("serving-display").textContent = servings;

        document.querySelectorAll(".ingredient-amount").forEach(function (item) {
            const index = Number(item.dataset.index);

            item.textContent = formatAmount(
                recipe.ingredients[index].amount * multiplier
            );
        });

        const nutrition = calculateNutrition(
            recipe.ingredients.map(function (ingredient) {
                return {
                    ...ingredient,
                    amount: ingredient.amount * multiplier
                };
            })
        );

        const display = document.getElementById("nutrition-display");

        if (!nutrition.hasNutritionData) {
            display.innerHTML =
                "<span>Nutrition data has not been added for this recipe yet.</span>";
            return;
        }

        const perServing = {
            calories: nutrition.calories / servings,
            protein: nutrition.protein / servings,
            carbs: nutrition.carbs / servings,
            fat: nutrition.fat / servings,
            fibre: nutrition.fibre / servings
        };

        display.innerHTML = `
            <span>🔥 ${Math.round(perServing.calories)} kcal</span>
            <span>💪 ${perServing.protein.toFixed(1)}g protein</span>
            <span>🍚 ${perServing.carbs.toFixed(1)}g carbs</span>
            <span>🥑 ${perServing.fat.toFixed(1)}g fat</span>
            <span>🌾 ${perServing.fibre.toFixed(1)}g fibre</span>
        `;
    }

    document.getElementById("servings").addEventListener("change", function () {
        if (sendToAgentCityButton.disabled) {
            sendToAgentCityButton.disabled = false;
            sendToAgentCityButton.textContent = "🏙️ Send updated order to AgentCity";
        }
        updateRecipe(Number(this.value));
    });

    // Ingredient lock: cooking instructions remain hidden until all ingredients are checked.
    const ingredientCheckboxes = recipeContent.querySelectorAll(".ingredient-check");
    const cookingInstructions = document.getElementById("cooking-instructions");
    const cookingLockMessage = document.getElementById("cooking-lock-message");

    function updateIngredientUnlock() {
        const allIngredientsChecked =
            ingredientCheckboxes.length > 0 &&
            Array.from(ingredientCheckboxes).every(checkbox => checkbox.checked);

        cookingInstructions.hidden = !allIngredientsChecked;
        cookingLockMessage.hidden = allIngredientsChecked;
    }

    ingredientCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updateIngredientUnlock);
    });

    updateIngredientUnlock();

    const timers = window.foodLabTimers;

    function stopTimer(timerId) {
        const timer = timers.get(timerId);

        if (timer && timer.interval) {
            clearInterval(timer.interval);
            timer.interval = null;
        }
    }

    function updateTimerButtons(timerId, running) {
        const startButton = recipeContent.querySelector(
            `.timer-start[data-timer-id="${timerId}"]`
        );

        const pauseButton = recipeContent.querySelector(
            `.timer-pause[data-timer-id="${timerId}"]`
        );

        if (!startButton || !pauseButton) return;

        startButton.disabled = running;
        pauseButton.disabled = !running;
        pauseButton.textContent = "Pause";
    }

    function startTimer(timerId) {
        const timer = timers.get(timerId);

        if (!timer || timer.interval || timer.remaining <= 0) return;

        const status = document.getElementById(`${timerId}-status`);
        const startButton = recipeContent.querySelector(
            `.timer-start[data-timer-id="${timerId}"]`
        );

        status.textContent = "Timer running…";
        updateTimerButtons(timerId, true);

        timer.interval = setInterval(function () {
            timer.remaining -= 1;

            const display = document.getElementById(timerId);

            if (display) {
                display.textContent = formatTimer(Math.max(0, timer.remaining));
            }

            if (timer.remaining <= 0) {
                stopTimer(timerId);
                updateTimerButtons(timerId, false);

                if (startButton) {
                    startButton.textContent = "Finished";
                    startButton.disabled = true;
                }

                status.textContent = "⏰ Time is up! Check your food.";
            }
        }, 1000);
    }

    recipe.steps.forEach(function (step, index) {
        const timerId = `foodlab-timer-${index}`;
        const seconds = step.minutes * 60;

        timers.set(timerId, {
            remaining: seconds,
            interval: null,
            originalSeconds: seconds
        });

        const startButton = recipeContent.querySelector(
            `.timer-start[data-timer-id="${timerId}"]`
        );

        const pauseButton = recipeContent.querySelector(
            `.timer-pause[data-timer-id="${timerId}"]`
        );

        const resetButton = recipeContent.querySelector(
            `.timer-reset[data-timer-id="${timerId}"]`
        );

        startButton.addEventListener("click", function () {
            startTimer(timerId);
        });

        pauseButton.addEventListener("click", function () {
            const timer = timers.get(timerId);

            if (!timer) return;

            stopTimer(timerId);
            updateTimerButtons(timerId, false);

            document.getElementById(`${timerId}-status`).textContent =
                "Timer paused. Select Resume to continue.";

            startButton.textContent = "Resume";
        });

        resetButton.addEventListener("click", function () {
            stopTimer(timerId);

            const timer = timers.get(timerId);
            timer.remaining = timer.originalSeconds;

            document.getElementById(timerId).textContent =
                formatTimer(timer.originalSeconds);

            document.getElementById(`${timerId}-status`).textContent = "";

            startButton.textContent = "Start";
            startButton.disabled = false;

            updateTimerButtons(timerId, false);
        });
    });

    const stepCheckboxes = recipeContent.querySelectorAll(".cooking-step-check");
    const foodReadyButton = document.getElementById("food-ready-button");
    const cookingProgress = document.getElementById("cooking-progress");
    const foodReadyMessage = document.getElementById("food-ready-message");

    function updateCookingProgress() {
        const completed = recipeContent.querySelectorAll(
            ".cooking-step-check:checked"
        ).length;

        cookingProgress.textContent =
            `${completed} of ${stepCheckboxes.length} steps completed`;

        foodReadyButton.disabled = completed !== stepCheckboxes.length;

        if (completed !== stepCheckboxes.length) {
            foodReadyMessage.hidden = true;
        }
    }

    stepCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updateCookingProgress);
    });

    foodReadyButton.addEventListener("click", function () {
        const completed = recipeContent.querySelectorAll(
            ".cooking-step-check:checked"
        ).length;

        if (completed !== stepCheckboxes.length) return;

        foodReadyMessage.hidden = false;
        markLastOrderDone();
        foodReadyMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });

    updateCookingProgress();
    updateRecipe(recipe.servings);

    document.querySelectorAll(".recipes-section").forEach(section => section.hidden = true);
    recipeDetail.hidden = false;
    recipeDetail.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("click", function (event) {
    const recipeButton = event.target.closest(".recipe-button");

    if (recipeButton) {
        openRecipe(recipeButton.dataset.recipe);
        return;
    }

    const categoryButton = event.target.closest(".category");

    if (categoryButton) {
        document.querySelectorAll(".category").forEach(function (button) {
            button.classList.remove("active");
        });

        categoryButton.classList.add("active");
        renderRecipes();
    }
});

document.getElementById("back-button").addEventListener("click", function () {
    if (window.foodLabTimers) {
        window.foodLabTimers.forEach(function (timer) {
            if (timer.interval) clearInterval(timer.interval);
        });

        window.foodLabTimers.clear();
    }

    recipeDetail.hidden = true;
    document.querySelectorAll(".recipes-section").forEach(section => section.hidden = false);

    document.querySelector(".recipes-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    renderRecipes();

    document.querySelector(".recipes-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

searchInput.addEventListener("input", renderRecipes);

const maxTimeFilter = document.getElementById("max-time");
const difficultyFilter = document.getElementById("difficulty-filter");
const sortRecipes = document.getElementById("sort-recipes");
const resetFiltersButton = document.getElementById("reset-filters");

if (maxTimeFilter) maxTimeFilter.addEventListener("change", renderRecipes);
if (difficultyFilter) difficultyFilter.addEventListener("change", renderRecipes);
if (sortRecipes) sortRecipes.addEventListener("change", renderRecipes);

if (resetFiltersButton) {
    resetFiltersButton.addEventListener("click", function () {
        searchInput.value = "";

        if (maxTimeFilter) maxTimeFilter.value = "all";
        if (difficultyFilter) difficultyFilter.value = "all";
        if (sortRecipes) sortRecipes.value = "default";

        document.querySelectorAll(".category").forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.category === "All"
            );
        });

        renderRecipes();
    });
}

// Card name and time come from the recipes object, so they cannot drift apart.
recipeGrid.querySelectorAll(".recipe-card").forEach(function (card) {
    const recipe = recipes[card.querySelector(".recipe-button")?.dataset.recipe];
    if (!recipe) return;
    card.dataset.time = recipe.time;
    card.querySelector("h3").textContent = recipe.name;
    card.querySelector(".recipe-meta").textContent = `${recipe.time} min · ${card.dataset.difficulty}`;
});

renderRecipes();

/* FoodLab favorites */
const FAVORITES_KEY = "foodlab-favorites";

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch (error) {
        return [];
    }
}



function updateFavoriteButtons() {
    const favorites = getFavorites();

    document.querySelectorAll(".favorite-button").forEach(function (button) {
        const recipeId = button.dataset.favorite;
        const isFavorite = favorites.includes(recipeId);

        button.textContent = isFavorite ? "♥" : "♡";
        button.classList.toggle("is-favorite", isFavorite);
        button.setAttribute("aria-pressed", String(isFavorite));
        button.setAttribute(
            "aria-label",
            isFavorite ? "Remove from favorites" : "Add to favorites"
        );
    });

    const favoritesGrid = document.getElementById("favorites-grid");
    const favoritesEmpty = document.getElementById("favorites-empty");
    const favoritesCount = document.getElementById("favorites-count");

    if (!favoritesGrid || !favoritesEmpty || !favoritesCount) return;

    favoritesGrid.innerHTML = "";

    favorites.forEach(function (recipeId) {
        const originalButton = document.querySelector(
            `.recipe-button[data-recipe="${recipeId}"]`
        );
        const originalCard = originalButton?.closest(".recipe-card");

        if (!originalCard) return;

        const card = originalCard.cloneNode(true);

        // Make sure saved recipes are visible in Favorites.
        card.hidden = false;

        const heart = card.querySelector(".favorite-button");

        if (heart) {
            heart.textContent = "♥";
            heart.classList.add("is-favorite");
            heart.setAttribute("aria-pressed", "true");
            heart.setAttribute("aria-label", "Remove from favorites");
        }

        favoritesGrid.appendChild(card);
    });

    const count = favoritesGrid.children.length;

    favoritesCount.textContent =
        `${count} recipe${count === 1 ? "" : "s"}`;

    favoritesEmpty.hidden = count > 0;
}

document.addEventListener("click", function (event) {
    const button = event.target.closest(".favorite-button");
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    const recipeId = button.dataset.favorite;
    if (!recipeId) return;

    const favorites = getFavorites();
    const index = favorites.indexOf(recipeId);

    if (index === -1) {
        favorites.push(recipeId);
    } else {
        favorites.splice(index, 1);
    }

    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Could not save favorites:", error);
    }

    updateFavoriteButtons();
});

updateFavoriteButtons();
// FoodLab hamburger menu
const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");

if (menuToggle && siteMenu) {
    function closeMenu() {
        siteMenu.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
    }

    document.addEventListener("click", function (event) {
        if (!siteMenu.hidden && !siteMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
    });

    siteMenu.addEventListener("click", function (event) {
        if (event.target.closest("a")) closeMenu();
    });

    menuToggle.addEventListener("click", function () {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        siteMenu.hidden = isOpen;
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Open menu" : "Close menu"
        );
    });
}


/* AgentCity two-way link */
const ORDERS_KEY = "agentcity-foodlab-orders";

function showOrderStatus() {
    const box = document.getElementById("agentcity-send-status");
    if (!box || !window.foodLabLastOrderId) return;
    let orders = [];
    try { orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); } catch (error) {}
    const order = orders.find(o => o.id === window.foodLabLastOrderId);
    box.textContent = order
        ? `🏙️ AgentCity status: ${order.status} (${location.host})`
        : "This order was cleared in AgentCity.";
}

function markLastOrderDone() {
    try {
        const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
        const order = orders.find(o => o.id === window.foodLabLastOrderId);
        if (order && order.status !== "Done") {
            order.status = "Done";
            localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        }
    } catch (error) {}
    showOrderStatus();
}

window.addEventListener("storage", function (event) {
    if (event.key === ORDERS_KEY) showOrderStatus();
});
