
// SIDEBAR: SUBMENU
const allSidebarSubmenu = document.querySelectorAll('#sidebar .sidebar__submenu')

allSidebarSubmenu.forEach(item => {
    const a = item.previousElementSibling

    a.addEventListener('click', function(e) {
        e.preventDefault()

        if (this.classList.contains('clicked')) {
            this.classList.remove('clicked')
            item.classList.remove('active')
        } else {
            allSidebarSubmenu.forEach(i => {
                i.previousElementSibling.classList.remove('clicked')
                i.classList.remove('active')
            })

            this.classList.add('clicked')
            item.classList.add('active')
        }
    })
})







// SIDEBAR: DROPDOWN MENU
const allSidebarDropdownMenu = document.querySelectorAll('#sidebar .sidebar__dropdown-menu')

allSidebarDropdownMenu.forEach(item => {
    const a = item.previousElementSibling

    a.addEventListener('click', function(e) {
        e.preventDefault()

        if (item.classList.contains('active')) {
            item.classList.remove('active')
            this.classList.remove('active')
        } else {
            allSidebarDropdownMenu.forEach(i => {
                i.previousElementSibling.classList.remove('active')
                i.classList.remove('active')
            })

            item.classList.add('active')
            this.classList.add('active')
        }
    })
})







// SIDEBAR MOBILE: TOGGLE SIDEBAR
const toggleSidebar = document.querySelector('#sidebar-mobile .toggle-sidebar')
const sidebar = document.querySelector('#sidebar')

toggleSidebar.addEventListener('click', function() {
    sidebar.classList.add('active')
})







// MAIN: DROPDOWN
const allMainDropdown = document.querySelectorAll('#main .main__top .main__top__menu .main__dropdown')

allMainDropdown.forEach(item => {
    const a = item.previousElementSibling

    a.addEventListener('click', function(e) {
        e.preventDefault()

        if (item.classList.contains('active')) {
            item.classList.remove('active')
        } else {
            allMainDropdown.forEach(i => {
                i.classList.remove('active')
            })

            item.classList.add('active')
        }
    })
})







// MAIN: MAIN BODY MENU
const allMainBodyMenu = document.querySelectorAll('#main .main__body :is(.members__menu, .sales-summary__menu) .menu')

allMainBodyMenu.forEach(item=> {
    const icon = item.previousElementSibling

    icon.addEventListener('click', function () {
        if(item.classList.contains('active')) {
            item.classList.remove('active')
        } else {
            allMainBodyMenu.forEach(i=> {
                i.classList.remove('active')
            })

            item.classList.add('active')
        }
    })
})







// DOCUMENT EVENT
document.addEventListener('click', function(e) {
    if (!e.target.matches('#sidebar, #sidebar *')) {
        allSidebarSubmenu.forEach(item => {
            item.previousElementSibling.classList.remove('clicked')
            item.classList.remove('active')
        })
    }

    if (!e.target.matches('#sidebar, #sidebar *, #sidebar-mobile .toggle-sidebar')) {
        sidebar.classList.remove('active')
    }

    if (!e.target.matches('#main .main__top .main__top__menu, #main .main__top .main__top__menu *')) {
        allMainDropdown.forEach(item => {
            item.classList.remove('active')
        })
    }

    if (!e.target.matches('#main .main__body :is(.members__menu, .sales-summary__menu), #main .main__body :is(.members__menu, .sales-summary__menu) *')) {
        allMainBodyMenu.forEach(item => {
            item.classList.remove('active')
        })
    }
})



// Function to toggle lessons for a specific book and hide others



// Initial data
let totalBooks = 10; // Total number of books
let completedBooks = 0; // Number of completed books
let totalLessonsPerBook = 20; // Lessons per book
let completedLessons = 0; // Number of completed lessons
let currentBook = null; // Store the current active book

// Function to toggle lessons for a specific book and hide others
function toggleLessons(bookNumber) {
    const lessonContainer = document.getElementById('lessons' + bookNumber);

    // If the current book is clicked again, toggle the visibility
    if (currentBook === bookNumber) {
        lessonContainer.style.display = lessonContainer.style.display === 'none' ? 'flex' : 'none';
    } else {
        // Hide all other lesson containers
        const lessonContainers = document.querySelectorAll('.lesson-container');
        lessonContainers.forEach(container => {
            container.style.display = 'none';
        });

        // Show the clicked book's lessons
        lessonContainer.style.display = 'flex';
    }

    // Set the current active book
    currentBook = bookNumber;
}

