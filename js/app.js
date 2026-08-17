(() => {
  const c = window.WORKSHOP_SETTINGS;
  const defaultState = {
    done: [],
    notes: [],
    requirements: [],
    tests: [],
    planner: {},
    products: [{}, {}, {}],
    finalUrl: "",
    fixLater: [],
    helpQueue: [],
    recoverySnapshots: [],
    recycleBin: [],
    lastSnapshotAt: 0,
    view: "student",
  };

  const saved = JSON.parse(localStorage.getItem(c.workshop.storageKey) || "{}");
  const s = { ...defaultState, ...saved };

  ["done", "notes", "requirements", "tests", "fixLater", "helpQueue", "recoverySnapshots", "recycleBin"].forEach(
    (key) => {
      if (!Array.isArray(s[key])) s[key] = [];
    },
  );
  if (!Array.isArray(s.products)) s.products = [{}, {}, {}];
  if (!s.planner || typeof s.planner !== "object") s.planner = {};

  let current = "dashboard";
  const $ = (x) => document.querySelector(x);
  const page = $("#page");

  function esc(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function snapshotPayload() {
    return {
      done: [...s.done],
      notes: [...s.notes],
      requirements: [...s.requirements],
      tests: [...s.tests],
      planner: { ...s.planner },
      products: s.products.map((p) => ({ ...p })),
      finalUrl: s.finalUrl || "",
      fixLater: s.fixLater.map((x) => ({ ...x })),
      helpQueue: s.helpQueue.map((x) => ({ ...x })),
      savedAt: Date.now(),
    };
  }

  function createRecoverySnapshot(force = false) {
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;

    if (!force && s.lastSnapshotAt && now - s.lastSnapshotAt < tenMinutes) return;

    const snap = snapshotPayload();
    s.recoverySnapshots.unshift(snap);
    s.recoverySnapshots = s.recoverySnapshots.slice(0, 12);
    s.lastSnapshotAt = now;
  }

  function save(options = {}) {
    if (options.snapshot !== false) createRecoverySnapshot(Boolean(options.forceSnapshot));
    localStorage.setItem(c.workshop.storageKey, JSON.stringify(s));
    progress();
  }

  function restoreSnapshot(snapshot) {
    if (!snapshot) return;
    const currentSnapshots = [...s.recoverySnapshots];
    const currentRecycleBin = [...s.recycleBin];

    Object.assign(s, {
      done: [...(snapshot.done || [])],
      notes: [...(snapshot.notes || [])],
      requirements: [...(snapshot.requirements || [])],
      tests: [...(snapshot.tests || [])],
      planner: { ...(snapshot.planner || {}) },
      products: (snapshot.products || [{}, {}, {}]).map((p) => ({ ...p })),
      finalUrl: snapshot.finalUrl || "",
      fixLater: (snapshot.fixLater || []).map((x) => ({ ...x })),
      helpQueue: (snapshot.helpQueue || []).map((x) => ({ ...x })),
      recoverySnapshots: currentSnapshots,
      recycleBin: currentRecycleBin,
    });

    save({ snapshot: false });
  }

  function pushRecycle(type, item, label) {
    s.recycleBin.unshift({
      id: Date.now(),
      type,
      item,
      label,
      deletedAt: Date.now(),
    });
    s.recycleBin = s.recycleBin.slice(0, 20);
  }

  function restoreDeleted(id) {
    const index = s.recycleBin.findIndex((x) => x.id === id);
    if (index < 0) return;

    const entry = s.recycleBin[index];

    if (entry.type === "note") s.notes.unshift(entry.item);
    if (entry.type === "fixLater") s.fixLater.unshift(entry.item);
    if (entry.type === "helpQueue") s.helpQueue.unshift(entry.item);

    s.recycleBin.splice(index, 1);
    save({ forceSnapshot: true });
    toast("Restored!");
    render();
  }

  function workshopBackupText() {
    const lines = [
      "GLAM WEBSITE WORKSHOP BACKUP",
      `Saved: ${new Date().toLocaleString()}`,
      "",
      "=== WEBSITE PLANNER ===",
    ];

    c.planner.fields.forEach(([key, label]) => {
      lines.push(`${label}: ${s.planner[key] || ""}`);
    });

    s.products.forEach((product, i) => {
      lines.push("", `=== PRODUCT ${i + 1} ===`);
      ["name", "price", "description", "image", "link"].forEach((key) => {
        lines.push(`${key}: ${product[key] || ""}`);
      });
    });

    lines.push("", "=== WORKSHOP PROGRESS ===");
    allLessons().forEach((lesson) => {
      lines.push(`${s.done.includes(lesson.id) ? "[DONE]" : "[ ]"} ${lesson.title}`);
    });

    lines.push("", "=== NOTES ===");
    if (s.notes.length) s.notes.forEach((note, i) => lines.push(`${i + 1}. ${note}`));
    else lines.push("No saved notes.");

    lines.push("", "=== FIX LATER ===");
    if (s.fixLater.length) s.fixLater.forEach((item, i) => lines.push(`${i + 1}. ${item.text}`));
    else lines.push("No Fix Later items.");

    lines.push("", "=== FINAL WEBSITE URL ===");
    lines.push(s.finalUrl || "Not saved yet.");

    return lines.join("\n");
  }

  function downloadWorkshopBackup() {
    const blob = new Blob([workshopBackupText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `website-workshop-backup-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast("Workshop backup downloaded!");
  }

  function toast(text) {
    const el = $("#toast");
    el.textContent = text;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 1800);
  }

  function allLessons() {
    return c.sessions.flatMap((session) => session.lessons);
  }

  function nextIncompletePage() {
    for (const session of c.sessions) {
      if (session.lessons.some((lesson) => !s.done.includes(lesson.id))) {
        return session.id;
      }
    }
    return "completion";
  }

  function progress() {
    const lessons = allLessons();
    const percent = lessons.length
      ? Math.round((s.done.length / lessons.length) * 100)
      : 0;
    $("#progressText").textContent = `${percent}% complete`;
    $("#progressBar").style.width = percent + "%";
  }

  function title(name, intro) {
    $("#pageTitle").textContent = name;
    $("#pageIntro").textContent = intro || "";
  }

  function cards(items) {
    return `<div class="grid">${items
      .map(
        (x) => `<article class="card">
          <span class="tag">${esc(x.tag || "")}</span>
          <h3>${esc(x.title)}</h3>
          <p>${esc(x.text || x.description || "")}</p>
          ${
            x.page
              ? `<div class="actions"><button class="primary go" data-page="${esc(x.page)}">Open</button></div>`
              : x.action === "continue"
                ? `<div class="actions"><button class="primary continue-action">Continue</button></div>`
                : x.url
                  ? `<div class="actions"><a class="button primary" href="${esc(x.url)}" target="_blank" rel="noopener">Open</a></div>`
                  : ""
          }
        </article>`,
      )
      .join("")}</div>`;
  }

  function generatedWebsitePrompt() {
    const p = s.planner;
    const productBlocks = s.products
      .map(
        (product, index) => `PRODUCT ${index + 1}
Name: ${product.name || "[PRODUCT NAME]"}
Price: ${product.price || "[PRICE]"}
Description: ${product.description || "[DESCRIPTION]"}
Button link: ${product.link || "[PAYHIP LINK]"}`,
      )
      .join("\n\n");

    return `Create a polished, beginner-friendly, one-page digital product website for my business.

BUSINESS INFORMATION
Business name: ${p.websiteName || "[BUSINESS NAME]"}
What I sell: ${p.productType || "[PRODUCT TYPE]"}
Audience: ${p.audience || "[AUDIENCE]"}
Primary result: ${p.result || "[RESULT]"}
Brand colors: ${p.brandColors || "[BRAND COLORS]"}
Visual style: ${p.visualStyle || "[THREE STYLE WORDS]"}

CREATE THESE SECTIONS IN THIS EXACT ORDER
1. Announcement bar
2. Header with business name or logo and simple navigation
3. Hero section with a strong headline, supporting copy, primary button, and hero image
4. Short moving marquee
5. Featured products section
6. Featured collection or product-highlight section
7. About section with image and text
8. Smooth testimonial or image carousel
9. Email signup section
10. Contact section
11. Optional promotional popup that is easy to close
12. Footer with contact information, social links, and copyright

HERO
Headline: ${p.heroHeadline || "[HERO HEADLINE]"}
Supporting sentence: ${p.heroSupport || "[HERO SUPPORTING COPY]"}
Primary button text: ${p.heroCta || "SHOP NOW"}
Primary button destination: ${p.heroLink || "[PRIMARY LINK]"}

${productBlocks}

ABOUT COPY
${p.about || "[ABOUT PARAGRAPH]"}

CONTACT INFORMATION
Email: ${p.contactEmail || "[EMAIL]"}
Social links: ${p.socialLinks || "[SOCIAL LINKS]"}
Email signup link: ${p.emailSignup || "[EMAIL SIGNUP LINK]"}

BUILD REQUIREMENTS
- Make the website easy for complete beginners and customers to navigate.
- Use clear visual hierarchy and generous spacing.
- Keep the page polished and professional, not cluttered.
- Make all buttons obvious and readable.
- Make the site responsive for desktop, tablet, and mobile.
- Preserve every product name, price, description, and URL exactly.
- Do not add fake reviews, fake statistics, fake awards, or invented business claims.
- Do not add unrelated sections.
- Use placeholders only where I have not supplied information.
- Create the complete first version before asking me questions.`;
  }

  function renderDashboard() {
    title(c.workshop.title, c.workshop.description);
    const next = nextIncompletePage();
    page.innerHTML = `
      <section class="hero-panel">
        <span class="hero-kicker">YOUR WORKSHOP HOME</span>
        <h2>${s.done.length ? "Keep building. Your next step is ready." : "Build your website one clear win at a time."}</h2>
        <p>${s.done.length} of ${allLessons().length} workshop wins complete.</p>
        <button class="primary continue-action">Continue Workshop</button>
      </section>
      ${cards(c.dashboardCards)}
    `;
  }

  function renderRequirements() {
    title(c.requirements.title, c.requirements.intro);
    let count = 0;
    page.innerHTML = c.requirements.sections
      .map((section) => {
        const items = section.items
          .map((item) => {
            const id = `req-${count++}`;
            return `<label class="check">
              <input type="checkbox" data-list="requirements" value="${id}" ${s.requirements.includes(id) ? "checked" : ""}>
              <span>${esc(item)}</span>
            </label>`;
          })
          .join("");
        return `<article class="card">
          <span class="tag">BEFORE CLASS</span>
          <h3>${esc(section.title)}</h3>
          ${items}
        </article>`;
      })
      .join("");
  }

  function renderPlanner() {
    title(c.planner.title, c.planner.intro);

    const fields = c.planner.fields
      .map(
        ([key, label]) => `<label class="field">
          <span>${esc(label)}</span>
          <textarea data-planner="${esc(key)}" rows="2">${esc(s.planner[key] || "")}</textarea>
        </label>`,
      )
      .join("");

    const products = Array.from({ length: c.planner.products }, (_, i) => {
      const p = s.products[i] || {};
      return `<article class="card product-planner">
        <span class="tag">PRODUCT ${i + 1}</span>
        ${["name", "price", "description", "image", "link"]
          .map(
            (key) => `<label class="field">
              <span>${esc(key[0].toUpperCase() + key.slice(1))}</span>
              <input data-product="${i}" data-product-key="${key}" value="${esc(p[key] || "")}">
            </label>`,
          )
          .join("")}
      </article>`;
    }).join("");

    page.innerHTML = `
      <article class="card planner-card">
        <h3>Business + Website Content</h3>
        ${fields}
      </article>

      <div class="grid">${products}</div>

      <article class="card prompt-output-card">
        <span class="tag">SMART PROMPT BUILDER</span>
        <h3>Your Website Prompt</h3>
        <p>This updates from your saved planner information.</p>
        <textarea id="generatedPrompt" readonly>${esc(generatedWebsitePrompt())}</textarea>
        <div class="actions">
          <button class="primary" id="copyGeneratedPrompt">Copy My Website Prompt</button>
          <button class="secondary" id="copyPlannerBackup">Copy Planner Backup</button>
        </div>
      </article>
    `;
  }

  function renderSession(session) {
    title(session.title, session.intro);

    const instructorPanel =
      s.view === "instructor"
        ? `<aside class="instructor-panel">
            <div class="instructor-badge">INSTRUCTOR VIEW</div>
            <div class="instructor-grid">
              <div><strong>Total</strong><span>${esc(session.instructor.total)}</span></div>
              <div><strong>Teach</strong><span>${esc(session.instructor.teach)}</span></div>
              <div><strong>Demonstrate</strong><span>${esc(session.instructor.demonstrate)}</span></div>
              <div><strong>Student Work</strong><span>${esc(session.instructor.studentWork)}</span></div>
              <div><strong>Checkpoint</strong><span>${esc(session.instructor.checkpoint)}</span></div>
            </div>
            <div class="instructor-note"><strong>Watch for:</strong> ${esc(session.instructor.watchFor)}</div>
            <div class="instructor-script"><strong>Say:</strong> “${esc(session.instructor.say)}”</div>
            <div class="instructor-note"><strong>Move on when:</strong> ${esc(session.instructor.moveOnWhen)}</div>
          </aside>`
        : "";

    const lessons = session.lessons
      .map((lesson) => {
        const prompt =
          lesson.generatedPrompt
            ? generatedWebsitePrompt()
            : lesson.prompt || "";

        const gates = (lesson.gate || [])
          .map(
            (item, i) => `<label class="check gate-check">
              <input type="checkbox" data-gate="${esc(lesson.id)}-${i}">
              <span>${esc(item)}</span>
            </label>`,
          )
          .join("");

        return `<article class="card lesson ${s.done.includes(lesson.id) ? "done" : ""}">
          <span class="tag">${esc(lesson.tag)}</span>
          <h3>${esc(lesson.title)}</h3>
          <p>${esc(lesson.instructions)}</p>

          ${
            prompt
              ? `<textarea class="lesson-prompt" readonly>${esc(prompt)}</textarea>
                 <div class="actions"><button class="primary copy-prompt">Copy Prompt</button></div>`
              : ""
          }

          <div class="checkpoint">
            <h4>Before You Continue</h4>
            ${gates}
            <button class="complete-gate primary" data-complete="${esc(lesson.id)}" disabled>
              I'm Ready for the Next Step
            </button>
          </div>
        </article>`;
      })
      .join("");

    page.innerHTML = instructorPanel + lessons;
    refreshGateButtons();
  }

  function refreshGateButtons() {
    page.querySelectorAll(".complete-gate").forEach((button) => {
      const card = button.closest(".lesson");
      const checks = [...card.querySelectorAll("[data-gate]")];
      button.disabled = !checks.length || !checks.every((x) => x.checked);
    });
  }

  function renderProgress() {
    title(
      "Your Progress",
      "You are finished when the meaningful workshop wins are complete—not when every design detail feels perfect.",
    );

    page.innerHTML = `<article class="card">
      <h3>Workshop Wins</h3>
      ${allLessons()
        .map(
          (lesson) => `<div class="progress-row ${s.done.includes(lesson.id) ? "complete-row" : ""}">
            <span>${s.done.includes(lesson.id) ? "✓" : "○"}</span>
            <strong>${esc(lesson.title)}</strong>
          </div>`,
        )
        .join("")}

      <hr>

      <label class="field">
        <span>Final published website URL</span>
        <input id="finalUrl" value="${esc(s.finalUrl || "")}" placeholder="https://...">
      </label>

      <div class="actions">
        <button class="primary" id="saveFinalUrl">Save Website URL</button>
        <button class="secondary" id="openFinalUrl" ${s.finalUrl ? "" : "disabled"}>Open Live Website</button>
        <button class="secondary" id="copyFinalUrl" ${s.finalUrl ? "" : "disabled"}>Copy URL</button>
      </div>

      <p id="finalUrlStatus">${s.finalUrl ? "✓ Website URL saved" : "Paste your published website URL above, then click Save Website URL."}</p>
    </article>`;
  }

  function renderFixLater() {
    title(
      "Fix Later",
      "Park anything that does not block the customer. Functional first. Pretty second.",
    );

    page.innerHTML = `
      <article class="card">
        <h3>Add Something to Fix Later</h3>
        <label class="field">
          <span>What do you want to improve later?</span>
          <textarea id="fixLaterText" placeholder="Example: Hero image feels too tall"></textarea>
        </label>
        <div class="actions">
          <button class="primary" id="addFixLater">Add to Fix Later</button>
        </div>
      </article>

      <div class="stack-list">
        ${
          s.fixLater.length
            ? s.fixLater
                .map(
                  (item, i) => `<article class="card list-card">
                    <span class="tag">FIX LATER</span>
                    <p>${esc(item.text)}</p>
                    <button class="secondary small-btn" data-fix-delete="${i}">Remove</button>
                  </article>`,
                )
                .join("")
            : `<article class="card empty-state"><p>Your Fix Later list is empty. Good—keep building.</p></article>`
        }
      </div>
    `;
  }

  function renderTroubleshooting() {
    title(
      "Troubleshooting",
      "Choose what is happening. The portal will show only the fix that applies.",
    );

    page.innerHTML = `
      <div class="issue-picker">
        ${c.troubleshooting
          .map(
            (item, i) => `<button class="issue-btn" data-issue="${i}">
              <span>${esc(item.category)}</span>
              <strong>${esc(item.problem)}</strong>
            </button>`,
          )
          .join("")}
      </div>

      <div id="issueAnswer"></div>
    `;
  }

  function renderIssue(index) {
    const item = c.troubleshooting[index];
    const answer = $("#issueAnswer");
    answer.innerHTML = `<article class="card trouble-answer">
      <span class="tag">${esc(item.classification)}</span>
      <h3>${esc(item.problem)}</h3>
      <h4>Check</h4>
      <ol>${item.checks.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
      <h4>Fix</h4>
      <p>${esc(item.fix)}</p>
      <h4>Workaround</h4>
      <p>${esc(item.workaround)}</p>
      <div class="actions">
        <button class="primary add-help-from-issue" data-issue="${index}">I Still Need Help</button>
        <button class="secondary add-fix-from-issue" data-issue="${index}">Add to Fix Later</button>
      </div>
    </article>`;
    bind();
  }

  function renderHelpQueue() {
    title(
      "Help Queue",
      s.view === "instructor"
        ? "Instructor view: blockers first, cosmetic issues last."
        : "Add your issue here if you need Glam to help during the live workshop.",
    );

    page.innerHTML = `
      <article class="card">
        <h3>Add a Help Request</h3>
        <label class="field">
          <span>Your name</span>
          <input id="helpName" placeholder="First name">
        </label>
        <label class="field">
          <span>What is happening?</span>
          <textarea id="helpProblem" placeholder="Describe the exact problem"></textarea>
        </label>
        <label class="field">
          <span>Priority</span>
          <select id="helpPriority">
            <option value="Blocker">Blocker — I cannot continue</option>
            <option value="Workaround">Workaround — I can keep going</option>
            <option value="Fix Later">Fix Later — cosmetic only</option>
          </select>
        </label>
        <div class="actions">
          <button class="primary" id="addHelpRequest">Add Me to the Queue</button>
        </div>
      </article>

      <div class="stack-list">
        ${
          s.helpQueue.length
            ? [...s.helpQueue]
                .sort((a, b) => {
                  const rank = { Blocker: 0, Workaround: 1, "Fix Later": 2 };
                  return rank[a.priority] - rank[b.priority];
                })
                .map(
                  (item) => `<article class="card help-card">
                    <span class="tag">${esc(item.priority)}</span>
                    <h3>${esc(item.name || "Student")}</h3>
                    <p>${esc(item.problem)}</p>
                    ${
                      s.view === "instructor"
                        ? `<button class="secondary small-btn" data-help-delete="${item.id}">Resolved</button>`
                        : ""
                    }
                  </article>`,
                )
                .join("")
            : `<article class="card empty-state"><p>No one is waiting for help.</p></article>`
        }
      </div>
    `;
  }

  function renderRecovery() {
    title(
      "Recovery Center",
      "Restore recent workshop versions, undo deleted items, or download a backup of your work.",
    );

    const snapshots = s.recoverySnapshots.length
      ? s.recoverySnapshots
          .map((snap, i) => {
            const when = new Date(snap.savedAt).toLocaleString();
            return `<article class="card recovery-card">
              <span class="tag">RECOVERY VERSION</span>
              <h3>${esc(i === 0 ? "Most Recent Snapshot" : `Previous Snapshot ${i + 1}`)}</h3>
              <p>Saved ${esc(when)}</p>
              <div class="actions">
                <button class="secondary restore-snapshot" data-snapshot="${i}">Restore This Version</button>
              </div>
            </article>`;
          })
          .join("")
      : `<article class="card empty-state">
          <p>No recovery snapshots yet. The portal creates them automatically as you work.</p>
        </article>`;

    const deleted = s.recycleBin.length
      ? s.recycleBin
          .map((entry) => `<article class="card deleted-card">
            <span class="tag">RECENTLY DELETED</span>
            <h3>${esc(entry.label || "Deleted item")}</h3>
            <p>Deleted ${esc(new Date(entry.deletedAt).toLocaleString())}</p>
            <div class="actions">
              <button class="secondary restore-deleted" data-restore-delete="${entry.id}">Undo Delete</button>
            </div>
          </article>`)
          .join("")
      : `<article class="card empty-state"><p>Nothing has been deleted recently.</p></article>`;

    page.innerHTML = `
      <section class="hero-panel recovery-hero">
        <span class="hero-kicker">STUDENT SAFETY</span>
        <h2>Your work has a safety net.</h2>
        <p>The portal keeps recent browser-based recovery snapshots. You can also download your own backup file at any time.</p>
        <div class="actions">
          <button class="primary" id="createSnapshot">Save Recovery Point Now</button>
          <button class="secondary" id="downloadBackup">Download My Workshop Backup</button>
        </div>
      </section>

      <div class="recovery-grid">
        <div>
          <h2 class="section-title">Recent Versions</h2>
          ${snapshots}
        </div>

        <div>
          <h2 class="section-title">Recently Deleted</h2>
          ${deleted}
        </div>
      </div>

      <article class="card recovery-note">
        <h3>Important</h3>
        <p>Recovery snapshots are saved in this browser on this device. If you switch browsers, use another computer, clear browser data, or use private/incognito mode, those browser saves may not be available. Download a workshop backup for an extra copy you control.</p>
      </article>
    `;
  }

  function renderResources() {
    title("Tools & Resources", "Everything needed for this workshop in one place.");
    page.innerHTML = cards(c.resources);
  }

  function renderNotes() {
    title("Notebook", "Save workshop notes in this browser.");
    page.innerHTML = `<article class="card">
      <textarea id="note" placeholder="Type your note here..."></textarea>
      <div class="actions"><button class="primary" id="saveNote">Save Note</button></div>
      <div class="note-list">
        ${s.notes
          .map(
            (note, i) => `<div class="saved-note">
              <button data-note-delete="${i}">×</button>${esc(note)}
            </div>`,
          )
          .join("")}
      </div>
    </article>`;
  }

  function renderHelp() {
    title("Quick Help", "Simple answers when students get stuck.");
    page.innerHTML = cards(c.help);
  }

  function renderNextSteps() {
    title(c.nextSteps.title, c.nextSteps.intro);
    page.innerHTML = cards(
      c.nextSteps.sections.map(([title, text]) => ({ title, text })),
    );
  }

  function renderCompletion() {
    const complete = s.done.length === allLessons().length && allLessons().length;
    title(
      c.completion.title,
      complete ? c.completion.message : "Finish every workshop win to unlock completion.",
    );
    page.innerHTML = `<article class="card completion-card">
      <span class="tag">${complete ? "WORKSHOP COMPLETE" : "KEEP GOING"}</span>
      <h3>${complete ? "You built and published your website." : "Your next win is waiting."}</h3>
      <p>${complete ? esc(c.completion.message) : `${s.done.length} of ${allLessons().length} workshop wins complete.`}</p>
      ${
        complete
          ? `<a class="button primary" href="${esc(c.completion.diplomaUrl)}">${esc(c.completion.buttonText)}</a>`
          : `<button class="primary continue-action">Continue Workshop</button>`
      }
    </article>`;
  }

  function render() {
    document.querySelectorAll(".nav-btn").forEach((button) =>
      button.classList.toggle("active", button.dataset.page === current),
    );

    if (current === "dashboard") renderDashboard();
    else if (current === "requirements") renderRequirements();
    else if (current === "planner") renderPlanner();
    else if (c.sessions.some((x) => x.id === current))
      renderSession(c.sessions.find((x) => x.id === current));
    else if (current === "progress-page") renderProgress();
    else if (current === "fix-later") renderFixLater();
    else if (current === "troubleshooting") renderTroubleshooting();
    else if (current === "help-queue") renderHelpQueue();
    else if (current === "recovery") renderRecovery();
    else if (current === "resources") renderResources();
    else if (current === "notes") renderNotes();
    else if (current === "help") renderHelp();
    else if (current === "next-steps") renderNextSteps();
    else renderCompletion();

    bind();
  }

  function plannerBackup() {
    const lines = ["WEBSITE WORKSHOP PLANNER", ""];
    c.planner.fields.forEach(([key, label]) => {
      lines.push(`${label}: ${s.planner[key] || ""}`);
    });
    s.products.forEach((product, i) => {
      lines.push("", `PRODUCT ${i + 1}`);
      ["name", "price", "description", "image", "link"].forEach((key) => {
        lines.push(`${key}: ${product[key] || ""}`);
      });
    });
    if (s.finalUrl) lines.push("", `Published website URL: ${s.finalUrl}`);
    return lines.join("\n");
  }

  function setView(view) {
    s.view = view;
    save();

    $("#studentViewBtn").classList.toggle("active", view === "student");
    $("#instructorViewBtn").classList.toggle("active", view === "instructor");

    render();
  }

  function bind() {
    page.querySelectorAll(".go").forEach(
      (button) => (button.onclick = () => go(button.dataset.page)),
    );

    page.querySelectorAll(".continue-action").forEach(
      (button) => (button.onclick = () => go(nextIncompletePage())),
    );

    page.querySelectorAll(".copy-prompt").forEach((button) => {
      button.onclick = async () => {
        const text = button.closest(".lesson").querySelector("textarea").value;
        await navigator.clipboard.writeText(text);
        toast("Prompt copied!");
      };
    });

    page.querySelectorAll("[data-gate]").forEach((check) => {
      check.onchange = refreshGateButtons;
    });

    page.querySelectorAll(".complete-gate").forEach((button) => {
      button.onclick = () => {
        const id = button.dataset.complete;
        if (!s.done.includes(id)) s.done.push(id);
        save();
        toast("Workshop win complete!");
        go(nextIncompletePage());
      };
    });

    page.querySelectorAll("[data-list]").forEach((check) => {
      check.onchange = () => {
        const key = check.dataset.list;
        s[key] = check.checked
          ? [...new Set([...s[key], check.value])]
          : s[key].filter((x) => x !== check.value);
        save();
      };
    });

    page.querySelectorAll("[data-planner]").forEach((input) => {
      input.oninput = () => {
        s.planner[input.dataset.planner] = input.value;
        save();
        const generated = $("#generatedPrompt");
        if (generated) generated.value = generatedWebsitePrompt();
      };
    });

    page.querySelectorAll("[data-product]").forEach((input) => {
      input.oninput = () => {
        const index = +input.dataset.product;
        s.products[index] = s.products[index] || {};
        s.products[index][input.dataset.productKey] = input.value;
        save();
        const generated = $("#generatedPrompt");
        if (generated) generated.value = generatedWebsitePrompt();
      };
    });

    const copyGeneratedPrompt = $("#copyGeneratedPrompt");
    if (copyGeneratedPrompt) {
      copyGeneratedPrompt.onclick = async () => {
        await navigator.clipboard.writeText(generatedWebsitePrompt());
        toast("Website prompt copied!");
      };
    }

    const copyPlannerBackup = $("#copyPlannerBackup");
    if (copyPlannerBackup) {
      copyPlannerBackup.onclick = async () => {
        await navigator.clipboard.writeText(plannerBackup());
        toast("Planner backup copied!");
      };
    }

    const finalUrl = $("#finalUrl");
    const saveFinalUrl = $("#saveFinalUrl");
    const openFinalUrl = $("#openFinalUrl");
    const copyFinalUrl = $("#copyFinalUrl");

    if (saveFinalUrl && finalUrl) {
      saveFinalUrl.onclick = () => {
        let value = finalUrl.value.trim();

        if (!value) {
          return toast("Paste your published website URL first.");
        }

        if (!/^https?:\/\//i.test(value)) {
          value = "https://" + value;
          finalUrl.value = value;
        }

        try {
          new URL(value);
        } catch {
          return toast("That does not look like a complete website URL.");
        }

        s.finalUrl = value;
        save();

        const status = $("#finalUrlStatus");
        if (status) status.textContent = "✓ Website URL saved";

        if (openFinalUrl) openFinalUrl.disabled = false;
        if (copyFinalUrl) copyFinalUrl.disabled = false;

        toast("Website URL saved!");
      };
    }

    if (openFinalUrl) {
      openFinalUrl.onclick = () => {
        if (!s.finalUrl) return toast("Save your website URL first.");
        window.open(s.finalUrl, "_blank", "noopener,noreferrer");
      };
    }

    if (copyFinalUrl) {
      copyFinalUrl.onclick = async () => {
        if (!s.finalUrl) return toast("Save your website URL first.");
        await navigator.clipboard.writeText(s.finalUrl);
        toast("Website URL copied!");
      };
    }

    const addFixLater = $("#addFixLater");
    if (addFixLater) {
      addFixLater.onclick = () => {
        const text = $("#fixLaterText").value.trim();
        if (!text) return toast("Add the item you want to fix later.");
        s.fixLater.unshift({ text });
        save();
        render();
      };
    }

    page.querySelectorAll("[data-fix-delete]").forEach((button) => {
      button.onclick = () => {
        const index = +button.dataset.fixDelete;
        const item = s.fixLater[index];
        if (!item) return;
        if (!confirm("Remove this Fix Later item? You can recover it from Recovery Center.")) return;
        pushRecycle("fixLater", item, item.text || "Fix Later item");
        s.fixLater.splice(index, 1);
        save({ forceSnapshot: true });
        toast("Removed. Undo is available in Recovery Center.");
        render();
      };
    });

    page.querySelectorAll(".issue-btn").forEach((button) => {
      button.onclick = () => renderIssue(+button.dataset.issue);
    });

    page.querySelectorAll(".add-help-from-issue").forEach((button) => {
      button.onclick = () => {
        const issue = c.troubleshooting[+button.dataset.issue];
        s.helpQueue.push({
          id: Date.now(),
          name: "Student",
          problem: issue.problem,
          priority: issue.classification.includes("Blocker")
            ? "Blocker"
            : "Workaround",
        });
        save();
        toast("Added to Help Queue");
      };
    });

    page.querySelectorAll(".add-fix-from-issue").forEach((button) => {
      button.onclick = () => {
        const issue = c.troubleshooting[+button.dataset.issue];
        s.fixLater.unshift({ text: issue.problem });
        save();
        toast("Added to Fix Later");
      };
    });

    const addHelpRequest = $("#addHelpRequest");
    if (addHelpRequest) {
      addHelpRequest.onclick = () => {
        const name = $("#helpName").value.trim();
        const problem = $("#helpProblem").value.trim();
        const priority = $("#helpPriority").value;
        if (!problem) return toast("Tell Glam what is happening.");
        s.helpQueue.push({
          id: Date.now(),
          name: name || "Student",
          problem,
          priority,
        });
        save();
        render();
      };
    }

    page.querySelectorAll("[data-help-delete]").forEach((button) => {
      button.onclick = () => {
        const id = +button.dataset.helpDelete;
        const item = s.helpQueue.find((x) => x.id === id);
        if (!item) return;
        if (!confirm("Mark this help request resolved? You can recover it from Recovery Center.")) return;
        pushRecycle("helpQueue", item, `${item.name || "Student"} — ${item.problem || "Help request"}`);
        s.helpQueue = s.helpQueue.filter((x) => x.id !== id);
        save({ forceSnapshot: true });
        toast("Resolved. Undo is available in Recovery Center.");
        render();
      };
    });

    const saveNote = $("#saveNote");
    if (saveNote) {
      saveNote.onclick = () => {
        const note = $("#note");
        if (!note.value.trim()) return toast("Type a note first.");
        s.notes.unshift(note.value.trim());
        save();
        render();
      };
    }

    page.querySelectorAll("[data-note-delete]").forEach((button) => {
      button.onclick = () => {
        const index = +button.dataset.noteDelete;
        const item = s.notes[index];
        if (item == null) return;
        if (!confirm("Delete this note? You can recover it from Recovery Center.")) return;
        pushRecycle("note", item, item.slice(0, 60) || "Note");
        s.notes.splice(index, 1);
        save({ forceSnapshot: true });
        toast("Deleted. Undo is available in Recovery Center.");
        render();
      };
    });

    const createSnapshot = $("#createSnapshot");
    if (createSnapshot) {
      createSnapshot.onclick = () => {
        createRecoverySnapshot(true);
        localStorage.setItem(c.workshop.storageKey, JSON.stringify(s));
        toast("Recovery point saved!");
        render();
      };
    }

    const downloadBackup = $("#downloadBackup");
    if (downloadBackup) {
      downloadBackup.onclick = downloadWorkshopBackup;
    }

    page.querySelectorAll(".restore-snapshot").forEach((button) => {
      button.onclick = () => {
        const snapshot = s.recoverySnapshots[+button.dataset.snapshot];
        if (!snapshot) return;
        if (!confirm("Restore this previous workshop version? Your current version will also remain in Recovery Center.")) return;
        createRecoverySnapshot(true);
        restoreSnapshot(snapshot);
        toast("Previous version restored!");
        render();
      };
    });

    page.querySelectorAll(".restore-deleted").forEach((button) => {
      button.onclick = () => restoreDeleted(+button.dataset.restoreDelete);
    });
  }

  function go(id) {
    current = id;
    render();
    document.querySelector("aside").classList.remove("open");
    scrollTo(0, 0);
  }

  function buildNav() {
    $("#nav").innerHTML = c.groups
      .map(
        (group) => `<div class="nav-group">
          <span class="nav-heading">${esc(group.label)}</span>
          ${group.pages
            .map(
              ([id, label]) =>
                `<button class="nav-btn" data-page="${esc(id)}">${esc(label)}</button>`,
            )
            .join("")}
        </div>`,
      )
      .join("");

    document.querySelectorAll(".nav-btn").forEach(
      (button) => (button.onclick = () => go(button.dataset.page)),
    );
  }

  function init() {
    document.title = c.workshop.title;
    $("#sideTitle").textContent = c.workshop.title;
    $("#eyebrow").textContent = c.workshop.eyebrow;

    buildNav();

    $("#studentViewBtn").onclick = () => setView("student");
    $("#instructorViewBtn").onclick = () => setView("instructor");
    $("#studentViewBtn").classList.toggle("active", s.view === "student");
    $("#instructorViewBtn").classList.toggle(
      "active",
      s.view === "instructor",
    );

    $("#continueBtn").onclick = () => go(nextIncompletePage());
    $("#menuBtn").onclick = () =>
      document.querySelector("aside").classList.toggle("open");

    if (!s.recoverySnapshots.length) {
      createRecoverySnapshot(true);
      localStorage.setItem(c.workshop.storageKey, JSON.stringify(s));
    }

    progress();
    render();
  }

  init();
})();