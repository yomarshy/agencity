# AgentCity + FoodLab Integration (updated)

## Setup (important)
1. Extract this ZIP.
2. Open the AgentCity-FoodLab-Integration folder in VS Code (the folder with this README and the root index.html).
3. Install the VS Code "Live Server" extension if you do not have it.
4. Right-click the root index.html and choose "Open with Live Server".
5. Open AgentCity and FoodLab from the launch page. Both must use the same address
   (for example http://127.0.0.1:5500/). Do not open the files by double-clicking them.

## How the connection works now
1. In FoodLab, open a recipe and click "Send cooking task to AgentCity".
2. AgentCity opens in ONE named tab. Sending more recipes reuses that tab.
3. In AgentCity, the "Restaurant orders" panel lists the orders:
   Cooking = the chef (Luca Brown) is working on it, Queued = waiting, Done = finished.
4. Click "Mark done" on the Cooking order and the next order in the queue starts.
5. Orders and the chef's task are saved in the browser, so they survive a reload and extra tabs.
   "Clear finished" removes completed orders.

## What changed in this version
AgentCity / integration
- The chef's task is rebuilt from the saved orders, so it no longer resets after a refresh.
- Orders now queue (Cooking / Queued / Done) instead of overwriting each other.
- Sending recipes no longer opens a new AgentCity tab every time.
- Order updates re-read the saved list right before writing, so a new order is not lost.

FoodLab
- Dark mode (saved from Settings) now applies on every page, including the home and recipe pages.
- The Favorites section is hidden while you read a recipe.
- Grilled Chicken is 35 min on the card, matching the recipe.
- "Favorite cuisine" in Settings now works: matching recipes are listed first and tagged.
  (Indian: curries and fish fry, Chinese: fried rice, Other: omelette and grilled chicken.
   There is no Italian recipe yet.)
- "Default order" now restores the original order after sorting.
- Settings page uses the same menu as the home page; the menu closes on Escape / outside click.
- Images converted to WebP: 22.5 MB -> 2.7 MB.

## Version 3 additions
- CodeLearn (ELearn folder): e-learning site. Tick lessons, or click "Ask dev for practice" / type a request.
  The request goes to Mia Chen (Developer) in AgentCity: Coding / Queued / Done, same queue as FoodLab.
- FoodLab now shows the AgentCity order status, and "Food Is Ready!" marks the order done.
- Only finished orders are trimmed (never pending ones); card names and times come from the recipes data.
- Settings: a plain tap on the pull chain now toggles the theme. AgentCity shows its address and warns on file:// use.

## Real AI for Mia (version 4)
Run the app with the included server instead of Live Server (needs Node 18+):
  Windows (cmd):  set ANTHROPIC_API_KEY=your-key   then   node server.js
  Mac/Linux:      export ANTHROPIC_API_KEY=your-key  then   node server.js
Open http://127.0.0.1:5500/ . In AgentCity, click "Let Mia code it" on a Coding task. Mia calls Claude, the page
she writes is stored with the task, and CodeLearn shows "View code result" in a sandboxed preview.
Set MODEL to change the model (default claude-sonnet-5-5). Each click uses your API credits. Never put the key in files or chat.

## Still simulated
Only Mia's coding is real AI (via server.js); the other employees are simulated. This is a browser-to-browser connection through
localStorage, not a cloud backend.
