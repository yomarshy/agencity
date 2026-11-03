// CODELEARN INTEGRATION: coding requests from the e-learning site go to the software developer (Mia Chen).
// Statuses: New -> Coding (oldest unfinished) / Queued / Done. Stored in localStorage like FoodLab orders.
const ELEARN_KEY = "agentcity-elearn-tasks";

function elReadTasks() {
  try {
    const list = JSON.parse(localStorage.getItem(ELEARN_KEY) || "[]");
    return Array.isArray(list) ? list.filter(t => t && t.id) : [];
  } catch (error) { return []; }
}

function elUpdateTasks(mutator) {
  const list = elReadTasks();
  if (mutator(list)) {
    try { localStorage.setItem(ELEARN_KEY, JSON.stringify(list)); } catch (error) {}
  }
  return list;
}

function elGetDeveloper() {
  const business = businesses.find(b => b.id === "software");
  return { business, dev: business?.employees.find(e => e.role === "Developer") };
}

function elRender(tasks) {
  const box = document.getElementById("elearn-task-list");
  const pending = tasks.filter(t => t.status !== "Done");
  const finished = tasks.filter(t => t.status === "Done").reverse();
  document.getElementById("elearn-task-count").textContent = String(pending.length);
  if (tasks.length === 0) { box.innerHTML = '<p class="no-orders">No coding tasks yet.</p>'; return; }
  box.innerHTML = "";
  [...pending, ...finished].slice(0, 6).forEach((t) => {
    const card = document.createElement("div");
    card.className = "foodlab-order" + (t.status === "Done" ? " is-done" : "");
    const title = document.createElement("strong"); title.textContent = t.title;
    const status = document.createElement("span");
    status.className = "foodlab-order-status status-" + String(t.status).toLowerCase();
    status.textContent = t.status;
    card.append(title, status);
    if (t.error) { const er = document.createElement("p"); er.textContent = "⚠️ " + t.error; card.appendChild(er); }
    if (t.status === "Coding" && t.generating) {
      const w = document.createElement("p"); w.textContent = "✨ Mia is writing the code…"; card.appendChild(w);
    } else if (t.status === "Coding") {
      const g = document.createElement("button");
      g.type = "button"; g.className = "order-code-button"; g.dataset.taskId = t.id; g.textContent = "✨ Let Mia code it";
      const b = document.createElement("button");
      b.type = "button"; b.className = "order-done-button"; b.dataset.taskId = t.id; b.textContent = "Mark done";
      card.append(g, b);
    }
    box.appendChild(card);
  });
  if (finished.length) {
    const c = document.createElement("button");
    c.type = "button"; c.className = "order-clear-button"; c.textContent = `Clear ${finished.length} finished`;
    box.appendChild(c);
  }
}

function elSync() {
  const { business, dev } = elGetDeveloper();
  const arrivals = [];
  const tasks = elUpdateTasks((list) => {
    let changed = false, active = false;
    list.forEach((t) => {
      if (t.generating && Date.now() - (t.generatingAt || 0) > 120000) { delete t.generating; changed = true; }
      if (t.status === "Done") return;
      const wanted = active ? "Queued" : "Coding";
      active = true;
      if (t.status === "New") arrivals.push(t.title);
      if (t.status !== wanted) { t.status = wanted; changed = true; }
    });
    return changed;
  });
  const pending = tasks.filter(t => t.status !== "Done");
  if (dev) {
    if (pending.length) {
      if (!dev.elearnActive) {
        Object.assign(dev, { savedTask: dev.task, savedState: dev.state, savedStatus: dev.status, elearnActive: true });
      }
      dev.task = `Code: ${pending[0].title}.` + (pending.length > 1 ? ` ${pending.length - 1} more waiting.` : "");
      dev.state = "Working"; dev.status = "Coding CodeLearn task";
    } else if (dev.elearnActive) {
      Object.assign(dev, { task: dev.savedTask, state: dev.savedState, status: dev.savedStatus, elearnActive: false });
    }
  }
  arrivals.forEach(n => addActivity(`CodeLearn sent "${n}" to ${dev ? dev.name : "the developer"}.`, "💻"));
  elRender(tasks);
  if (dev && selectedEmployee === dev) showEmployee(dev);
  else if (business && selectedBusinessId === "software") showBusiness(business);
}

document.getElementById("elearn-task-list").addEventListener("click", (event) => {
  const code = event.target.closest(".order-code-button");
  if (code) { elGenerate(code.dataset.taskId); return; }
  const done = event.target.closest(".order-done-button");
  if (done) {
    let name = "";
    elUpdateTasks((list) => {
      const t = list.find(x => x.id === done.dataset.taskId);
      if (!t || t.status === "Done") return false;
      t.status = "Done"; name = t.title; return true;
    });
    const { dev } = elGetDeveloper();
    if (name) addActivity(`${dev ? dev.name : "The developer"} finished "${name}".`, "✅");
    elSync();
  }
  if (event.target.closest(".order-clear-button")) {
    elUpdateTasks((list) => {
      const rest = list.filter(t => t.status !== "Done");
      if (rest.length === list.length) return false;
      list.length = 0; list.push(...rest); return true;
    });
    elSync();
  }
});

// Mia writes real code through server.js, which calls the Claude API with the key kept on the server.
async function elGenerate(id) {
  let title = "";
  elUpdateTasks((list) => {
    const t = list.find(x => x.id === id);
    if (!t || t.generating) return false;
    t.generating = true; t.generatingAt = Date.now(); delete t.error; title = t.title; return true;
  });
  if (!title) return;
  elSync();
  let html = "", error = "";
  try {
    const r = await fetch("/api/mia", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ title }) });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || "Request failed");
    html = data.html;
  } catch (e) {
    error = (e instanceof TypeError || e instanceof SyntaxError)
      ? "Mia's AI needs the app started with: node server.js (see README)." : e.message;
  }
  elUpdateTasks((list) => {
    const t = list.find(x => x.id === id);
    if (!t) return false;
    delete t.generating;
    if (html) { t.result = html; t.status = "Done"; } else { t.error = error; }
    return true;
  });
  const { dev } = elGetDeveloper();
  if (html) addActivity(`${dev ? dev.name : "The developer"} wrote code for "${title}".`, "💻");
  elSync();
}

document.getElementById("elearn-origin").textContent =
  `Apps must share one address. This tab: ${location.host || "(none)"}`;
if (location.protocol === "file:") {
  const warn = document.createElement("p");
  warn.className = "origin-warning";
  warn.textContent = "Opened as a file: FoodLab and CodeLearn cannot reach AgentCity. Use VS Code Live Server.";
  document.body.prepend(warn);
}

elSync();
window.addEventListener("storage", (e) => { if (e.key === ELEARN_KEY) elSync(); });
