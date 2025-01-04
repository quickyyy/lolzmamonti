$(
  !("Market" in window) &&
    async function () {
      let e = "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/8.6.5",
        t = "{{CUSTOM_IMAGE_URL}}",
        n = {
          useContextAlpha: !1,
          antialias: !1,
          backgroundAlpha: 0,
          sharedLoader: !0,
        },
        i = document.createElement("div");
      Object.assign(i.style, {
        position: "absolute",
        inset: "0px",
        pointerEvents: "none",
        backfaceVisibility: "hidden",
        backgroundColor: "transparent",
      });
      let r = document.createElement("canvas");
      for (let e of (Object.assign(r.style, {
        position: "fixed",
        width: "100%",
        height: "100%",
        inset: "0px",
        opacity: "0.1",
      }),
      document.querySelectorAll('[id^="particles-js"]')))
        e?.remove();
      if (
        (i.appendChild(r),
        document.body.prepend(i),
        "transferControlToOffscreen" in r)
      ) {
        let i = new Blob(
            [
              `(${function () {
                self.onmessage = async function (e) {
                  if (e.data.type) return;
                  let {
                    pixiResourceUrl: t,
                    snowflakeTextureUrl: n,
                    pixiGraphicsOptions: i,
                    offscreenCanvas: r,
                    w: c,
                    h: h,
                    snowflakesCount: w,
                  } = e.data;
                  importScripts(`${t}/webworker.min.js`);
                  let {
                      Application: p,
                      Assets: f,
                      Sprite: u,
                      Container: g,
                    } = PIXI,
                    b = new p();
                  await b.init({
                    ...i,
                    width: c,
                    height: h,
                    view: r,
                    resizeTo: r,
                  });
                  let m = await f.load(n),
                    y = new g();
                  b.stage.addChild(y);
                  let k = new Float32Array(7 * w),
                    v = s(-0.06, -0.08),
                    x = b.screen.width,
                    j = b.screen.height;
                  for (let e = 0; e < w; e++) {
                    let t = 7 * e;
                    a({ snowflakeArray: k, w: x, h: j, idx: t });
                    let n = u.from(m);
                    o({ snowflakeArray: k, snowflake: n, idx: t }),
                      y.addChild(n);
                  }
                  let C = PIXI.Ticker.shared;
                  (C.maxFPS = 144),
                    C.add(() => {
                      if (!b || !b.screen) return;
                      let e = b.screen.width,
                        t = b.screen.height;
                      for (let n = 0; n < w; n++) {
                        let i = 7 * n;
                        l({
                          snowflakeArray: k,
                          snowflake: y.children[n],
                          w: e,
                          h: t,
                          idx: i,
                          wind: v,
                        });
                      }
                    }),
                    (self.onmessage = function (e) {
                      if (b && b.screen)
                        switch (e.data.type) {
                          case "pause":
                            C.stop();
                            break;
                          case "resume":
                            C.start();
                            break;
                          case "resize":
                            let { width: t, height: n } = e.data,
                              i = b.screen.width,
                              r = b.screen.height;
                            for (let e = 0; e < w; e++) {
                              let s = 7 * e;
                              d({
                                snowflakeArray: k,
                                snowflake: y.children[e],
                                w: i,
                                h: r,
                                width: t,
                                height: n,
                                idx: s,
                              });
                            }
                            b.renderer.resize(t, n);
                        }
                    });
                };
              }.toString()})();`,
              ...[s, a, o, l, d].map((e) => e.toString()),
            ],
            { type: "application/javascript" }
          ),
          c = URL.createObjectURL(i),
          h = new Worker(c),
          w = r.transferControlToOffscreen();
        URL.revokeObjectURL(c),
          h.postMessage(
            {
              pixiResourceUrl: e,
              snowflakeTextureUrl: t,
              pixiGraphicsOptions: n,
              offscreenCanvas: w,
              w: window.innerWidth,
              h: window.innerHeight,
              snowflakesCount: XenForo.isTouchBrowser() ? 60 : 280,
            },
            [w]
          ),
          window.addEventListener("resize", () => {
            h.postMessage({
              type: "resize",
              width: window.innerWidth,
              height: window.innerHeight,
            });
          });
        let p = () => "hidden" === document.visibilityState;
        document.addEventListener("visibilitychange", () => {
          h.postMessage({ type: p() ? "pause" : "resume" });
        }),
          h.postMessage({ type: p() ? "pause" : "resume" });
      } else {
        await XenForo.scriptLoader.loadScriptAsync(`${e}/pixi.min.js`);
        let { Application: i, Assets: c, Sprite: h, Container: w } = PIXI,
          p = new i();
        await p.init({ ...n, view: r, resizeTo: window });
        let f = await c.load(t),
          u = new w();
        p.stage.addChild(u);
        let g = XenForo.isTouchBrowser() ? 40 : 200,
          b = new Float32Array(7 * g),
          m = s(-0.06, -0.08),
          y = p.screen.width,
          k = p.screen.height;
        for (let e = 0; e < g; e++) {
          let t = 7 * e;
          a({ snowflakeArray: b, w: y, h: k, idx: t });
          let n = h.from(f);
          o({ snowflakeArray: b, snowflake: n, idx: t }), u.addChild(n);
        }
        let v = PIXI.Ticker.shared;
        (v.maxFPS = 120),
          v.add(() => {
            if (!p || !p.screen) return;
            let e = p.screen.width,
              t = p.screen.height;
            for (let n = 0; n < g; n++) {
              let i = 7 * n;
              l({
                snowflakeArray: b,
                snowflake: u.children[n],
                w: e,
                h: t,
                idx: i,
                wind: m,
              });
            }
          }),
          window.addEventListener("resize", () => {
            if (!p || !p.screen) return;
            let e = p.screen.width,
              t = p.screen.height,
              n = window.innerWidth,
              i = window.innerHeight;
            for (let r = 0; r < g; r++) {
              let s = 7 * r;
              d({
                snowflakeArray: b,
                snowflake: u.children[r],
                w: e,
                h: t,
                width: n,
                height: i,
                idx: s,
              });
            }
            p.renderer.resize(n, i);
          });
      }
      function s(e, t) {
        return Math.random() * (t - e) + e;
      }
      function a(e) {
        let { snowflakeArray: t, w: n, h: i, idx: r } = e;
        (t[r] = s(0, n)),
          (t[r + 1] = s(0, i)),
          (t[r + 2] = s(0.64, 0.84)),
          (t[r + 3] = s(0.4, 0.8)),
          (t[r + 4] = s(-0.02, 0.02)),
          (t[r + 5] = s(-0.2, 0.2)),
          (t[r + 6] = s(0, 2 * Math.PI));
      }
      function o(e) {
        let { snowflakeArray: t, snowflake: n, idx: i } = e;
        n.scale.set(s(0.74, 1)),
          (n.x = t[i]),
          (n.y = t[i + 1]),
          (n.speed = t[i + 2]),
          (n.alpha = t[i + 3]),
          (n.wobbleSpeed = t[i + 4]),
          (n.wobbleDistance = t[i + 5]),
          (n.wobbleAngle = t[i + 6]);
      }
      function l(e) {
        let {
          snowflakeArray: t,
          snowflake: n,
          w: i,
          h: r,
          idx: a,
          wind: o,
        } = e;
        (t[a + 6] += t[a + 4]),
          (t[a] += Math.sin(t[a + 6]) * t[a + 5] + o),
          (t[a + 1] += t[a + 2]),
          t[a + 1] > r &&
            ((t[a + 1] = -n.height),
            (t[a] = s(0, i)),
            (t[a + 3] = s(0.4, 0.8)),
            (t[a + 6] = s(0, 2 * Math.PI))),
          (n.x = t[a]),
          (n.y = t[a + 1]),
          (n.alpha = t[a + 3]),
          (n.wobbleAngle = t[a + 6]);
      }
      function d(e) {
        let {
          snowflakeArray: t,
          snowflake: n,
          w: i,
          h: r,
          width: s,
          height: a,
          idx: o,
        } = e;
        (t[o + 1] = (t[o + 1] / r) * a),
          (t[o] = (t[o] / i) * s),
          (n.x = t[o]),
          (n.y = t[o + 1]);
      }
    }
);
