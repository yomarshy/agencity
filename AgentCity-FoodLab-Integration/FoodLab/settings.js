// FoodLab hamburger menu (same as the home page)
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

    menuToggle.addEventListener("click", function () {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        siteMenu.hidden = isOpen;
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const handle = document.getElementById("pull-chain");
    const chain = document.getElementById("chain-line");
    const control = document.getElementById("pull-chain-control");
    const toggle = document.getElementById("dark-mode-toggle");
    const cuisine = document.getElementById("cuisine-setting");
    const status = document.getElementById("settings-status");

    if (!handle || !chain || !control || !toggle) return;

    // Theme and preference settings
    function applyTheme(isDark) {
        document.body.classList.toggle("dark-mode", isDark);
        toggle.checked = isDark;
        handle.textContent = isDark ? "☀" : "☾";
        handle.setAttribute("aria-pressed", String(isDark));

        try {
            localStorage.setItem("foodlab-dark-mode", String(isDark));
        } catch (error) {}
    }

    try {
        applyTheme(localStorage.getItem("foodlab-dark-mode") === "true");
    } catch (error) {
        applyTheme(false);
    }

    if (cuisine) {
        try {
            cuisine.value = localStorage.getItem("foodlab-cuisine") || "all";
        } catch (error) {}

        cuisine.addEventListener("change", () => {
            try {
                localStorage.setItem("foodlab-cuisine", cuisine.value);
            } catch (error) {}

            if (status) status.textContent = "Cooking preference saved.";
        });
    }

    // CHAIN PHYSICS
    const LENGTH = 115;
    const GRAVITY = 1800;
    const DAMPING = 1.8;
    const MAX_ANGLE = 0.85;
    const PULL_DISTANCE = 45;

    let angle = 0;
    let angularVelocity = 0;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startAngle = 0;
    let lastTime = 0;
    let frame = null;
    let pulledFarEnough = false;
    let dragOriginX = 0;
    let lastToggle = 0;

    function render() {
    const pendulum = document.getElementById("chain-pendulum");

    if (!pendulum) return;

    pendulum.style.transform = `rotate(${angle}rad)`;
}

    function animate(time) {
        if (dragging) {
            frame = null;
            return;
        }

        if (!lastTime) lastTime = time;
        const dt = Math.min((time - lastTime) / 1000, 0.02);
        lastTime = time;

        // Gravity pulls the pendulum toward vertical.
        const acceleration =
            -(GRAVITY / LENGTH) * Math.sin(angle)
            - DAMPING * angularVelocity;

        angularVelocity += acceleration * dt;
        angle += angularVelocity * dt;

        // Keep motion within a reasonable range.
        angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angle));

        render();

        // Continue while the chain is still moving.
        if (
            Math.abs(angle) > 0.001 ||
            Math.abs(angularVelocity) > 0.005
        ) {
            frame = requestAnimationFrame(animate);
        } else {
            angle = 0;
            angularVelocity = 0;
            render();
            frame = null;
        }
    }

    function startAnimation() {
        if (frame !== null) cancelAnimationFrame(frame);
        lastTime = 0;
        frame = requestAnimationFrame(animate);
    }

    function startDrag(event) {
        if (event.button !== undefined && event.button !== 0) return;

        dragging = true;
        pulledFarEnough = false;
        startX = event.clientX;
        startY = event.clientY;
        startAngle = angle;
        dragOriginX = event.clientX;

        angularVelocity = 0;

        if (frame !== null) {
            cancelAnimationFrame(frame);
            frame = null;
        }

        control.classList.add("is-pulling");

        try {
            control.setPointerCapture(event.pointerId);
        } catch (error) {}

        event.preventDefault();
    }

    function moveDrag(event) {
        if (!dragging) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        // Horizontal movement swings the chain.
        // Pulling downward also increases the swing angle.
        angle = startAngle + dx / LENGTH + dy / (LENGTH * 2);
        angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angle));

        if (dy >= PULL_DISTANCE) pulledFarEnough = true;

        render();
    }

    function endDrag(event) {
        if (!dragging) return;

        const releaseX = event.clientX;
        const releaseY = event.clientY;

        dragging = false;
        control.classList.remove("is-pulling");

        // Add momentum in the direction the user released it.
        angularVelocity += (releaseX - startX) * 0.025;

        // A tap or a downward pull toggles the theme.
        const wasTap = Math.hypot(releaseX - startX, releaseY - startY) < 6;
        if (wasTap || pulledFarEnough || releaseY - startY >= PULL_DISTANCE) {
            lastToggle = Date.now();
            applyTheme(!toggle.checked);

            if (status) {
                status.textContent = toggle.checked
                    ? "Dark mode enabled."
                    : "Light mode enabled.";
            }
        }

        startAnimation();
    }

    control.addEventListener("pointerdown", startDrag);
    control.addEventListener("pointermove", moveDrag);
    control.addEventListener("pointerup", endDrag);
    control.addEventListener("pointercancel", endDrag);

    // Clicking the handle toggles the theme.
    handle.addEventListener("click", () => {
        if (dragging || Date.now() - lastToggle < 400) return;

        applyTheme(!toggle.checked);

        if (status) {
            status.textContent = toggle.checked
                ? "Dark mode enabled."
                : "Light mode enabled.";
        }

        // Give it a little sideways kick.
        angularVelocity = 3.5;
        startAnimation();
    });

    render();
});
