(function () {
  "use strict";

  document.querySelectorAll("[data-toggle='nav']").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var nav = document.getElementById("nav");
      if (nav) nav.classList.toggle("open");
    });
  });

  document.querySelectorAll(".alert.ok").forEach(function (el) {
    setTimeout(function () { el.style.transition = "opacity .6s"; el.style.opacity = "0"; }, 6000);
  });

  document.querySelectorAll("form[data-confirm]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      if (!window.confirm(form.getAttribute("data-confirm"))) ev.preventDefault();
    });
  });

  document.querySelectorAll("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () { window.print(); });
  });

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-copy"));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.textContent).then(function () {
        var old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = old; }, 1500);
      });
    });
  });

  document.querySelectorAll("[data-video]").forEach(function (figure) {
    var video = figure.querySelector("video");
    if (!video) return;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      video.autoplay = true;
      var started = video.play();
      if (started && started.catch) started.catch(function () {});
    }
    var button = figure.querySelector("[data-video-sound]");
    if (button) {
      button.addEventListener("click", function () {
        video.muted = false;
        video.currentTime = 0;
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () {});
      });
    }
  });

  var offerSelect = document.getElementById("offerCode");
  var tierSelect = document.getElementById("tierName");
  if (offerSelect && tierSelect) {
    var sync = function () {
      var selected = offerSelect.options[offerSelect.selectedIndex];
      var tiers = (selected && selected.getAttribute("data-tiers")) ? selected.getAttribute("data-tiers").split("|") : [];
      var current = tierSelect.value;
      tierSelect.innerHTML = "";
      var none = document.createElement("option");
      none.value = ""; none.textContent = tiers.length ? "Choose a tier" : "No tiers for this offer";
      tierSelect.appendChild(none);
      tiers.filter(Boolean).forEach(function (t) {
        var o = document.createElement("option");
        o.value = t; o.textContent = t; if (t === current) o.selected = true;
        tierSelect.appendChild(o);
      });
    };
    offerSelect.addEventListener("change", sync);
    sync();
  }
})();
