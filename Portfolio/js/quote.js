document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('daily-quote');
    
    if (quoteElement) {
        loadQuoteOfTheDay();
    }
});

async function loadQuoteOfTheDay() {
    const quoteElement = document.getElementById('daily-quote');
    
    try {
        // First try the quotable.io API
        const response = await fetch('https://api.quotable.io/random', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Update the quote content
        quoteElement.innerHTML = `
            <p>"${data.content}"</p>
            <cite>- ${data.author}</cite>
        `;
        
        // Add a fade-in animation
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.style.transition = 'opacity 0.5s ease-in-out';
            quoteElement.style.opacity = '1';
        }, 100);
        
        console.log('Quote loaded successfully from API');
        
    } catch (error) {
        console.error('Error loading quote from API:', error);
        
        // Fallback to local quotes array if API fails
        loadFallbackQuote();
    }
}

// Fallback quotes when API is not available
function loadFallbackQuote() {
    const fallbackQuotes = [
        {
            content: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney"
        },
        {
            content: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs"
        },
        {
            content: "Your limitation—it's only your imagination.",
            author: "Unknown"
        },
        {
            content: "Push yourself, because no one else is going to do it for you.",
            author: "Unknown"
        },
        {
            content: "Great things never come from comfort zones.",
            author: "Unknown"
        },
        {
            content: "Dream it. Wish it. Do it.",
            author: "Unknown"
        },
        {
            content: "Success doesn't just find you. You have to go out and get it.",
            author: "Unknown"
        },
        {
            content: "The harder you work for something, the greater you'll feel when you achieve it.",
            author: "Unknown"
        },
        {
            content: "Dream bigger. Do bigger.",
            author: "Unknown"
        },
        {
            content: "Don't stop when you're tired. Stop when you're done.",
            author: "Unknown"
        }
    ];
    
    // Get today's date to ensure same quote for the day
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % fallbackQuotes.length;
    
    const selectedQuote = fallbackQuotes[quoteIndex];
    
    const quoteElement = document.getElementById('daily-quote');
    quoteElement.innerHTML = `
        <p>"${selectedQuote.content}"</p>
        <cite>- ${selectedQuote.author}</cite>
    `;
    
    // Add a fade-in animation
    quoteElement.style.opacity = '0';
    setTimeout(() => {
        quoteElement.style.transition = 'opacity 0.5s ease-in-out';
        quoteElement.style.opacity = '1';
    }, 100);
    
    console.log('Fallback quote loaded');
}

// Allow users to get a new random quote
function getNewQuote() {
    const quoteElement = document.getElementById('daily-quote');
    quoteElement.innerHTML = `
        <p>Loading new quote...</p>
        <cite>- Please wait</cite>
    `;
    
    // Try API first, then fallback
    loadQuoteOfTheDay();
}

// Add click event to quote for new quote (optional feature)
document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('daily-quote');
    if (quoteElement) {
        quoteElement.style.cursor = 'pointer';
        quoteElement.title = 'Click for a new quote';
        quoteElement.addEventListener('click', getNewQuote);
    }
});