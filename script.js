
const CV_DATA = {
  name: "Alizah Umar Khan",
  gate: "ELEVATE",
  seat: "01A",
  className: "FIRST",

  title: "Aspiring Software Engineer · UI/UX Designer · Data Science Enthusiast",

  profile:
    "I'm an aspiring software engineer interested in product management and stakeholder experience. Creating technical and visually pleasing products is what motivates and inspires me. I love learning by reverse engineering expert processes and enjoy working with people with diverse backgrounds and expertise.",

  skills: [
    "UI/UX Design",
    "Requirements Gathering",
    "Stakeholder Management",
    "Data Analysis",
    "Usability Testing",
    "Technical Documentation",
    "User Research",
    "Agile Methodologies",
    "Sprint Planning",
  ],

  experience: [
    {
      title: "Tutoring & Mentoring | Student Support - 2025 - Ongoing",
      meta: "2025 — Ongoing",
      copy: "Planned and organised personalised tutoring and mentoring for a student of determination, establishing realistic academic benchmarks and adapting explanations to support examination success and subject understanding.."
    },
    {
      title: "Software Requirements, User Research & Agile Delivery | Team Software Project - 2025 -2026",
      meta: "2025-2026",
      copy: "Engaged with stakeholders to gather expectations and requirements, defined project scope and conducted usability testing to ensure product standards."
    },

    {
      title: "Solutions Architecture – Virtual Internship Experience | Forage",
      meta: "2026",
      copy: "Completed a virtual internship experience focused on solutions architecture, developing exposure to translating business requirements into technology solutions and considering architectural decisions."
    }
    
  ],

  projects: [
    {
      title: "Energy Production Prediction | Machine Learning / Data Project - 2026",
      meta: "Machine Learning / Data Science",
      copy: "Developed predictive models for energy production using Python, Pandas and MATLAB, analysing data to identify patterns and generate forecasts."
    },
    {
      title: "Java Concurrency & Multithreading System | Academic Project - 2026",
      meta: "Java / Software Engineering",
      copy: "Developed a Java-based concurrency and multithreading system to investigate operating-system concepts, resource management and performance optimisation."
    },
    {
      title: "AI Sudoku Solver | Academic Project -2025",
      meta: "Python / Artificial Intelligence",
      copy: "Designed and implemented an AI Sudoku solver using backtracking, pruning, and A* search, applying algorithmic problem-solving to navigate a constrained search space efficiently."
    },
    {
      title: "Database Architecture & Design | Academic Project - 2025",
      meta: "Database Design / SQL",
      copy: "Designed and implemented a relational database system using SQL, focusing on data integrity, normalization, and efficient query processing."
    }
  ],

  email: "alizahumar@gmail.com",
  website: "LinkedIn",
  websiteUrl: "https://www.linkedin.com/in/alizah-khan-8a310426b/",

  finalDate: "SEPTEMBER 21, 2026",
  finalDateStamp: "21 · 09 · 2026"
};


// ---------- Populate the live CV ----------

function renderCV(data) {
  document.getElementById("cvName").textContent = data.name.toUpperCase();
  document.getElementById("cvFullName").textContent = data.name;
  document.getElementById("cvGate").textContent = data.gate;
  document.getElementById("cvSeat").textContent = data.seat;
  document.getElementById("cvClass").textContent = data.className;
  document.getElementById("cvTitle").textContent = data.title;
  document.getElementById("cvProfile").textContent = data.profile;

  const skills = document.getElementById("cvSkills");
  skills.innerHTML = "";
  data.skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skills.appendChild(li);
  });

  const experience = document.getElementById("cvExperience");
  experience.innerHTML = "";
  data.experience.forEach(item => {
    experience.insertAdjacentHTML("beforeend", `
      <article class="experience-item">
        <div class="item-top">
          <div class="item-title">${escapeHTML(item.title)}</div>
          <div class="item-meta">${escapeHTML(item.meta)}</div>
        </div>
        <p class="item-copy">${escapeHTML(item.copy)}</p>
      </article>
    `);
  });

  const projects = document.getElementById("cvProjects");
  projects.innerHTML = "";
  data.projects.forEach(item => {
    projects.insertAdjacentHTML("beforeend", `
      <article class="project-item">
        <div class="item-title">${escapeHTML(item.title)}</div>
        <div class="item-meta">${escapeHTML(item.meta)}</div>
        <p class="item-copy">${escapeHTML(item.copy)}</p>
      </article>
    `);
  });

  const email = document.getElementById("cvEmail");
  email.textContent = data.email;
  email.href = `mailto:${data.email}`;

  const website = document.getElementById("cvWebsite");
  website.textContent = data.website;
  website.href = data.websiteUrl;

  document.getElementById("cvFinalDate").textContent = data.finalDate;
  document.getElementById("cvDateStamp").textContent = data.finalDateStamp;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// ---------- Scroll reveal + journey line ----------

let revealObserver = null;
let journeyFrame = null;

function setupCVMotion() {
  const cv = document.getElementById("cv");
  const journey = document.querySelector(".cv-journey");

  if (!cv || !journey) return;

  if (revealObserver) revealObserver.disconnect();

  const revealItems = cv.querySelectorAll("[data-reveal], .experience-item, .project-item");

  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    root: cv,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.12
  });

  revealItems.forEach(item => {
    item.setAttribute("data-reveal", "");
    revealObserver.observe(item);
  });

  const updateJourney = () => {
    journeyFrame = null;

    const maxScroll = Math.max(1, cv.scrollHeight - cv.clientHeight);
    const progress = Math.min(1, Math.max(0, cv.scrollTop / maxScroll));
    journey.style.setProperty("--journey-progress", progress.toFixed(4));
  };

  const requestJourneyUpdate = () => {
    if (journeyFrame !== null) return;
    journeyFrame = requestAnimationFrame(updateJourney);
  };

  if (cv._journeyScrollHandler) {
    cv.removeEventListener("scroll", cv._journeyScrollHandler);
  }

  cv._journeyScrollHandler = requestJourneyUpdate;
  cv.addEventListener("scroll", requestJourneyUpdate, { passive: true });
  updateJourney();
}

// ---------- Screen navigation ----------

const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });

  // The CV is its own scrolling surface.
  if (id === "cv") {
    const cv = document.getElementById("cv");
    cv.scrollTop = 0;
    setupCVMotion();
  }
}


// ---------- Opening sequence ----------

const INTRO_DURATION = 2600;

const introTimer = window.setTimeout(() => {
  showScreen("passport");
}, INTRO_DURATION);

document.getElementById("skipIntro").addEventListener("click", () => {
  window.clearTimeout(introTimer);
  showScreen("passport");
});


// ---------- Passport → portfolio passport ----------

const passportButton = document.getElementById("passportButton");

passportButton.addEventListener("click", () => {
  passportButton.classList.add("is-opening");

  window.setTimeout(() => {
    showScreen("portfolioPassport");
  }, 600);
});


// ---------- Portfolio passport → live CV ----------

const portfolioCardButton = document.getElementById("portfolioCardButton");

portfolioCardButton.addEventListener("click", () => {
  portfolioCardButton.classList.add("is-opening");

  window.setTimeout(() => {
    showScreen("cv");
  }, 650);
});


// ---------- Initialisation ----------

renderCV(CV_DATA);
setupCVMotion();
