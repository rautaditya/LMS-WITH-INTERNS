// document.addEventListener("DOMContentLoaded", function () {
//   const body = document.querySelector("body");
//   const modeToggle = body.querySelector(".mode-toggle");
//   const sidebar = body.querySelector("nav");
//   const sidebarToggle = body.querySelector(".sidebar-toggle");
//   document.getElementById("courseinfo").style.display = "none";
//   // document.getElementById("setExam").style.display = "none";
//   document.getElementById("set-Time").style.display = "none";
//   document.getElementById("Student-Test-Record").style.display = "none";
//   // Restore dark mode state from localStorage
//   let getMode = localStorage.getItem("mode");
//   if (getMode && getMode === "dark") {
//     body.classList.add("dark");
//   }

//   // Restore sidebar state from localStorage
//   let getStatus = localStorage.getItem("status");
//   if (getStatus && getStatus === "close") {
//     sidebar.classList.add("close");
//   }

//   modeToggle.addEventListener("click", () => {
//     body.classList.toggle("dark");
//     // Save dark mode state to localStorage
//     localStorage.setItem(
//       "mode",
//       body.classList.contains("dark") ? "dark" : "light"
//     );
//   });

//   sidebarToggle.addEventListener("click", () => {
//     sidebar.classList.toggle("close");
//     // Save sidebar state to localStorage
//     localStorage.setItem(
//       "status",
//       sidebar.classList.contains("close") ? "close" : "open"
//     );
//   });
// });

// function toggleSection(sectionId) {
//   // Hide all sections
//   document.querySelectorAll("section").forEach((section) => {
//     section.style.display = "none";
//   });

//   // Show the selected section
//   document.getElementById(sectionId).style.display = "block";
// }
// document.addEventListener("DOMContentLoaded", function () {
//   // ... (your existing code)

//   function toggleSection(sectionId) {
//     // Hide all sections
//     document
//       .querySelectorAll(".forthecoursessubsections > div")
//       .forEach((subsection) => {
//         subsection.style.display = "none";
//       });

//     // Show the selected section
//     const selectedSubsection = document.querySelector(
//       `.forthecoursessubsections > .${sectionId}-section`
//     );
//     if (selectedSubsection) {
//       selectedSubsection.style.display = "block";
//     }

//     // Disable the dashboard section if courseinfo is clicked
//     if (sectionId === "courseinfo") {
//       dashboardSection.style.pointerEvents = "none";
//     } else {
//       dashboardSection.style.pointerEvents = "auto";
//     }
//   }
// });

// // Function to toggle between dashboard and courses sections
// function toggleSection(sectionId) {
//   if (sectionId === "dashboard") {
//     document.getElementById("dashboard").style.display = "block";
//     document.getElementById("courseinfo").style.display = "none";
//     // document.getElementById("setExam").style.display = "none";
//     document.getElementById("set-Time").style.display = "none";
//     document.getElementById("Student-Test-Record").style.display = "none";
//   } else if (sectionId === "courseinfo") {
//     document.getElementById("dashboard").style.display = "none";
//     document.getElementById("courseinfo").style.display = "block";
//     // document.getElementById("setExam").style.display = "none";
//     document.getElementById("set-Time").style.display = "none";
//     document.getElementById("Student-Test-Record").style.display = "none";
//   } // else if (sectionId === "setExam") {
//   //   document.getElementById("dashboard").style.display = "none";
//   //   document.getElementById("courseinfo").style.display = "none";
//   //   document.getElementById("setExam").style.display = "block";
//   //   document.getElementById("set-Time").style.display = "none";
//   //   document.getElementById("Student-Test-Record").style.display = "none";
//   // }
//   else if (sectionId === "set-Time") {
//     document.getElementById("dashboard").style.display = "none";
//     document.getElementById("courseinfo").style.display = "none";
//     // document.getElementById("setExam").style.display = "none";
//     document.getElementById("Student-Test-Record").style.display = "none";
//     document.getElementById("set-Time").style.display = "block";
//   } else {
//     document.getElementById("dashboard").style.display = "none";
//     document.getElementById("courseinfo").style.display = "none";
//     // document.getElementById("setExam").style.display = "none";
//     document.getElementById("set-Time").style.display = "none";
//     document.getElementById("Student-Test-Record").style.display = "block";
//   }
// }

// // Attach click event listener to each box to toggle the corresponding course section
// document
//   .querySelector(".box1")
//   .addEventListener("click", () => toggleSection("addNewCourseSection"));
// document
//   .querySelector(".box2")
//   .addEventListener("click", () => toggleSection("editDeleteCourseSection"));
// document
//   .querySelector(".box3")
//   .addEventListener("click", () => toggleSection("allCoursesSection"));
const addcourserdiv = document.querySelector(".addcourserdiv");
const editcoursediv = document.querySelector(".editcoursediv");
const allcoursediv = document.querySelector(".allcoursediv");
const fortheaddcourse = document.querySelector(".fortheaddcourse");
const fortheeditcourse = document.querySelector(".fortheeditcourse");
const fortheallcourse = document.querySelector(".fortheallcourse");

