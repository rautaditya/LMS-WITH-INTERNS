document.addEventListener('DOMContentLoaded', function() {
  // Your JavaScript code here, including the assignment.js code
  const navLinksss = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

// Initially, hide all sections except "My Profile"
sections.forEach((section) => {
  if (section.id === "explorepage") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
});

navLinksss.forEach((link) => {
  link.addEventListener("click", showSection);
});

// Show the selected section and hide others
function showSection(event) {
  const targetId = event.target.getAttribute("data-target");
  const targetSection = document.getElementById(targetId);

  sections.forEach((section) => {
    section.style.display = "none";
  });

  targetSection.style.display = "block";
}

//for sli
//for sli
const enrollbtnList = document.getElementsByClassName("enrollbtn");

for (const enrollbtn of enrollbtnList) {
    enrollbtn.addEventListener('click', function () {
        alert("hello");
    });
}


});
