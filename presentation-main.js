import ContentGenerator from './generator.js';
import AIAssistant from './assistant.js';
import { showLoading, hideLoading, showToast } from './utils.js';

class SmartPresentation {
    constructor() {
        this.generator = new ContentGenerator();
        this.assistant = new AIAssistant();
        this.slides = [];
        this.currentSlide = 1;
    }

    async generatePresentation(topic) {
        showLoading('Generating presentation...');
        
        try {
            this.slides = await this.generator.generateSlideContent(topic);
            this.currentSlide = 1;
            this.renderSlides();
            showToast('Presentation generated successfully!');
        } catch (error) {
            console.error('Error generating presentation:', error);
            showToast('Error generating presentation', 'error');
        }

        hideLoading();
    }

    async getSuggestions(topic) {
        showLoading('Getting suggestions...');
        
        try {
            const suggestions = await this.assistant.generateSuggestions(topic);
            this.renderSuggestions(suggestions);
        } catch (error) {
            console.error('Error getting suggestions:', error);
            showToast('Error getting suggestions', 'error');
        }

        hideLoading();
    }

    renderSuggestions(suggestions) {
        const suggestionPanel = document.getElementById('suggestionPanel');
        suggestionPanel.innerHTML = `
            <div class="suggestion-section">
                <h3>Related Topics</h3>
                <ul>
                    ${suggestions.relatedTopics.map(topic => `
                        <li onclick="presentation.generatePresentation('${topic}')">${topic}</li>
                    `).join('')}
                </ul>
            </div>
            <div class="suggestion-section">
                <h3>Structure Ideas</h3>
                <ul>
                    ${suggestions.structureIdeas.map(idea => `
                        <li onclick="presentation.applyStructure('${idea}')">${idea}</li>
                    `).join('')}
                </ul>
            </div>
            <div class="suggestion-section">
                <h3>Image Ideas</h3>
                <div class="image-suggestions">
                    ${suggestions.imageIdeas.map(img => `
                        <div class="image-suggestion" onclick="presentation.insertImage('${img.url}')">
                            <img src="${img.url}" alt="${img.title}">
                            <span>${img.title}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderSlides() {
        // Implementation for rendering slides
        // This would be added based on your slide rendering requirements
    }
}

export default SmartPresentation;
