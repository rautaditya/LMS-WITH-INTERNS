let toggle = document.getElementById("toggle");
let cal = document.getElementById("cal");
let element = document.querySelector(".mainpageall");
let myScheduleall = document.querySelector(".mainpageall ");
let myScheduleidnav = document.getElementById("mySchedule");
let footerAll = document.getElementById("footerall");
document.querySelector(".calendar-container").style.display = "none";
myScheduleall.style.display = "none";

myScheduleidnav.addEventListener("click", () => {
  myScheduleall.style.display = "block";
  /* Footer of index.html which is alredy create  */
  footerAll.style.display = "none";
});
toggle.addEventListener("click", () => {
  document.querySelector(".upcomingPastBlock").style.display = "block";
  document.querySelector(".calendar-container").style.display = "none";
  document.querySelector(".MyScheduletoggle ").style.backgroundColor =
    " #ff8453";
  document.querySelector(".MyScheduleCal ").style.backgroundColor = " #fff";
});

cal.addEventListener("click", () => {
  document.querySelector(".calendar-container").style.display = "block";
  document.querySelector(".upcomingPastBlock").style.display = "none";
  document.querySelector(".MyScheduletoggle ").style.backgroundColor = " #fff";
  document.querySelector(".MyScheduleCal ").style.backgroundColor = " #ff8453";
});

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currdate = document.querySelector(".calendar-current-date");

const prenexIcons = document.querySelectorAll(".calendar-navigation span");

// Array of month names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Function to generate the calendar
const manipulate = () => {
  // Get the first day of the month
  let dayone = new Date(year, month, 1).getDay();

  // Get the last date of the month
  let lastdate = new Date(year, month + 1, 0).getDate();

  // Get the day of the last date of the month
  let dayend = new Date(year, month, lastdate).getDay();

  // Get the last date of the previous month
  let monthlastdate = new Date(year, month, 0).getDate();

  // Variable to store the generated calendar HTML
  let lit = "";

  // Loop to add the last dates of the previous month
  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
  }

  // Loop to add the dates of the current month
  for (let i = 1; i <= lastdate; i++) {
    // Check if the current date is today
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "active"
        : "";
    lit += `<li class="${isToday}">${i}</li>`;
  }

  // Loop to add the first dates of the next month
  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive">${i - dayend + 1}</li>`;
  }

  // Update the text of the current date element
  // with the formatted current month and year
  currdate.innerText = `${months[month]} ${year}`;

  // update the HTML of the dates element
  // with the generated calendar
  day.innerHTML = lit;
};

manipulate();

// Attach a click event listener to each icon
prenexIcons.forEach((icon) => {
  // When an icon is clicked
  icon.addEventListener("click", () => {
    // Check if the icon is "calendar-prev"
    // or "calendar-next"
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    // Check if the month is out of range
    if (month < 0 || month > 11) {
      // Set the date to the first day of the
      // month with the new year
      date = new Date(year, month, new Date().getDate());

      // Set the year to the new year
      year = date.getFullYear();

      // Set the month to the new month
      month = date.getMonth();
    } else {
      // Set the date to the current date
      date = new Date();
    }

    // Call the manipulate function to
    // update the calendar display
    manipulate();
  });
});

//filter js
let crossfilter = document.querySelector(".crosslogo");
let MySchedulefillter = document.getElementById("fil");

document.querySelector(".filtersPopup").style.display = "none";
crossfilter.addEventListener("click", () => {
  document.querySelector(".filtersPopup").style.display = "none";
  element.style.filter = "blur(0px)";
  element.style.webkitFilter = "blur(0px)";
});

MySchedulefillter.addEventListener("click", () => {
  document.querySelector(".filtersPopup").style.display = "block";

  element.style.filter = "blur(5px)";
  element.style.webkitFilter = "blur(5px)";
});

let resetall = document.getElementById("resetallid");
resetall.addEventListener("click", () => {
  var ele = document.querySelectorAll("input[type=radio]");
  for (var i = 0; i < ele.length; i++) {
    ele[i].checked = false;
  }
});
let ele1 = document.querySelectorAll("input[type=radio]");
let zero = document.getElementById("zero");
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let four = document.getElementById("four");
let five = document.getElementById("five");
let six = document.getElementById("six");
let seven = document.getElementById("seven");

zero.addEventListener("click", () => {
  three.checked = true;
  five.checked = true;
});
one.addEventListener("click", () => {
  three.checked = true;
  five.checked = false;
  six.checked = false;
  seven.checked = false;
});
two.addEventListener("click", () => {
  three.checked = false;
  five.checked = true;
});
