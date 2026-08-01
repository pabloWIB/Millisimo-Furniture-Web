/**
 * main.js — the only script on the site.
 *
 * Loaded as a classic deferred script rather than an ES module so the page
 * also works when index.html is opened straight from disk (file:// blocks
 * module imports). The whole file is wrapped in an IIFE, so nothing reaches
 * the global scope.
 */
(function () {
  "use strict";

  var DESKTOP = window.matchMedia("(min-width: 768px)");

  /**
   * Mobile menu: opens, closes, locks background scroll, closes on link click,
   * on Escape and when the viewport grows past the desktop breakpoint.
   */
  function initMenu() {
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.getElementById("site-menu");

    if (!toggle || !menu) {
      return;
    }

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.setAttribute("data-open", String(open));
      document.body.setAttribute("data-menu-open", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    function close(refocus) {
      if (toggle.getAttribute("aria-expanded") !== "true") {
        return;
      }
      setOpen(false);
      if (refocus) {
        toggle.focus();
      }
    }

    setOpen(false);

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
      if (!open) {
        var first = menu.querySelector("a");
        if (first) {
          first.focus();
        }
      }
    });

    // Delegated: one listener covers every link in the panel.
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        close(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        close(true);
      }
    });

    DESKTOP.addEventListener("change", function (event) {
      if (event.matches) {
        close(false);
      }
    });
  }

  /**
   * Marks the nav link matching the section currently in view, so the menu
   * reflects where the reader is.
   */
  function initCurrentSection() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav__link[href^="#"]')
    );

    if (!links.length || !("IntersectionObserver" in window)) {
      return;
    }

    var byId = {};
    var sections = [];

    links.forEach(function (link) {
      var section = document.getElementById(link.hash.slice(1));
      if (section) {
        byId[section.id] = link;
        sections.push(section);
      }
    });

    if (!sections.length) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = byId[entry.target.id];
          if (!link) {
            return;
          }
          if (entry.isIntersecting) {
            links.forEach(function (other) {
              other.removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  initMenu();
  initCurrentSection();
})();
