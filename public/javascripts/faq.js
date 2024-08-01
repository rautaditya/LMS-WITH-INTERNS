const toggleButtons = document.querySelectorAll(".toggle-button");
        const courseDetails = document.querySelectorAll(".course-details");
        
        toggleButtons.forEach((button, index) => {
          button.addEventListener("click", () => {
            if (courseDetails[index].style.display === "none") {
              courseDetails[index].style.display = "block";
              button.textContent = "-";
            } else {
              courseDetails[index].style.display = "none";
              button.textContent = "+";
            }
          });
        });


        const tabItems = document.querySelectorAll(".firstnavitomfaq");

        // Get all tab content divs
        const tabContents = document.querySelectorAll(".opentabs");

        // Show the first tab content by default
        tabContents[0].style.display = "block";

        // Add click event listeners to the tab items
        tabItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                // Hide all tab content divs
                tabContents.forEach((content) => {
                    content.style.display = "none";
                });

                // Show the corresponding tab content
                tabContents[index].style.display = "block";

                // Add the "active" class to the clicked tab
                tabItems.forEach((item) => {
                    item.classList.remove("active");
                });
                item.classList.add("active");
            });
        });
       