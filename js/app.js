(() => {
  const c = window.WORKSHOP_SETTINGS,
    s = JSON.parse(
      localStorage.getItem(c.workshop.storageKey) || '{"done":[],"notes":[]}',
    );
  let current = "dashboard";
  const $ = (x) => document.querySelector(x),
    page = $("#page");
  function save() {
    localStorage.setItem(c.workshop.storageKey, JSON.stringify(s));
    progress();
  }
  function toast(t) {
    const e = $("#toast");
    e.textContent = t;
    e.classList.add("show");
    setTimeout(() => e.classList.remove("show"), 1800);
  }
  function allLessons() {
    return c.sessions.flatMap((x) => x.lessons);
  }
  function progress() {
    const total = allLessons().length,
      percent = total ? Math.round((s.done.length / total) * 100) : 0;
    $("#progressText").textContent = `${percent}% complete`;
    $("#progressBar").style.width = percent + "%";
  }
  function btn(text, cls = "primary") {
    return `<button class="${cls}">${text}</button>`;
  }
  function cards(items) {
    return `<div class="grid">${items
      .map(
        (x) =>
          `<article class="card"><span class="tag">${x.tag || ""}</span><h3>${x.title}</h3><p>${x.text || x.description || ""}</p>${
            x.page
              ? `<div class="actions"><button class="primary go" data-page="${x.page}">Open</button></div>`
              : x.url
                ? `<div class="actions"><a class="button primary" href="${x.url}" target="_blank">Open</a></div>`
                : ""
          }</article>`,
      )
      .join("")}</div>`;
  }
  function title(name, intro) {
    $("#pageTitle").textContent = name;
    $("#pageIntro").textContent = intro || "";
  }
  function render() {
    document
      .querySelectorAll(".nav-btn")
      .forEach((x) => x.classList.toggle("active", x.dataset.page === current));
    if (current === "dashboard") {
      title(c.workshop.title, c.workshop.description);
      page.innerHTML = cards(c.dashboardCards);
    } else if (current === "getting-started") {
      title(c.gettingStarted.title, c.gettingStarted.intro);
      page.innerHTML = cards(c.gettingStarted.cards);
    } else if (c.sessions.some((x) => x.id === current)) {
      const x = c.sessions.find((x) => x.id === current);
      title(x.title, x.intro);
      page.innerHTML = x.lessons
        .map(
          (l) =>
            `<article class="card lesson ${s.done.includes(l.id) ? "done" : ""}"><span class="tag">${l.tag}</span><h3>${l.title}</h3><p>${l.instructions}</p>${l.prompt ? `<textarea readonly>${l.prompt}</textarea><div class="actions">${btn("Copy Prompt")}</div>` : ""}<label class="check"><input type="checkbox" data-lesson="${l.id}" ${s.done.includes(l.id) ? "checked" : ""}> Mark this lesson complete</label></article>`,
        )
        .join("");
    } else if (current === "resources") {
      title("Tools & Resources", "Everything students need in one place.");
      page.innerHTML = cards(
        c.resources.map((x) => ({ ...x, text: x.description })),
      );

      page.querySelectorAll(".card").forEach((e, i) => {
        const resource = c.resources[i];
        const isPdf = resource.url.toLowerCase().endsWith(".pdf");

        e.insertAdjacentHTML(
          "beforeend",
          `<a class="resource-link"
        href="${resource.url}"
        ${isPdf ? "download" : 'target="_blank"'}
      >
        ${isPdf ? "Download Guide →" : "Open Resource →"}
      </a>`,
        );
      });
    } else if (current === "replays") {
      title("Replays", "Watch workshop sessions again.");
      page.innerHTML = cards(c.replays);
      page
        .querySelectorAll(".card")
        .forEach((e, i) =>
          e.insertAdjacentHTML(
            "beforeend",
            `<a class="resource-link" href="${c.replays[i].url}" target="_blank">Watch Replay →</a>`,
          ),
        );
    } else if (current === "notes") {
      title("Notebook", "Save workshop notes in this browser.");
      page.innerHTML = `<article class="card"><textarea id="note" placeholder="Type your note here..."></textarea><div class="actions">${btn("Save Note")}</div><div class="note-list">${s.notes.map((n, i) => `<div class="saved-note"><button data-delete="${i}">×</button>${n}</div>`).join("")}</div></article>`;
    } else if (current === "help") {
      title("Help Center", "Quick answers when students get stuck.");
      page.innerHTML = cards(
        c.help.map((x) => ({ title: x.title, text: x.text })),
      );
    } else {
      const complete =
        s.done.length === allLessons().length && allLessons().length;
      title(
        c.completion.title,
        complete
          ? c.completion.message
          : "Finish every lesson to unlock this area.",
      );
      page.innerHTML = `<article class="card"><h3>${complete ? "You’re finished!" : "Keep going"}</h3><p>${complete ? c.completion.message : `${s.done.length} of ${allLessons().length} lessons complete.`}</p>${complete ? `<a class="button primary" href="${c.completion.diplomaUrl}">${c.completion.buttonText}</a>` : ""}</article>`;
    }
    bind();
  }
  function bind() {
    page
      .querySelectorAll(".go")
      .forEach((b) => (b.onclick = () => go(b.dataset.page)));
    page.querySelectorAll(".lesson .primary").forEach(
      (b) =>
        (b.onclick = () => {
          navigator.clipboard.writeText(
            b.closest(".lesson").querySelector("textarea").value,
          );
          toast("Prompt copied!");
        }),
    );
    page.querySelectorAll("[data-lesson]").forEach(
      (b) =>
        (b.onchange = () => {
          s.done = b.checked
            ? [...new Set([...s.done, b.dataset.lesson])]
            : s.done.filter((x) => x !== b.dataset.lesson);
          save();
          render();
        }),
    );
    const note = $("#note");
    if (note)
      note.nextElementSibling.querySelector("button").onclick = () => {
        if (!note.value.trim()) return toast("Type a note first.");
        s.notes.unshift(note.value.trim());
        save();
        render();
      };
    page.querySelectorAll("[data-delete]").forEach(
      (b) =>
        (b.onclick = () => {
          s.notes.splice(+b.dataset.delete, 1);
          save();
          render();
        }),
    );
  }
  function go(id) {
    current = id;
    render();
    document.querySelector("aside").classList.remove("open");
    scrollTo(0, 0);
  }
  function init() {
    document.title = c.workshop.title;
    $("#sideTitle").textContent = c.workshop.title;
    $("#eyebrow").textContent = c.workshop.eyebrow;
    const nav = [
      ["dashboard", "Dashboard"],
      ["getting-started", "Getting Started"],
      ...c.sessions.map((x) => [x.id, x.title]),
      ["resources", "Tools & Resources"],
      ["notes", "Notebook"],
      ["replays", "Replays"],
      ["help", "Help Center"],
      ["completion", "Completion"],
    ];
    $("#nav").innerHTML = nav
      .map(
        (x) => `<button class="nav-btn" data-page="${x[0]}">${x[1]}</button>`,
      )
      .join("");
    document
      .querySelectorAll(".nav-btn")
      .forEach((b) => (b.onclick = () => go(b.dataset.page)));
    $("#menuBtn").onclick = () =>
      document.querySelector("aside").classList.toggle("open");
    progress();
    render();
  }
  init();
})();