// Function to update the completion status
function updateCompletionStatus() {
  const totalLessons = totalBooks * totalLessonsPerBook;

  // Update the doughnut chart data
  myDoughnutChart.data.datasets[0].data = [
      completedLessons, // Lessons Completed
      totalLessons - completedLessons, // Lessons Not Completed
      completedBooks, // Books Completed
      totalBooks - completedBooks // Books Not Completed
  ];

  // Adjust the order to match your original chart layout if necessary
  myDoughnutChart.data.datasets[0].data = [
      completedLessons,                   // Completed Lessons
      totalLessons - completedLessons,    // Remaining Lessons
      completedBooks * (totalLessons / totalBooks),  // Completed Books (scaled to lessons)
      (totalBooks - completedBooks) * (totalLessons / totalBooks) // Remaining Books (scaled to lessons)
  ];

  // Update the displayed counts
  document.querySelector('.main__body__box-info li:nth-child(1) h5').textContent = totalLessons; // Total Lessons
  document.querySelector('.main__body__box-info li:nth-child(2) h5').textContent = completedLessons; // Completed Lessons
  document.querySelector('.main__body__box-info li:nth-child(3) h5').textContent = totalLessons - completedLessons; // Remaining Lessons

  // Update the chart to reflect changes
  myDoughnutChart.update();
}


// Toggle completion for a book
// Toggle completion for a book
// Toggle completion for a book
function toggleBookCompletion(event, star) {
  event.stopPropagation(); // Prevent event bubbling
  star.classList.toggle('completed');

  const lessonContainer = document.getElementById('lessons' + star.closest('.book-wrapper').querySelector('.book-text span').textContent.split(' ')[1]); // Get the corresponding lesson container based on the book number

  const lessonStars = lessonContainer.querySelectorAll('.star'); // Select all lesson stars within that book

  if (star.classList.contains('completed')) {
      completedBooks++;
      completedLessons += totalLessonsPerBook; // Add all lessons when the book is completed

      // Change all lesson stars to completed
      lessonStars.forEach(lessonStar => {
          lessonStar.classList.add('completed'); // Mark each lesson as completed
      });
  } else {
      completedBooks--;
      completedLessons -= totalLessonsPerBook; // Subtract all lessons when the book is uncompleted

      // Change all lesson stars back to not completed
      lessonStars.forEach(lessonStar => {
          lessonStar.classList.remove('completed'); // Mark each lesson as not completed
      });
  }

  updateCompletionStatus();
}



// Toggle completion for a lesson
function toggleCompletion(event) {
    const star = event.target; // Get the star element that was clicked
    star.classList.toggle('completed');

    if (star.classList.contains('completed')) {
        completedLessons++;
    } else {
        completedLessons--;
    }

    updateCompletionStatus();
}


// Doughnut chart configuration
const config = {
    type: 'doughnut',
    data: {
        labels: [
            'Lessons Completed',
            'Lessons Not Completed',
            'Books Completed',
            'Books Not Completed'
        ],
        datasets: [{
            label: 'Completion Status',
            data: [0, 100, 0, 100], // Initialize with zero values
            backgroundColor: [
                'rgb(255, 205, 86)', // Books Completed
                'rgb(255, 99, 132)', // Books Not Completed
                'rgb(54, 162, 235)', // Lessons Completed
                'rgb(75, 192, 192)', // Lessons Not Completed
            ],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%'; // Show percentage in tooltip with two decimal points
                    }
                }
            }
        }
    }
};

// Create a canvas element with increased size
const canvas = document.createElement('canvas');
canvas.id = 'myDoughnutChart';
canvas.style.width = '800px';
canvas.style.height = '600px';
document.querySelector('#chart').appendChild(canvas);

// Render the doughnut chart
const myDoughnutChart = new Chart(canvas.getContext('2d'), config);

// Adding event listeners to stars on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to book stars
    document.querySelectorAll('.book .star').forEach(star => {
        star.addEventListener('click', function(event) {
            toggleBookCompletion(event, this);
        });
    });

    // Add event listeners to lesson stars
    document.querySelectorAll('.lesson .star').forEach(star => {
        star.addEventListener('click', function(event) {
            toggleCompletion(event);
        });
    });
});


// Example: Assuming you have lesson containers with IDs like 'lessons1', 'lessons2', etc.
// Ensure you have lesson star elements inside these containers with class 'lesson-star'





