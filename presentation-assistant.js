import ContentGenerator from './generator.js';

class AIAssistant {
    constructor() {
        this.generator = new ContentGenerator();
    }

    async generateSuggestions(topic) {
        const suggestions = {
            relatedTopics: [],
            imageIdeas: [],
            structureIdeas: []
        };

        // Get related topics from Wikipedia
        const wikiResults = await this.generator.api.searchWikipedia(topic);
        suggestions.relatedTopics = wikiResults.map(result => result.title);

        // Generate structure ideas based on content type
        suggestions.structureIdeas = [
            'Historical Timeline',
            'Problem-Solution Format',
            'Compare and Contrast',
            'Case Study Analysis',
            'Topic Deep Dive'
        ];

        // Image ideas from search results
        const imageResults = await this.generator.api.searchImages(topic);
        suggestions.imageIdeas = imageResults.map(img => ({
            title: img.tags,
            url: img.previewURL
        }));

        return suggestions;
    }
}

export default AIAssistant;
