document.addEventListener('DOMContentLoaded', function() {
    // Selecting links which have the data-section attribute
    var links = document.querySelectorAll('a[data-section]');

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(event) {
            // Extract the section ID from data-section attribute
            var sectionID = this.getAttribute('data-section');

            // If we are on the content page
            if (window.location.pathname === '/learn-more' && sectionID) {
                event.preventDefault(); // Prevent default behavior (navigating to the URL)

                var section = document.getElementById(sectionID);
                
                if (section) {
                    // Scroll smoothly to the section
                    section.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Remove the hash from the URL
                    window.history.replaceState(null, null, window.location.pathname);
                }
            }
            // If we are NOT on the content page
            else if (window.location.pathname !== '/learn-more' && sectionID) {
                event.preventDefault(); // Prevent default behavior first

                // Save target section into sessionStorage
                sessionStorage.setItem('targetSection', sectionID);

                window.location.href = "/learn-more"; // Navigate to the content page without the section hash
            }
        });
    }

    // Check sessionStorage on content page load
    if (window.location.pathname === '/learn-more' && sessionStorage.getItem('targetSection')) {
        var targetSectionID = sessionStorage.getItem('targetSection');
        var targetSection = document.getElementById(targetSectionID);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Clear the targetSection from sessionStorage
        sessionStorage.removeItem('targetSection');
    }
});