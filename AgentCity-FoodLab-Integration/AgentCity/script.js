// AGENTCITY — Phase 2
// Employees and tasks are simulated for now. Real AI comes in a later phase.

const canvas = document.getElementById("city-canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const TILE_W = 70;
const TILE_H = 35;
const CENTER_X = 500;
const TOP_Y = 62;

let isRunning = true;
let selectedBusinessId = "software";
let selectedEmployee = null;
let frame = 0;

function iso(x, y, z = 0) {
  return {
    x: CENTER_X + (x - y) * TILE_W / 2,
    y: TOP_Y + (x + y) * TILE_H / 2 - z
  };
}

const businesses = [
  {
    id: "software", name: "Software company", type: "Technology",
    emoji: "🏢", x: 0.7, y: 0.5, w: 2, h: 2, height: 92,
    wall: "#7eacd0", side: "#527da4", roof: "#f0b76b",
    description: "A technology company where developers build websites, apps and digital products.",
    employees: [
      { name: "Alex Morgan", role: "Project manager", avatar: "🧑‍💼", status: "Planning", state: "Meeting", task: "Plan the team's next sprint." },
      { name: "Mia Chen", role: "Developer", avatar: "👩‍💻", status: "Working", state: "Working", task: "Build a new website feature." },
      { name: "Sam Rivera", role: "QA tester", avatar: "🧑‍🔬", status: "Testing", state: "Working", task: "Test the latest website changes." }
    ]
  },
  {
    id: "hotel", name: "Grand Hotel", type: "Hospitality",
    emoji: "🏨", x: 6.2, y: 0.4, w: 2, h: 2, height: 118,
    wall: "#e6a9a0", side: "#b87979", roof: "#f5d18a",
    description: "A welcoming hotel where the team handles guest check-ins, room bookings and service.",
    employees: [
      { name: "Olivia James", role: "Receptionist", avatar: "👩‍💼", status: "Checking in", state: "Working", task: "Welcome a guest at reception." },
      { name: "Noah Patel", role: "Concierge", avatar: "🧑‍✈️", status: "Available", state: "Idle", task: "Wait for a guest request." },
      { name: "Ava Wilson", role: "Housekeeping", avatar: "🧹", status: "Working", state: "Working", task: "Prepare a guest room." }
    ]
  },
  {
    id: "restaurant", name: "Sunny Restaurant", type: "Food & dining",
    emoji: "🍔", x: 7.0, y: 3.5, w: 2, h: 2, height: 72,
    wall: "#e8c17d", side: "#bd8e50", roof: "#df8061",
    description: "A neighbourhood restaurant where the kitchen prepares meals and the service team welcomes customers.",
    employees: [
      { name: "Luca Brown", role: "Head chef", avatar: "👨‍🍳", status: "Cooking", state: "Working", task: "Prepare the lunch special." },
      { name: "Ella Thomas", role: "Waiter", avatar: "🧑‍🍽️", status: "Serving", state: "Walking", task: "Deliver an order to a table." },
      { name: "Kai Martin", role: "Manager", avatar: "🧑‍💼", status: "Coordinating", state: "Meeting", task: "Review today's restaurant operations." }
    ]
  },
  {
    id: "hospital", name: "Care Hospital", type: "Healthcare",
    emoji: "🏥", x: 0.5, y: 4.0, w: 2, h: 2, height: 82,
    wall: "#f0f0e7", side: "#b9c8c2", roof: "#80b7ae",
    description: "A small hospital where the administrative team coordinates appointments and patient reception.",
    employees: [
      { name: "Priya Shah", role: "Receptionist", avatar: "👩‍⚕️", status: "Available", state: "Idle", task: "Wait for the next patient." },
      { name: "Daniel Lee", role: "Coordinator", avatar: "🧑‍💼", status: "Scheduling", state: "Working", task: "Organise appointment schedules." }
    ]
  },
  {
    id: "market", name: "Fresh Market", type: "Retail",
    emoji: "🛒", x: 5.6, y: 5.1, w: 2, h: 2, height: 65,
    wall: "#a8c98b", side: "#72945b", roof: "#f1c66f",
    description: "A local supermarket where staff serve customers and keep track of store inventory.",
    employees: [
      { name: "Arjun Kumar", role: "Cashier", avatar: "🧑‍💼", status: "At checkout", state: "Working", task: "Process a customer's purchase." },
      { name: "Zoe Clark", role: "Inventory clerk", avatar: "📦", status: "Stocking shelves", state: "Working", task: "Restock the fruit section." }
    ]
  }
];

const citizens = [
  { name: "Milo", color: "#477fc5", x: 0.2, speed: 0.012, offset: 0 },
  { name: "Nina", color: "#e47d65", x: 2.5, speed: 0.009, offset: 1.5 },
  { name: "Ravi", color: "#8668b7", x: 5.1, speed: 0.011, offset: 3 },
  { name: "Lily", color: "#d69b36", x: 7.4, speed: 0.008, offset: 4.5 }
];

const taskIdeas = {
  "Project manager": ["Review project deadlines.", "Assign tasks to the development team.", "Prepare the next team meeting."],
  "Developer": ["Fix a reported website issue.", "Build a new page component.", "Review and improve existing code."],
  "QA tester": ["Test the login form.", "Check the latest website update.", "Write a bug report."],
  "Head chef": ["Prepare the daily special.", "Check ingredient availability.", "Prepare a customer's meal."],
  "Waiter": ["Welcome a new customer.", "Deliver an order to a table.", "Check on a customer."],
  "Manager": ["Review today's operations.", "Check the team's progress.", "Prepare the daily report."],
  "Receptionist": ["Welcome the next visitor.", "Confirm an appointment.", "Answer a customer question."],
  "Concierge": ["Help a guest with directions.", "Arrange a guest request.", "Check local visitor information."],
  "Housekeeping": ["Prepare a guest room.", "Check room supplies.", "Clean and inspect a room."],
  "Coordinator": ["Organise the schedule.", "Review pending requests.", "Update the appointment list."],
  "Cashier": ["Process a customer purchase.", "Check the checkout queue.", "Assist a customer with payment."],
  "Inventory clerk": ["Restock a shelf.", "Count incoming products.", "Update the stock list."]
};

const states = ["Working", "Idle", "Walking", "Meeting"];
const stateLabels = {
  Working: "🟢 Working",
  Idle: "⚪ Idle",
  Walking: "🚶 Walking",
  Meeting: "👥 In a meeting"
};

function polygon(points, fill, stroke = null) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawGround() {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const a = iso(x, y), b = iso(x + 1, y), c = iso(x + 1, y + 1), d = iso(x, y + 1);
      const isRoad = y === 8 || x === 4;
      const shade = (x + y) % 2 === 0 ? "#a9ce9d" : "#9fc693";
      polygon([a, b, c, d], isRoad ? "#c8c9bd" : shade, "#91b987");
      if (isRoad && y === 8) {
        const mid1 = iso(x + 0.35, y + 0.5), mid2 = iso(x + 0.65, y + 0.5);
        ctx.strokeStyle = "#eee9d6"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(mid1.x, mid1.y); ctx.lineTo(mid2.x, mid2.y); ctx.stroke();
      }
    }
  }
  [[0.2, 2.7], [3.4, 0.2], [8.8, 1.8], [9, 5.7], [2.8, 6.8], [8.8, 7.1]].forEach(([x, y]) => drawTree(x, y));
}

