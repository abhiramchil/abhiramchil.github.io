;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});

	const roleElement = document.getElementById('role');
	const roles = ["Undergraduate Researcher", "Aspiring Software Engineer"];
	let index = 0;
	
	function typeRole() {
		let role = roles[index];
		let letters = role.split('');
		let i = 0;
		
		// Clear previous animation classes
		roleElement.textContent = '';
		roleElement.style.visibility = 'visible';
		roleElement.classList.remove('blink');
		
		// Type out the role
		let typingInterval = setInterval(function() {
			if (i < letters.length) {
				roleElement.textContent += letters[i++];
			} else {
				clearInterval(typingInterval);
				roleElement.classList.add('blink');
				setTimeout(switchRole, 2000); // Blink for 2 seconds
			}
		}, 75); // Typing speed
	}
	
	function switchRole() {
		roleElement.style.visibility = 'hidden';
		index = (index + 1) % roles.length;
		setTimeout(typeRole, 500); // Wait for half a second before typing next role
	}
	
	// Start the typing animation
	document.addEventListener('DOMContentLoaded', function() {
		typeRole();
	});
	
	
	var tablinks = document.querySelectorAll('.tab-links');
	var tabcontents = document.querySelectorAll('.tab-contents');
	
	document.addEventListener('DOMContentLoaded', function() {
		const skillBoxes = document.querySelectorAll('.skill-box');
		const categoryButtons = document.querySelectorAll('.category-button');
	
		categoryButtons.forEach(button => {
			button.addEventListener('click', function() {
				const category = button.dataset.category;
	
				// Show all skill boxes initially
				skillBoxes.forEach(box => {
					box.style.display = 'block';
				});
	
				// Filter and display only the selected category
				if (category !== 'all') {
					skillBoxes.forEach(box => {
						if (!box.classList.contains(category)) {
							box.style.display = 'none';
						}
					});
				}
			});
		});    
		
	});
	
	function filterSkills(category) {
		const buttons = document.querySelectorAll('.button');
		const skillBoxes = document.querySelectorAll('.skill-box');
	
		buttons.forEach(button => {
			if (button.dataset.category === category) {
				if (button.classList.contains('highlight')) {
					button.classList.remove('highlight');
					skillBoxes.forEach(box => box.classList.remove('filtered-out'));
				} else {
					buttons.forEach(btn => btn.classList.remove('highlight'));
					button.classList.add('highlight');
					skillBoxes.forEach(box => {
						if (!box.classList.contains(category)) {
							box.classList.add('filtered-out');
						} else {
							box.classList.remove('filtered-out');
						}
					});
				}
			} else {
				button.classList.remove('highlight');
			}
		});
	}
	
	document.addEventListener('DOMContentLoaded', function() {
		const skillBoxes = document.querySelectorAll('.skill-box');
	
		skillBoxes.forEach(box => {
			box.addEventListener('mousemove', handleMouseMove);
			box.addEventListener('mouseleave', handleMouseLeave);
		});
	
		function handleMouseMove(event) {
			const box = event.currentTarget;
			const rect = box.getBoundingClientRect();
			const x = event.clientX - rect.left; // x position within the box
			const y = event.clientY - rect.top;  // y position within the box
	
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
	
			const deltaX = x - centerX;
			const deltaY = y - centerY;
	
			const percentX = deltaX / centerX;
			const percentY = deltaY / centerY;
	
			const maxTilt = 30; // Maximum tilt angle in degrees
			const tiltX = maxTilt * percentY; // Invert tilt direction on X-axis
			const tiltY = -maxTilt * percentX;
	
			box.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
		}
	
		function handleMouseLeave(event) {
			const box = event.currentTarget;
			box.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
		}
	});
	
	function filterProjects(category) {
		const projects = document.querySelectorAll('.project-card');
		
		projects.forEach(project => {
			if (category === 'all' || project.classList.contains(category)) {
				project.style.display = 'block';
			} else {
				project.style.display = 'none';
			}
		});
	}
	
	// Open Modal Function:
	// Function to open the modal
	function openModal(title, description, tags, imageUrl, projectLink) {
		// Set modal title and description
		document.getElementById('modal-title').textContent = title;
		document.getElementById('modal-description').textContent = description;
		
		// Set modal image
		document.getElementById('modal-image').src = imageUrl;
		
		// Set modal project link
		const linkElement = document.getElementById('modal-link');
		linkElement.href = projectLink;
		linkElement.style.display = projectLink ? 'inline-block' : 'none'; // Hide the link if none provided
		
		// Set modal tags
		const tagContainer = document.getElementById('modal-tags');
		tagContainer.innerHTML = ''; // Clear previous tags
		tags.forEach(tag => {
			const tagElement = document.createElement('span');
			tagElement.classList.add('tag');
			tagElement.textContent = tag;
			tagContainer.appendChild(tagElement);
		});
	
		// Show the modal
		document.getElementById('projectModal').style.display = 'block';
	}
	
	// Function to close the modal
	function closeModal() {
		document.getElementById('projectModal').style.display = 'none';
	}
	
	// Optional: Close the modal when clicking outside the modal content
	window.onclick = function(event) {
		const modal = document.getElementById('projectModal');
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	};

    document.getElementById("btn-resume").addEventListener("click", function () {
        document.getElementById("timeline-resume").style.display = "block";
        document.getElementById("timeline-education").style.display = "none";
    });

    document.getElementById("btn-education").addEventListener("click", function () {
        document.getElementById("timeline-resume").style.display = "none";
        document.getElementById("timeline-education").style.display = "block";
    });
	// Smooth scrolling for footer navigation links
document.addEventListener('DOMContentLoaded', function () {
    const footerLinks = document.querySelectorAll('#fh5co-footer .nav a');

    footerLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.getElementById('frontend-btn').addEventListener('click', function() {
    toggleCategory('frontend');
});
document.getElementById('backend-btn').addEventListener('click', function() {
    toggleCategory('backend');
});
document.getElementById('tools-btn').addEventListener('click', function() {
    toggleCategory('tools');
});

function toggleCategory(category) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.skill-btn');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Add active class to the clicked button
    document.getElementById(category + '-btn').classList.add('active');
    
    // Hide all tool categories
    const categories = ['frontend', 'backend', 'tools'];
    categories.forEach(cat => {
        const elements = document.querySelectorAll('.' + cat + '-tool');
        elements.forEach(element => {
            element.classList.remove('active');
        });
    });

    // Show the relevant tools
    const activeElements = document.querySelectorAll('.' + category + '-tool');
    activeElements.forEach(element => {
        element.classList.add('active');
    });
}

document.getElementById('skills-header').addEventListener('click', function() {
    // Reset the header and all skills to default (you can reset skill styles here as well)
    var skills = document.querySelectorAll('.skill');
    skills.forEach(function(skill) {
        skill.style.backgroundColor = '';  // Reset background color
        skill.style.color = '';  // Reset text color
    });

    // Optionally reset the header color to the original state
    this.style.backgroundColor = '';  // Reset background color on click
    this.style.color = '';  // Reset text color on click
});


}());