/* =========================
POLICY CHECKBOX LOGIN ENABLE
========================= */
window.onload = function() {
  const policyCheck = document.getElementById("policyCheck");
  const loginButton = document.getElementById("loginButton");

  if (policyCheck && loginButton) {
    loginButton.disabled = true;

    policyCheck.addEventListener("change", function() {
      loginButton.disabled = !this.checked;
    });
  }
};

/* =========================
PAGE SWITCHING
========================= */
function showSignup() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("signupPage").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}

/* =========================
FIREBASE CONFIGURATION
========================= */
const firebaseConfig = {
  apiKey: "AIzaSyAkv_DvIsebBqaV4HcIzuSqJxhfjySATYg",
  authDomain: "unisphere-25.firebaseapp.com",
  projectId: "unisphere-25",
  storageBucket: "unisphere-25.appspot.com",
  messagingSenderId: "673455787578",
  appId: "1:673455787578:web:7d77141819dbe4ac85ef03",
  measurementId: "G-JHR3XK4D8Q"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/* =========================
SIGNUP SYSTEM
========================= */
function signup() {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!email || !password) {
    document.getElementById("signupMessage").innerText = "Please fill all fields";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      // Immediately sign out to prevent dashboard flashing
      auth.signOut().then(() => {
        document.getElementById("signupMessage").innerText = "Account created! Please log in.";
        showLogin();
      });
    })
    .catch(error => {
      document.getElementById("signupMessage").innerText = error.message;
    });
}

/* =========================
LOGIN SYSTEM
========================= */
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      document.getElementById("loginMessage").innerText = "";
      showDashboard(userCredential.user);
    })
    .catch(error => {
      document.getElementById("loginMessage").innerText = error.message;
    });
}

/* =========================
SHOW DASHBOARD
========================= */
function showDashboard(user) {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("welcomeUser").innerText = `Welcome, ${user.email}`;

  loadRegisteredEvents();
  loadAdminEvents();
}

/* =========================
LOGOUT
========================= */
function logout() {
  auth.signOut().then(() => {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
  });
}

/* =========================
PAGE NAVIGATION
========================= */
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

/* =========================
EVENT REGISTRATION
========================= */
function registerEvent(eventName, button) {
  let registeredEvents = JSON.parse(localStorage.getItem("registeredEvents")) || [];

  if (!registeredEvents.includes(eventName)) {
    registeredEvents.push(eventName);
    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
    button.innerText = "Registered";
    button.disabled = true;
  }

  loadRegisteredEvents();
}

/* =========================
LOAD USER REGISTERED EVENTS
========================= */
function loadRegisteredEvents() {
  const list = document.getElementById("registeredEvents");
  if (!list) return;

  list.innerHTML = "";

  const events = JSON.parse(localStorage.getItem("registeredEvents")) || [];
  events.forEach(event => {
    const li = document.createElement("li");
    li.innerText = event;
    list.appendChild(li);
  });
}

/* =========================
LOAD ADMIN EVENTS
========================= */
function loadAdminEvents() {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const container = document.getElementById("eventsContainer");

  if (!container) return;

  container.innerHTML = "";

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>${event.date}</p>
      <button onclick="registerEvent('${event.name}', this)">Register</button>
    `;

    container.appendChild(card);
  });
}

/* =========================
NOTIFICATIONS
========================= */
function toggleNotifications() {
  alert("Notifications toggled!");
}
