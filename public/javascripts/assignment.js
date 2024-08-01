// document.addEventListener('DOMContentLoaded', function() {

//   // Your JavaScript code here, including the assignment.js code
  
//   // Get all the assignment elements
//   var assignmentElements = document.getElementsByClassName('assignment');

//   // Calculate the total number of assignments
//   var totalAssignments = assignmentElements.length;

//   // Display the count at the top of the page
//   var assignmentCountElement = document.getElementById('assignment-count');
//   assignmentCountElement.textContent = 'Total Assignments: ' + totalAssignments;

//   function resizeIframe() {
//     var iframe = document.getElementById('assignment-frame');

//     // Check if the iframe element exists before trying to access its properties
//     if (iframe) {
//         iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
//     } else {
//         console.error("The iframe element with ID 'assignment-frame' was not found.");
//     }
// }

//   // Call the resizeIframe function when the content loads and on window resize
//   window.addEventListener('load', resizeIframe);
//   window.addEventListener('resize', resizeIframe);


// });
