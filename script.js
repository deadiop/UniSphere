alert("JS is running");
/* =========================
POLICY CHECKBOX LOGIN ENABLE
========================= */

window.onload = function(){

const policyCheck = document.getElementById("policyCheck");
const loginButton = document.getElementById("loginButton");

if(policyCheck && loginButton){

loginButton.disabled = true;

policyCheck.addEventListener("change", function(){
loginButton.disabled = !this.checked;
});

}

}

/* =========================
PAGE SWITCHING
========================= */

function showSignup(){

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("signupPage").classList.remove("hidden");

}

function showLogin(){

document.getElementById("signupPage").classList.add("hidden");
document.getElementById("loginPage").classList.remove("hidden");

}

/* =========================
SIGNUP SYSTEM
========================= */

function signup(){

const username = document.getElementById("newUsername").value.trim();
const email = document.getElementById("newEmail").value.trim();
const password = document.getElementById("newPassword").value.trim();

if(!username || !email || !password){
alert("Please fill all fields");
return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

const userExists = users.find(user => user.username === username);

if(userExists){
alert("Username already exists");
return;
}

const newUser = {
username: username,
email: email,
password: password
};

users.push(newUser);

localStorage.setItem("users", JSON.stringify(users));

alert("Account created successfully!");

showLogin();

}

/* =========================
LOGIN SYSTEM
========================= */

function login(){

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();

const users = JSON.parse(localStorage.getItem("users")) || [];

const validUser = users.find(user =>
user.username === username && user.password === password
);

if(validUser){

localStorage.setItem("currentUser", username);

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("dashboard").classList.remove("hidden");

document.getElementById("welcomeUser").innerText = "Welcome, " + validUser.username;

loadAdminEvents();
loadRegisteredEvents();

}else{

alert("Invalid login");

}

}

/* =========================
LOGOUT
========================= */

function logout(){

localStorage.removeItem("currentUser");

location.reload();

}

/* =========================
PAGE NAVIGATION
========================= */

function showPage(page){

document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

document.getElementById(page).classList.add("active");

}

/* =========================
EVENT REGISTRATION
========================= */

function registerEvent(eventName, button){

let registeredEvents = JSON.parse(localStorage.getItem("registeredEvents")) || [];

if(!registeredEvents.includes(eventName)){

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

function loadRegisteredEvents(){

const list = document.getElementById("registeredEvents");

if(!list) return;

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

function loadAdminEvents(){

const events = JSON.parse(localStorage.getItem("events")) || [];

const container = document.getElementById("eventsContainer");

if(!container) return;

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
