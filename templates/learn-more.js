document.getElementById('showMoreSkills').addEventListener('click', function(event) {
    var hiddenSkills = document.querySelectorAll('.skillbar.hidden');
    
    let showMoreButtonContainer = document.querySelector('.show-more-container');
    showMoreButtonContainer.classList.add('btn-more-fade');  // Start the fade-out effect for "Show More" button

    setTimeout(function() {
        showMoreButtonContainer.classList.add('hidden');  // Hide the "Show More" button after it's faded out

        let showLessButtonContainer = document.querySelector('.show-less-container');
        showLessButtonContainer.classList.remove('hidden');  // Make "Show Less" button "potentially" visible but with opacity 0

        hiddenSkills.forEach(function(skill, index) {
            setTimeout(function() {
                skill.classList.remove('hidden', 'opaque');
                skill.classList.add('visible', 'toggled');  
            }, index * 100);  // 100ms stagger for each skill's fade-in
        });

        setTimeout(function() {
            showLessButtonContainer.classList.remove('btn-fade');  // Start the fade-in effect for "Show Less" button after all skills have faded in
        }, hiddenSkills.length * 100 + 500);  // Delay the fade-in for "Show Less" button until all skills have faded in plus an additional 0.5s delay

    }, 500);  // Assuming the fade-out duration for "Show More" button is 0.5s or 500ms
});

document.getElementById('showLessSkills').addEventListener('click', function(event) {
    var visibleSkills = Array.from(document.querySelectorAll('.skillbar.visible.toggled')).reverse();
    let showMoreButtonContainer = document.querySelector('.show-more-container');
    let showLessButtonContainer = document.querySelector('.show-less-container');

    // Fade out the "Show Less" button immediately
    showLessButtonContainer.classList.add('btn-fade');

    setTimeout(function() {
        // Fade out each skill after the "Show Less" button has faded out
        visibleSkills.forEach(function(skill, index) {
            setTimeout(function() {
                skill.classList.add('opaque');
            }, index * 100);  // 100ms stagger for each skill's fade-out
        });
    }, 500);  // Delay to allow the "Show Less" button to fade out first

    // After all skills have faded out, fade in the "Show More" button
    setTimeout(function() {
        visibleSkills.forEach(function(skill) {
            skill.classList.remove('visible', 'toggled');
            skill.classList.add('hidden');
        });
        showLessButtonContainer.classList.add('hidden');
        showMoreButtonContainer.classList.remove('hidden');
        setTimeout(function() {
            showMoreButtonContainer.classList.remove('btn-more-fade');  // Fade in the "Show More" button
        }, 100);  // Small delay to ensure the class is removed after the button is "unhidden"
    }, visibleSkills.length * 100 + 1000);  // Considering the stagger and longest fade-out duration
});