function showDashboardSection() {
  fortheaddcourse.style.display = "block";
  fortheeditcourse.style.display = "none";
  fortheallcourse.style.display = "none";
}

addcourserdiv.addEventListener("click", function () {
  fortheaddcourse.style.display = "block";
  fortheeditcourse.style.display = "none";
  fortheallcourse.style.display = "none";
});

editcoursediv.addEventListener("click", function () {
  fortheeditcourse.style.display = "block";
  fortheaddcourse.style.display = "none";
  fortheallcourse.style.display = "none";
});

allcoursediv.addEventListener("click", function () {
  fortheallcourse.style.display = "block";
  fortheaddcourse.style.display = "none";
  fortheeditcourse.style.display = "none";
});

function toggleSection(sectionId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
      if (section.id === 'dashboard') {
          section.style.display = sectionId === 'dashboard' ? 'block' : 'none';
      } else {
          section.style.display = section.id === sectionId ? 'block' : 'none';
      }
  });
}

// Initially show only the dashboard
document.addEventListener('DOMContentLoaded', function() {
  toggleSection('dashboard');
});

document.addEventListener("DOMContentLoaded", function () {
  showDashboardSection(); // Show the dashboard section by default

  // Get all "Set Exam" buttons
  var setExamButtons = document.querySelectorAll(".set-exam-button");

  setExamButtons.forEach(function (button) {
    // Add click event listener to each button
    button.addEventListener("click", function () {
      // Get the corresponding course ID
      var courseId = this.getAttribute("data-course-id");
      // Toggle the visibility of the exam section
      var examSection = document.getElementById("setExamSection_" + courseId);
      examSection.style.display =
        examSection.style.display === "none" || examSection.style.display === ""
          ? "block"
          : "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const addVideosToggle = document.getElementById("addVideosToggle");
  const seeVideosToggle = document.getElementById("seeVideosToggle");
  const deleteVideosToggle = document.getElementById("deleteVideosToggle");

  const addVideosForm = document.getElementById("addVideosForm");
  const seeVideosContent = document.getElementById("seeVideosContent");
  const deleteVideosContent = document.getElementById("deleteVideosContent");

  // Show add videos form by default
  addVideosForm.style.display = "block";

  addVideosToggle.addEventListener("click", function() {
    addVideosForm.style.display = "block";
    seeVideosContent.style.display = "none";
    deleteVideosContent.style.display = "none";

    // Set active class for button
    addVideosToggle.classList.add("active");
    seeVideosToggle.classList.remove("active");
    deleteVideosToggle.classList.remove("active");
  });

  seeVideosToggle.addEventListener("click", function() {
    addVideosForm.style.display = "none";
    seeVideosContent.style.display = "block";
    deleteVideosContent.style.display = "none";

    // Set active class for button
    addVideosToggle.classList.remove("active");
    seeVideosToggle.classList.add("active");
    deleteVideosToggle.classList.remove("active");

    // Fetch and display videos when this button is clicked
    fetchVideos();
  });

  deleteVideosToggle.addEventListener("click", function() {
    addVideosForm.style.display = "none";
    seeVideosContent.style.display = "none";
    deleteVideosContent.style.display = "block";

    // Set active class for button
    addVideosToggle.classList.remove("active");
    seeVideosToggle.classList.remove("active");
    deleteVideosToggle.classList.add("active");
  });
});

function fetchVideos() {
  const courseId = document.getElementById("course").value;
  fetch(`/admin/videos/${courseId}`)
    .then(response => response.json())
    .then(videos => {
      const videosContainer = document.getElementById("videosContainer");
      videosContainer.innerHTML = '';
      videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
          <input type="checkbox" name="videoToDelete" value="${video._id}">
          <p>Title: ${video.title}</p>
          <video src="/videos/${video.filename}" controls></video>
        `;
        videosContainer.appendChild(videoElement);
      });
    })
    .catch(error => console.error('Error fetching videos:', error));
}

function deleteSelectedVideos() {
  const videosToDelete = document.querySelectorAll('input[name="videoToDelete"]:checked');
  const videoIds = Array.from(videosToDelete).map(video => video.value);
  fetch('/admin/videos/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ videoToDelete: videoIds })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
    // Optionally, update the UI to reflect the deletion
    fetchVideos(); // Refresh the video list
  })
  .catch(error => console.error('Error deleting videos:', error));
}

