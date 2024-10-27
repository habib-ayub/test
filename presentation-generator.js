import ContentAPI from './api.js';

class ContentGenerator {
    constructor() {
        this.api = new ContentAPI();
    }

    async generateSlideContent(topic) {
        const wikiResults = await this.api.searchWikipedia(topic);
        const newsResults = await this.api.searchNews(topic);
        const imageResults = await this.api.searchImages(topic);

        let slides = [];

        // Title slide
        slides.push({
            id: 1,
            type: 'title',
            content: `# ${topic}\n\nAn AI-Generated Presentation`,
            theme: 'modern'
        });

        // Overview slide from Wikipedia
        if (wikiResults.length > 0) {
            const overview = await this.api.getWikipediaContent(wikiResults[0].pageid);
            slides.push({
                id: 2,
                type: 'content',
                content: `# Overview\n\n${this.summarizeText(overview, 200)}`,
                theme: 'modern'
            });
        }

        // Key Points slide
        if (wikiResults.length > 1) {
            const keyPoints = wikiResults.slice(1, 4).map(result => `- ${result.title}`).join('\n');
            slides.push({
                id: 3,
                type: 'bullets',
                content: `# Key Points\n\n${keyPoints}`,
                theme: 'modern'
            });
        }

        // Latest News slide
        if (newsResults.length > 0) {
            const newsPoints = newsResults.slice(0, 3)
                .map(article => `- ${article.title}`)
                .join('\n');
            slides.push({
                id: 4,
                type: 'news',
                content: `# Latest Developments\n\n${newsPoints}`,
                theme: 'modern'
            });
        }

        // Image Gallery slide
        if (imageResults.length > 0) {
            const imageUrls = imageResults.slice(0, 3)
                .map(img => `![${topic}](${img.previewURL})`)
                .join('\n');
            slides.push({
                id: 5,
                type: 'gallery',
                content: `# Visual Insights\n\n${imageUrls}`,
                theme: 'modern'
            });
        }

        return slides;
    }

    summarizeText(text, maxLength) {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        let summary = '';
        let length = 0;

        for (const sentence of sentences) {
            if (length + sentence.length <= maxLength) {
                summary += sentence;
                length += sentence.length;
            } else {
                break;
            }
        }

        return summary;
    }
}

export default ContentGenerator;
