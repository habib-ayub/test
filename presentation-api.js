class ContentAPI {
    // Wikipedia API
    async searchWikipedia(query) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=5&format=json&origin=*&srsearch=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.query.search;
        } catch (error) {
            console.error('Wikipedia API error:', error);
            return [];
        }
    }

    async getWikipediaContent(pageId) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&origin=*&pageids=${pageId}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.query.pages[pageId].extract;
        } catch (error) {
            console.error('Wikipedia content error:', error);
            return '';
        }
    }

    async searchNews(query) {
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=YOUR_GNEWS_API_KEY&max=5`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.articles;
        } catch (error) {
            console.error('News API error:', error);
            return [];
        }
    }

    async searchImages(query) {
        const url = `https://pixabay.com/api/?key=YOUR_PIXABAY_API_KEY&q=${encodeURIComponent(query)}&per_page=5`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.hits;
        } catch (error) {
            console.error('Image API error:', error);
            return [];
        }
    }
}

export default ContentAPI;
