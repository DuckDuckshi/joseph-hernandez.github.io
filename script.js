// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // close on click
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
document.querySelector("#year").textContent = String(new Date().getFullYear());

// Demo "send"
const btn = document.querySelector("#demoSend");
const status = document.querySelector("#demoStatus");
if (btn && status) {
  btn.addEventListener("click", () => {
    status.textContent = "This form is a demo (not wired to email yet). If you want, I can add a real form that sends to your email.";
    setTimeout(() => (status.textContent = ""), 6000);
  });
}

// Simple modal system for project placeholders
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");

const modalContent = {
  greenhouse: {
    title: "Self-Sustaining Greenhouse System",
    body: `
      <p>Add:</p>
      <ul>
        <li>1–3 photos of the build</li>
        <li>Pinout + block diagram (STM32, sensors, pump/fan/actuators)</li>
        <li>Short “How it works” + results</li>
        <li>GitHub link (optional)</li>
      </ul>
    `
  },
  audio: {
    title: "Custom Audio Device — Headphone Amplifier",
    body: `
      <p>Add:</p>
      <ul>
        <li>Schematic screenshots + PCB layout</li>
        <li>Bill of materials (OP27 + transistors)</li>
        <li>Test notes (noise, gain, load, power)</li>
      </ul>
    `
  },
  metered: {
    title: "Metered Power Outlet",
    body: `
      <p>Add:</p>
      <ul>
        <li>System block diagram (sensing, control, web/app)</li>
        <li>Validation screenshots (LTspice / KiCad)</li>
        <li>Dashboard screenshots</li>
        <li>Top results + what you’d improve next</li>
      </ul>
    `
  }
};

document.querySelectorAll("[data-modal]").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const key = el.getAttribute("data-modal");
    const content = modalContent[key];
    if (!modal || !content) return;

    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    modal.showModal();
  });
});

document.querySelectorAll("[data-close]").forEach(el => {
  el.addEventListener("click", () => modal?.close());
});

if (modal) {
  modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
    if (!isInDialog) modal.close();
  });
}