function drawTree(x, y) {
  const p = iso(x, y);
  ctx.fillStyle = "rgba(49, 83, 51, 0.18)";
  ctx.beginPath(); ctx.ellipse(p.x, p.y + 4, 13, 6, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8b6544"; ctx.fillRect(p.x - 3, p.y - 17, 6, 18);
  ctx.fillStyle = "#4e9a61"; ctx.beginPath(); ctx.arc(p.x, p.y - 22, 13, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#69b878"; ctx.beginPath(); ctx.arc(p.x - 6, p.y - 27, 8, 0, Math.PI * 2); ctx.fill();
}

function drawBuilding(business) {
  const { x, y, w, h, height } = business;
  const p1 = iso(x, y), p2 = iso(x + w, y), p3 = iso(x + w, y + h), p4 = iso(x, y + h);
  const top1 = iso(x, y, height), top2 = iso(x + w, y, height), top3 = iso(x + w, y + h, height), top4 = iso(x, y + h, height);
  polygon([{x:p1.x+10,y:p1.y+5},{x:p2.x+10,y:p2.y+5},{x:p3.x+10,y:p3.y+5},{x:p4.x+10,y:p4.y+5}], "rgba(43, 72, 48, 0.15)");
  polygon([p2, p3, top3, top2], business.side, "#6f795f");
  polygon([p3, p4, top4, top3], business.wall, "#6f795f");
  polygon([top1, top2, top3, top4], business.roof, "#6f795f");
  [iso(x + 1.55, y + h, height * 0.45), iso(x + 1.05, y + h, height * 0.45)].forEach((p) => {
    ctx.fillStyle = "#d9eff0"; ctx.fillRect(p.x - 5, p.y - 10, 9, 13);
    ctx.strokeStyle = "rgba(54, 91, 95, .45)"; ctx.strokeRect(p.x - 5, p.y - 10, 9, 13);
  });
  const label = iso(x + w / 2, y + h / 2, height + 22);
  ctx.textAlign = "center"; ctx.font = "bold 22px Segoe UI Emoji, Arial"; ctx.fillText(business.emoji, label.x, label.y);
  const shortName = business.name.length > 15 ? business.name.slice(0, 14) + "…" : business.name;
  ctx.font = "bold 12px Arial"; ctx.lineWidth = 3; ctx.strokeStyle = "rgba(255,255,255,.9)";
  ctx.strokeText(shortName, label.x, label.y + 17); ctx.fillStyle = "#344b3a"; ctx.fillText(shortName, label.x, label.y + 17);
  if (business.id === selectedBusinessId) {
    ctx.strokeStyle = "#fff4a8"; ctx.lineWidth = 3; ctx.beginPath();
    ctx.ellipse((p1.x+p2.x+p3.x+p4.x)/4, (p1.y+p2.y+p3.y+p4.y)/4 + 2, 76, 34, 0, 0, Math.PI*2); ctx.stroke();
  }
}

function drawPerson(person) {
  const p = iso(person.x, 8.35 + Math.sin(frame / 18 + person.offset) * 0.035);
  const bob = Math.sin(frame / 5 + person.offset) * 2;
  ctx.fillStyle = "rgba(48, 61, 45, .2)"; ctx.beginPath(); ctx.ellipse(p.x, p.y + 1, 9, 4, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = person.color; ctx.beginPath(); ctx.roundRect(p.x - 5, p.y - 15 + bob, 10, 13, 4); ctx.fill();
  ctx.fillStyle = "#f2c7a5"; ctx.beginPath(); ctx.arc(p.x, p.y - 20 + bob, 5, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = "#39434b"; ctx.lineWidth = 2; ctx.beginPath();
  ctx.moveTo(p.x - 2, p.y - 3 + bob); ctx.lineTo(p.x - 4, p.y + 1 + bob);
  ctx.moveTo(p.x + 2, p.y - 3 + bob); ctx.lineTo(p.x + 4, p.y + 1 + bob); ctx.stroke();
}

function drawCity() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "#dcebd9"; ctx.fillRect(0, 0, WIDTH, HEIGHT);
  drawGround();
  [...businesses].sort((a, b) => (a.x + a.y) - (b.x + b.y)).forEach(drawBuilding);
  citizens.forEach(drawPerson);
  ctx.textAlign = "left"; ctx.fillStyle = "rgba(52, 75, 58, .75)";
  ctx.font = "bold 13px Arial"; ctx.fillText("AGENTCITY  /  CENTRAL DISTRICT", 24, 30);
  if (isRunning) {
    frame++;
    citizens.forEach((person) => { person.x += person.speed; if (person.x > 9.1) person.x = 0.1; });
  }
  requestAnimationFrame(drawCity);
}

function showEmployee(employee) {
  selectedEmployee = employee;
  document.getElementById("agent-name").textContent = employee.name;
  document.getElementById("agent-role").textContent = employee.role;
  document.getElementById("agent-state").textContent = stateLabels[employee.state] || employee.state;
  document.getElementById("agent-task").textContent = employee.task;
  document.getElementById("assign-task").disabled = false;
  renderEmployees(businesses.find(b => b.id === selectedBusinessId));
}

function renderEmployees(business) {
  const employeeList = document.getElementById("employee-list");
  employeeList.innerHTML = "";
  business.employees.forEach((employee) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "employee" + (employee === selectedEmployee ? " selected" : "");
    item.innerHTML = `
      <span class="employee-avatar">${employee.avatar}</span>
      <span class="employee-info"><b>${employee.name}</b><small>${employee.role}</small></span>
      <span class="status">${employee.state}</span>
    `;
    item.addEventListener("click", () => showEmployee(employee));
    employeeList.appendChild(item);
  });
}

function showBusiness(business) {
  document.getElementById("business-emoji").textContent = business.emoji;
  document.getElementById("business-name").textContent = business.name;
  document.getElementById("business-type").textContent = business.type;
  document.getElementById("business-description").textContent = business.description;
  renderEmployees(business);
  if (selectedEmployee && !business.employees.includes(selectedEmployee)) {
    selectedEmployee = null;
    document.getElementById("agent-name").textContent = "Select an employee";
    document.getElementById("agent-role").textContent = "Their role will appear here.";
    document.getElementById("agent-state").textContent = "—";
    document.getElementById("agent-task").textContent = "Choose an employee to see their task.";
    document.getElementById("assign-task").disabled = true;
  }
}

function addActivity(message, emoji = "📌") {
  const activityList = document.getElementById("activity-list");
  const item = document.createElement("div");
  item.className = "activity-item";
  const icon = document.createElement("span"); icon.textContent = emoji;
  const paragraph = document.createElement("p");
  const title = document.createElement("b"); title.textContent = message;
  const detail = document.createElement("small"); detail.textContent = "Just now";
  paragraph.append(title, detail); item.append(icon, paragraph); activityList.prepend(item);
  while (activityList.children.length > 5) activityList.removeChild(activityList.lastElementChild);
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height;
  const clickX = (event.clientX - rect.left) * scaleX, clickY = (event.clientY - rect.top) * scaleY;
  let closestBusiness = null, closestDistance = Infinity;
  businesses.forEach((business) => {
    const center = iso(business.x + business.w / 2, business.y + business.h / 2, business.height / 2);
    const distance = Math.hypot(clickX - center.x, clickY - center.y);
    if (distance < closestDistance) { closestDistance = distance; closestBusiness = business; }
  });
  if (closestBusiness && closestDistance < 105) {
    selectedBusinessId = closestBusiness.id;
    showBusiness(closestBusiness);
    addActivity(`You inspected ${closestBusiness.name}.`, "🔎");
  }
});

document.getElementById("assign-task").addEventListener("click", () => {
  if (!selectedEmployee) return;
  if (selectedEmployee.foodlabActive) {
    addActivity(`${selectedEmployee.name} is busy with a FoodLab order.`, "🍳");
    return;
  }
  const ideas = taskIdeas[selectedEmployee.role] || ["Review the next task.", "Help a customer.", "Update the work report."];
  selectedEmployee.taskIndex = (selectedEmployee.taskIndex ?? -1) + 1;
  selectedEmployee.task = ideas[selectedEmployee.taskIndex % ideas.length];
  const currentIndex = states.indexOf(selectedEmployee.state);
  selectedEmployee.state = states[(currentIndex + 1) % states.length];
  document.getElementById("agent-state").textContent = stateLabels[selectedEmployee.state];
  document.getElementById("agent-task").textContent = selectedEmployee.task;
  renderEmployees(businesses.find(b => b.id === selectedBusinessId));
  addActivity(`${selectedEmployee.name} was assigned a new task.`, "📋");
});

document.getElementById("toggle-simulation").addEventListener("click", (event) => {
  isRunning = !isRunning;
  event.currentTarget.textContent = isRunning ? "Pause city" : "Resume city";
  document.getElementById("simulation-status").textContent = isRunning ? "SIMULATION RUNNING" : "SIMULATION PAUSED";
  addActivity(isRunning ? "The city simulation resumed." : "The city simulation was paused.", isRunning ? "▶️" : "⏸️");
});

showBusiness(businesses[0]);
drawCity();


// FOODLAB INTEGRATION
// FoodLab and AgentCity must be served from the same local web origin (see README).
//
// Orders live in localStorage, so the chef's work survives reloads and extra tabs:
//   New      -> just sent from FoodLab
//   Cooking  -> the oldest unfinished order (the chef is working on it)
//   Queued   -> waiting behind the active order
//   Done     -> finished (marked with the "Mark done" button)
const FOODLAB_ORDERS_KEY = "agentcity-foodlab-orders";

function readFoodLabOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem(FOODLAB_ORDERS_KEY) || "[]");
    return Array.isArray(orders) ? orders.filter(order => order && order.id) : [];
  } catch (error) {
    console.error("Could not read FoodLab orders:", error);
    return [];
  }
}

