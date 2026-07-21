// small bits of interactivity for the page

// --- mobile menu toggle ---
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// close the menu after tapping a link (on phone)
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});


// --- contact form validation ---
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message").value.trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !msg) {
    note.textContent = "Please fill in your name, email and message.";
    note.className = "form-note err";
    return;
  }
  if (!emailOk) {
    note.textContent = "Hmm, that email doesn't look right.";
    note.className = "form-note err";
    return;
  }

  note.textContent = "Thanks " + name + "! We'll get back to you soon.";
  note.className = "form-note ok";
  form.reset();
});
