export function showLoading(message) {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-message">${message}</div>
        </div>
    `;
    document.body.appendChild(loading);
}

export function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}

export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} slide-in`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Markdown processing utility
export function processMarkdown(content) {
    return marked.parse(content, {
        gfm: true,
        breaks: true,
        highlight: function(code, language) {
            if (language && hljs.getLanguage(language)) {
                return hljs.highlight(code, { language }).value;
            }
            return code;
        }
    });
}

// Slide transition utilities
export function animateSlideTransition(currentSlide, nextSlide, direction = 'next') {
    const slideOutClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    const slideInClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
    
    currentSlide.classList.add(slideOutClass);
    nextSlide.classList.add(slideInClass);
    
    setTimeout(() => {
        currentSlide.classList.remove(slideOutClass);
        nextSlide.classList.remove(slideInClass);
    }, 500);
}

// Image handling utilities
export function optimizeImage(imageUrl, maxWidth = 800) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth) {
                height = (maxWidth * height) / width;
                width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = imageUrl;
    });
}

// Error handling utilities
export function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    showToast(`An error occurred${context ? ` while ${context}` : ''}: ${error.message}`, 'error');
}

// Debounce utility for search input
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local storage utilities
export const storage = {
    save: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            handleError(error, 'saving to local storage');
        }
    },
    
    load: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            handleError(error, 'loading from local storage');
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            handleError(error, 'removing from local storage');
        }
    }
};

// DOM manipulation utilities
export const dom = {
    createElement: (tag, className = '', attributes = {}) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    },
    
    appendChildren: (parent, children) => {
        children.forEach(child => parent.appendChild(child));
        return parent;
    }
};