// Re-read right before writing so an order that FoodLab added a moment ago is not overwritten.
// The mutator returns true when it changed something.
function updateFoodLabOrders(mutator) {
  const orders = readFoodLabOrders();
  if (mutator(orders)) {
    try {
      localStorage.setItem(FOODLAB_ORDERS_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error("Could not update FoodLab orders:", error);
    }
  }
  return orders;
}

function getRestaurantChef() {
  const restaurant = businesses.find(business => business.id === "restaurant");
  const chef = restaurant?.employees.find(employee => employee.role === "Head chef");
  return { restaurant, chef };
}

function renderFoodLabOrders(orders) {
  const orderList = document.getElementById("foodlab-order-list");
  const orderCount = document.getElementById("foodlab-order-count");
  if (!orderList || !orderCount) return;

  const pending = orders.filter(order => order.status !== "Done");
  const finished = orders.filter(order => order.status === "Done").reverse();
  orderCount.textContent = String(pending.length);

  if (orders.length === 0) {
    orderList.innerHTML = '<p class="no-orders">No FoodLab tasks yet. Send a recipe from FoodLab to get started.</p>';
    return;
  }

  orderList.innerHTML = "";

  [...pending, ...finished].slice(0, 6).forEach((order) => {
    const card = document.createElement("div");
    card.className = "foodlab-order" + (order.status === "Done" ? " is-done" : "");

    const title = document.createElement("strong");
    title.textContent = order.recipeName || "FoodLab recipe";

    const details = document.createElement("p");
    details.textContent = `${order.servings || 1} serving(s) · ${order.cookingTime || "—"} min`;

    const status = document.createElement("span");
    status.className = "foodlab-order-status status-" + String(order.status || "New").toLowerCase();
    status.textContent = order.status || "New";

    card.append(title, details, status);

    if (order.status === "Cooking") {
      const doneButton = document.createElement("button");
      doneButton.type = "button";
      doneButton.className = "order-done-button";
      doneButton.dataset.orderId = order.id;
      doneButton.textContent = "Mark done";
      card.appendChild(doneButton);
    }

    orderList.appendChild(card);
  });

  if (finished.length > 0) {
    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.className = "order-clear-button";
    clearButton.textContent = `Clear ${finished.length} finished`;
    orderList.appendChild(clearButton);
  }
}

// Make the chef, the order statuses and the panel agree with the saved orders.
function syncFoodLabQueue() {
  const { restaurant, chef } = getRestaurantChef();
  const arrivals = [];

  const orders = updateFoodLabOrders((list) => {
    let changed = false;
    let activeFound = false;

    list.forEach((order) => {
      if (order.status === "Done") return;

      const wanted = activeFound ? "Queued" : "Cooking";
      activeFound = true;

      if (order.status === "New") arrivals.push(order.recipeName || "a recipe");

      if (order.status !== wanted) {
        order.status = wanted;
        changed = true;
      }
    });

    return changed;
  });

  const pending = orders.filter(order => order.status !== "Done");

  if (chef) {
    if (pending.length > 0) {
      if (!chef.foodlabActive) {
        chef.savedTask = chef.task;
        chef.savedState = chef.state;
        chef.savedStatus = chef.status;
        chef.foodlabActive = true;
      }

      const current = pending[0];
      const waiting = pending.length - 1;
      chef.task = `Prepare ${current.recipeName || "the FoodLab recipe"} (${current.servings || 1} serving(s)).`
        + (waiting > 0 ? ` ${waiting} more waiting in the queue.` : "");
      chef.state = "Working";
      chef.status = "Preparing FoodLab task";
    } else if (chef.foodlabActive) {
      chef.task = chef.savedTask;
      chef.state = chef.savedState;
      chef.status = chef.savedStatus;
      chef.foodlabActive = false;
    }
  }

  arrivals.forEach(name => addActivity(`FoodLab sent ${name} to the restaurant chef.`, "🍳"));
  renderFoodLabOrders(orders);

  if (chef && selectedEmployee === chef) {
    showEmployee(chef);
  } else if (restaurant && selectedBusinessId === "restaurant") {
    showBusiness(restaurant);
  }
}

document.getElementById("foodlab-order-list").addEventListener("click", (event) => {
  const doneButton = event.target.closest(".order-done-button");
  const clearButton = event.target.closest(".order-clear-button");

  if (doneButton) {
    let finishedName = "";
    updateFoodLabOrders((list) => {
      const order = list.find(item => item.id === doneButton.dataset.orderId);
      if (!order || order.status === "Done") return false;
      order.status = "Done";
      finishedName = order.recipeName || "the recipe";
      return true;
    });

    const { chef } = getRestaurantChef();
    if (finishedName) addActivity(`${chef ? chef.name : "The chef"} finished ${finishedName}.`, "✅");
    syncFoodLabQueue();
  }

  if (clearButton) {
    updateFoodLabOrders((list) => {
      const remaining = list.filter(order => order.status !== "Done");
      if (remaining.length === list.length) return false;
      list.length = 0;
      list.push(...remaining);
      return true;
    });
    syncFoodLabQueue();
  }
});

// Read saved tasks when AgentCity opens and listen for changes from other tabs.
syncFoodLabQueue();
window.addEventListener("storage", (event) => {
  if (event.key === FOODLAB_ORDERS_KEY) syncFoodLabQueue();
});
