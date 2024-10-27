import SmartPresentation from './presentation.js';

// Initialize presentation
let presentation;

window.onload = function() {
    presentation = new SmartPresentation();
    
    // Add search functionality
    const searchInput = document.getElementById('topicSearch');
    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const topic = searchInput.value.trim();
            if (topic) {
                await presentation.generatePresentation(topic);
            }
        }
    });
};

// Make presentation available globally for event handlers
window.presentation = presentation;
