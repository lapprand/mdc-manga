// jsdom smoke test for the category selector and grid.
// Requires the dev server on http://localhost:8080 (npm run serve).
// Run from the repo root: npm test
const { JSDOM } = require("jsdom");
const http = require("http");

const sleep = ms => new Promise(r => setTimeout(r, ms));

let failures = 0;
function check(name, cond) {
    console.log(`${cond ? "PASS" : "FAIL"} - ${name}`);
    if (!cond) failures++;
}

function fetchUrl(path) {
    return new Promise((resolve, reject) => {
        const req = http.get("http://localhost:8080/" + path, res => {
            let data = "";
            res.on("data", c => (data += c));
            res.on("end", () => resolve(data));
        });
        req.on("error", reject);
        req.setTimeout(5000, () => req.destroy(new Error("timeout")));
    });
}

(async () => {
    // Preflight: the harness loads the app from the dev server
    try {
        await fetchUrl("");
    } catch (e) {
        console.log("Dev server not reachable at http://localhost:8080.");
        console.log("Start it first with: npm run serve");
        process.exit(1);
    }
    const html = await fetchUrl("");
    const dom = new JSDOM(html, {
        url: "http://localhost:8080/",
        runScripts: "dangerously",
        pretendToBeVisual: true,
        resources: "usable"
    });
    const { window } = dom;

    const errors = [];
    window.addEventListener("error", e => errors.push(String(e.message || e.error)));
    window.addEventListener("unhandledrejection", e => errors.push("promise: " + String(e.reason)));

    const bundle = await fetchUrl("bundle.js");
    try {
        window.eval(bundle);
    } catch (e) {
        console.log("eval threw at load:", String(e));
        process.exit(1);
    }

    await sleep(4000);

    const menu = () => window.document.querySelector(".mdc-select__menu");
    const anchor = () => window.document.querySelector(".mdc-select__anchor");
    const input = () => window.document.querySelector(".mdc-select__selected-text");
    const isOpen = () => menu().classList.contains("mdc-menu-surface--open");
    const expanded = () => anchor().getAttribute("aria-expanded");

    // 1. Click on the visible text input itself opens the menu
    input().click();
    await sleep(300);
    check("click on the value text opens the menu", isOpen() && expanded() === "true");

    // 2. P1 regression: repeated anchor clicks must never desync the menu's
    // class from MDC's aria-expanded state. With >400ms gaps (past MDC's click
    // debounce) every click is a clean toggle: open→closed→open→closed.
    const syncOk = () => isOpen() === (expanded() === "true");
    for (let i = 0; i < 4; i++) {
        anchor().click();
        await sleep(500);
        check(`toggle click ${i + 2}: menu class and aria-expanded in sync`, syncOk());
    }
    // One rapid double-click (within the 400ms debounce): state must still be
    // consistent afterwards, whatever the outcome of the second click.
    anchor().click();
    anchor().click();
    await sleep(600);
    check("rapid double-click keeps menu and aria in sync", syncOk());
    check("menu closed after rapid double-click", !isOpen());
    // re-open for the next section
    anchor().click();
    await sleep(300);

    // 4. Reopen, then Escape (dispatched on the menu, where focus lives when open)
    anchor().click();
    await sleep(300);
    menu().dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await sleep(300);
    check("Escape closes the menu", !isOpen() && expanded() === "false");

    // 5. In-menu keyboard navigation: open with Enter, move with ArrowDown,
    // select with Enter — the full keyboard-only path.
    anchor().focus();
    anchor().dispatchEvent(new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await sleep(400);
    check("keyboard: Enter on the anchor opens the menu", isOpen() && expanded() === "true");
    const focusedOnOpen = window.document.activeElement;
    check("keyboard: focus lands inside the menu", menu().contains(focusedOnOpen));

    focusedOnOpen.dispatchEvent(new window.KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    await sleep(150);
    const focusedAfterArrow = window.document.activeElement;
    check("keyboard: ArrowDown moves focus to the next option", focusedAfterArrow !== focusedOnOpen);

    focusedAfterArrow.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await sleep(500);
    check("keyboard: Enter selects the focused option", !isOpen());
    check("keyboard: selection updates the visible value", input().value === "Anime");
    check("keyboard: aria-expanded is false after selection", expanded() === "false");

    // 6. Select a category via click; visible value follows MDC's selection.
    // Open the menu first, like a real user would.
    anchor().click();
    await sleep(400);
    window.document.querySelector('.mdc-list-item[data-value="characters"]').click();
    await sleep(500);
    check("selecting an item closes the menu", !isOpen());
    check("selecting an item updates the visible value", input().value === "Characters");
    check("aria-expanded is false after selection", expanded() === "false");
    check("focus stays on the control", window.document.activeElement === anchor());

    // 7. Grid reacts to the selection. Network-dependent (real AniList calls):
    // if the previous category's fetch is still in flight, the new one is
    // deferred until it settles (pendingRefresh), so poll up to ~20s for any
    // reaction: items loaded, loader fetching, or an in-grid error.
    let reacted = false;
    let cards = 0, loading = false, errorShown = false;
    for (let i = 0; i < 20 && !reacted; i++) {
        await sleep(1000);
        cards = window.document.querySelectorAll(".my-grid-cell").length;
        loading = !!window.document.querySelector("#loader");
        errorShown = !!window.document.querySelector(".load-error");
        reacted = cards > 0 || loading || errorShown;
    }
    check(
        `grid reacts to selection (cards=${cards}, loader=${loading}, error=${errorShown})`,
        reacted
    );

    check("no console errors", errors.length === 0);
    if (errors.length) console.log("errors:", errors.slice(0, 10));

    console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
    process.exit(failures === 0 ? 0 : 1);
})().catch(e => { console.error("SCRIPT FAILED:", e); process.exit(1); });
