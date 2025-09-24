const https = require('https');
const fs = require('fs').promises;

// Function to make HTTP requests
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };
        
        https.get(url, options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Function to extract JEP links from HTML
function extractJEPLinks(html) {
    // Updated regex to capture JEP links and their content
    const jepRegex = /<a[^>]+href="([^"]*\/jeps\/\d+)"[^>]*>([^<]+(?:\s*[^<]*)*?)<\/a>/gi;
    const links = [];
    let match;
    
    while ((match = jepRegex.exec(html)) !== null) {
        const url = match[1].startsWith('http') ? match[1] : `https://openjdk.org${match[1]}`;
        let title = match[2].trim();
        
        // Clean up title - remove line breaks and extra whitespace
        title = title.replace(/\s+/g, ' ').trim();
        
        // Extract JEP number from URL for better title formatting
        const jepNumberMatch = url.match(/\/jeps\/(\d+)$/);
        if (jepNumberMatch && title && !title.startsWith('JEP')) {
            const jepNumber = jepNumberMatch[1];
            title = `JEP ${jepNumber}: ${title}`;
        }
        
        if (title && title.length > 0) {
            links.push({
                url,
                title
            });
        }
    }
    
    // Remove duplicates
    const uniqueLinks = links.filter((link, index, self) => 
        index === self.findIndex(l => l.url === link.url)
    );
    
    return uniqueLinks;
}

// Function to extract content from JEP HTML
function extractJEPContent(html, title) {
    // Simple text extraction - remove HTML tags
    const textContent = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    
    // Extract sections by looking for common patterns
    const sections = {};
    
    // Look for common JEP sections
    const sectionPatterns = [
        'Summary',
        'Goals',
        'Non-Goals',
        'Motivation',
        'Description',
        'Alternatives',
        'Testing',
        'Risks and Assumptions',
        'Dependencies',
        'API Changes',
        'Specification'
    ];
    
    sectionPatterns.forEach(pattern => {
        const regex = new RegExp(`${pattern}\\s*([\\s\\S]*?)(?=(${sectionPatterns.join('|')})|$)`, 'i');
        const match = textContent.match(regex);
        if (match && match[1]) {
            sections[pattern] = match[1].trim().substring(0, 1000); // Limit section size
        }
    });
    
    return {
        title,
        summary: textContent.substring(0, 500),
        sections,
        fullText: textContent.substring(0, 3000) // Limit full text
    };
}

async function scrapeJEPDocumentation() {
    try {
        console.log('Fetching JEP list page...');
        
        // Try the main URL first
        let html;
        try {
            html = await makeRequest('https://openjdk.org/projects/jdk/25/jeps-since-jdk-21');
        } catch (error) {
            console.log('Primary URL failed, trying alternative...');
            html = await makeRequest('https://openjdk.java.net/projects/jdk/25/jeps-since-jdk-21');
        }
        
        console.log('Extracting JEP links...');
        const jepLinks = extractJEPLinks(html);
        
        console.log(`Found ${jepLinks.length} JEP links`);
        
        if (jepLinks.length === 0) {
            // Fallback: manually define known JEPs for JDK 25
            console.log('No links found, using known JDK 25 JEPs...');
            const knownJEPs = [
                { url: 'https://openjdk.org/jeps/455', title: 'JEP 455: Primitive Types in Patterns, instanceof, and switch (Preview)' },
                { url: 'https://openjdk.org/jeps/466', title: 'JEP 466: Class-File API (Second Preview)' },
                { url: 'https://openjdk.org/jeps/467', title: 'JEP 467: Markdown Documentation Comments' },
                { url: 'https://openjdk.org/jeps/468', title: 'JEP 468: Derived Record Creation (Preview)' },
                { url: 'https://openjdk.org/jeps/469', title: 'JEP 469: Vector API (Eighth Incubator)' },
                { url: 'https://openjdk.org/jeps/471', title: 'JEP 471: Deprecate the Memory-Access Methods in sun.misc.Unsafe for removal' },
                { url: 'https://openjdk.org/jeps/472', title: 'JEP 472: Prepare to Restrict the Use of JNI' },
                { url: 'https://openjdk.org/jeps/473', title: 'JEP 473: Stream Gatherers (Second Preview)' },
                { url: 'https://openjdk.org/jeps/474', title: 'JEP 474: ZGC Generational Mode by Default' },
                { url: 'https://openjdk.org/jeps/475', title: 'JEP 475: Late Barrier Expansion for G1' }
            ];
            jepLinks.push(...knownJEPs);
        }
        
        const jepDocumentation = [];
        
        // Visit each JEP page and extract documentation
        for (const jep of jepLinks) {
            console.log(`Scraping JEP: ${jep.title}`);
            
            try {
                const jepHtml = await makeRequest(jep.url);
                const content = extractJEPContent(jepHtml, jep.title);
                
                jepDocumentation.push({
                    ...jep,
                    content
                });
                
                // Add delay between requests
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (error) {
                console.error(`Error scraping ${jep.title}:`, error.message);
            }
        }
        
        // Save the scraped data
        await fs.writeFile('jep-documentation.json', JSON.stringify(jepDocumentation, null, 2));
        console.log(`Saved documentation for ${jepDocumentation.length} JEPs`);
        
        return jepDocumentation;
        
    } catch (error) {
        console.error('Error during scraping:', error);
        return [];
    }
}

// Run the scraper
scrapeJEPDocumentation().then(() => {
    console.log('Scraping completed');
}).catch(console.error);