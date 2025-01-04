$(async function () {
  await XenForo.scriptLoader.loadScriptAsync(
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
  );
  let e = document.createElement("style");
  (e.innerHTML = `
    .new_year_clickable_2025 {
        background-image: linear-gradient(90deg,{{CUSTOM_COLOR_1}}, {{CUSTOM_COLOR_2}}), linear-gradient(90deg, {{CUSTOM_COLOR_3}}, {{CUSTOM_COLOR_4}});
        background-size: 200% 100%;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        cursor: pointer;
        font-weight: bold;
    }
`),
    document.head.appendChild(e);
  let t = 0;
  function n(e) {
    let n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      r = Date.now();
    if (r - t < 60) return;
    t = r;
    let o = e.getBoundingClientRect();
    confetti({
      particleCount: n ? u(50, 100) : 30,
      spread: n ? u(50, 70) : void 0,
      angle: n ? u(55, 125) : void 0,
      origin: {
        x: (o.left + o.width / 2) / window.innerWidth,
        y: (o.top - 10) / window.innerHeight,
      },
    });
  }
  function r(e) {
    e.addEventListener(
      "click",
      () => {
        e.disabled || e.classList.contains("disabled") || n(e);
      },
      { capture: !0 }
    );
  }
  function o(e) {
    let t = e.closest(".message");
    if (!t) return;
    let n = t.querySelector(".avatar img")?.getAttribute("alt");
    if ((n || (n = t.querySelector(".username span")?.textContent), !n)) {
      console.error("onNodeNewYearHat2025(...): username not found");
      return;
    }
    let r = new Date(),
      o = `${n}-${r.getUTCDay()}-${r.getUTCHours()}`,
      a = [
        e.querySelector(".new_year_hat_color_one"),
        e.querySelector(".new_year_hat_color_five"),
      ],
      l = 0;
    for (let e = 0; e < o.length; e++) l = o.charCodeAt(e) + ((l << 5) - l);
    let i = Math.abs(l) % 360,
      s = 70 + (Math.abs(l) % 10),
      d = 50 + (Math.abs(l) % 10);
    for (let e of a) e.setAttribute("fill", `hsl(${i}, ${s}%, ${d}%)`);
    c(t);
  }
  let a = {{CUSTOM_WORD_LIST}},
    l = RegExp(
      `(?:^|(?<=[\\s\\u2060-\\u206F]))(${a.join("|")})(?=$|\\s|[.,!?)])`,
      "gmi"
    ),
    i = [
      ".new_year_clickable_2025",
      ".SpoilerTitle",
      ".internalLink",
      ".externalLink",
      ".bbCodeCode",
      ".username",
      ".unfurl_title",
    ];
  function c(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = t
        ? e.querySelector(".message-text")
        : e.querySelector(".messageText");
    if (!n) return;
    let r = document.createTreeWalker(n, NodeFilter.SHOW_TEXT, null),
      o = [];
    for (; r.nextNode(); ) o.push(r.currentNode);
    for (let e of o) {
      let t = e.parentNode;
      if (i.some((e) => t.closest(e))) continue;
      let n = e.nodeValue;
      if (!n.match(l)) continue;
      let r = document.createDocumentFragment();
      for (let e of n.split(l)) {
        if (!a.includes(e.toLowerCase())) {
          r.appendChild(document.createTextNode(e));
          continue;
        }
        let t = document.createElement("span");
        (t.className = "new_year_clickable_2025"),
          (t.textContent = e),
          r.appendChild(t);
      }
      t.replaceChild(r, e);
    }
  }
  for (let { selector: e, handler: t } of [
    { selector: ".button.primary", handler: r },
    { selector: ".new_year_hat_2025", handler: o },
    { selector: '[id^="profile-post"]', handler: (e) => c(e, !0) },
  ])
    document.querySelectorAll(e).forEach(t);
  let s = new MutationObserver((e) => {
      for (let t of e)
        if ("childList" === t.type) {
          for (let e of t.addedNodes)
            if (e.nodeType === Node.ELEMENT_NODE) {
              if (e.matches(".button.primary")) r(e);
              else if (e.matches(".conversationMessages.scroll-content"))
                for (let t of e.querySelectorAll(".new_year_hat_2025")) o(t);
              else
                e.matches(".message-block") || e.matches(".message")
                  ? o(e.querySelector(".new_year_hat_2025"))
                  : e.matches('[id^="profile-post"]') && c(e, !0);
            }
        }
    }),
    d = (e) => {
      e.preventDefault();
    };
  function u(e, t) {
    return Math.random() * (t - e) + e;
  }
  document.addEventListener("click", (e) => {
    let t = e.target;
    t.classList.contains("new_year_clickable_2025") &&
      (t.removeEventListener("selectstart", d),
      t.addEventListener("selectstart", d),
      n(t, !0));
  }),
    s.observe(document.body, { childList: !0, subtree: !0 });
});
