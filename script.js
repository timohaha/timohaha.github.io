"use strict";
document.documentElement.classList.add("js");
const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#nav-links");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menu.addEventListener("click", () => {
  const expanded = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(expanded));
  navigation.classList.toggle("is-open", expanded);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia("(min-width: 801px)").addEventListener("change", closeMenu);
const filters = document.querySelector(".filters");
const groups = [...document.querySelectorAll("[data-category]")];
const summary = document.querySelector(".filter-summary");
function filterPublications(value, label) {
  let total = 0;
  groups.forEach((group) => {
    group.hidden = value !== "all" && group.dataset.category !== value;
    if (!group.hidden)
      total += group.querySelectorAll(".publication-item").length;
  });
  filters.querySelectorAll("button").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === value),
    );
  });
  summary.textContent = `${label} · ${total} 项成果`;
}
filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (button) filterPublications(button.dataset.filter, button.textContent);
});
filters.hidden = false;
filterPublications("all", "全部");
if ("IntersectionObserver" in window) {
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          if (link.hash === `#${entry.target.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
  );
  links.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  });
}
document.querySelector("#year").textContent = new Date().getFullYear();
