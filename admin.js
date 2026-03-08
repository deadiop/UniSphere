function addEvent(){

const name=document.getElementById("eventName").value;
const date=document.getElementById("eventDate").value;

let events=JSON.parse(localStorage.getItem("events")) || [];

events.push({name,date});

localStorage.setItem("events",JSON.stringify(events));

alert("Event added");

}


function sendNotification(){

const text=document.getElementById("notificationText").value;

let notifications=JSON.parse(localStorage.getItem("notifications")) || [];

notifications.push(text);

localStorage.setItem("notifications",JSON.stringify(notifications));

alert("Notification sent");

}


function addFaculty(){

const name=document.getElementById("facultyName").value;
const dept=document.getElementById("facultyDept").value;

let faculty=JSON.parse(localStorage.getItem("faculty")) || [];

faculty.push({name,dept});

localStorage.setItem("faculty",JSON.stringify(faculty));

alert("Faculty added");

}
