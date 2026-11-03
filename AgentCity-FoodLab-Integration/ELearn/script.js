// CodeLearn: lessons and progress live here; coding requests go to AgentCity's developer through localStorage.
const TASKS_KEY = "agentcity-elearn-tasks";
const PROGRESS_KEY = "codelearn-progress";
const courses = [
  { id: "html", title: "HTML Basics", lessons: ["Tags and elements", "Links and images", "Forms"] },
  { id: "css", title: "CSS Layout", lessons: ["The box model", "Flexbox", "Grid"] },
  { id: "js", title: "JavaScript Fundamentals", lessons: ["Variables and types", "Functions", "DOM events"] }
];
const $ = id => document.getElementById(id);

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (error) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (error) { return false; }
}

function sendTask(title) {
  let tasks = load(TASKS_KEY, []);
  if (!Array.isArray(tasks)) tasks = [];
  tasks.push({ id: `elearn-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, title, status: "New", sentAt: new Date().toISOString() });
  const recentDone = tasks.filter(t => t.status === "Done").slice(-10);
  save(TASKS_KEY, tasks.filter(t => t.status !== "Done" || recentDone.includes(t)));
  renderTasks();
  window.open("../AgentCity/index.html", "agentcity-tab");
}

function renderCourses() {
  const progress = load(PROGRESS_KEY, {});
  const box = $("courses");
  box.innerHTML = "";
  let total = 0, done = 0;
  courses.forEach((course) => {
    const card = el("article", "course");
    card.append(el("h2", "", course.title));
    course.lessons.forEach((lesson, i) => {
      const id = course.id + i;
      total++; if (progress[id]) done++;
      const row = el("div", "lesson");
      const label = el("label");
      const box2 = document.createElement("input");
      box2.type = "checkbox"; box2.checked = !!progress[id];
      box2.addEventListener("change", () => {
        const p = load(PROGRESS_KEY, {}); p[id] = box2.checked; save(PROGRESS_KEY, p); renderCourses();
      });
      label.append(box2, el("span", "", lesson));
      const ask = el("button", "ask", "💻 Ask dev for practice");
      ask.type = "button";
      ask.addEventListener("click", () => sendTask(`Practice exercise: ${course.title} – ${lesson}`));
      row.append(label, ask);
      card.append(row);
    });
    box.append(card);
  });
  $("progress-text").textContent = `${done} of ${total} lessons complete`;
  $("progress-fill").style.width = (total ? (done / total) * 100 : 0) + "%";
}

function renderTasks() {
  const tasks = load(TASKS_KEY, []);
  const box = $("tasks");
  box.innerHTML = "";
  if (!Array.isArray(tasks) || tasks.length === 0) { box.append(el("p", "hint", "No requests yet.")); return; }
  const ordered = [...tasks.filter(t => t.status !== "Done"), ...tasks.filter(t => t.status === "Done").reverse()];
  ordered.slice(0, 8).forEach((t) => {
    const row = el("div", "task" + (t.status === "Done" ? " is-done" : ""));
    row.append(el("span", "", t.title), el("span", "status status-" + String(t.status).toLowerCase(), t.status));
    if (t.result) {
      const view = el("button", "ask", "▶ View code result");
      view.type = "button";
      // Sandboxed iframe without allow-same-origin: AI-written code cannot touch this site's data.
      view.addEventListener("click", () => { $("preview").srcdoc = t.result; $("preview-box").hidden = false; });
      row.append(view);
    }
    box.append(row);
  });
}

$("preview-close").addEventListener("click", () => { $("preview-box").hidden = true; $("preview").srcdoc = ""; });

$("req-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = $("req-input").value.trim();
  if (!text) return;
  sendTask(text);
  $("req-input").value = "";
});

$("origin").textContent = location.protocol === "file:"
  ? "Opened as a file: use VS Code Live Server so AgentCity can receive requests."
  : `Apps must share one address. This tab: ${location.host}`;

window.addEventListener("storage", (e) => { if (e.key === TASKS_KEY) renderTasks(); });
renderCourses();
renderTasks();
