const { chromium } = require('playwright');
const fs = require('fs').promises;

async function scrapeJEPDocumentation() {
    const browser = await chromium.launch({
        headless: true,
        args: ['--disable-http2']
    });
    const page = await browser.newPage();
    
    // Set user agent to avoid blocking
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    try {
        console.log('Navigating to JEP list page...');
        
        // Try multiple times with different strategies
        let success = false;
        const urls = [
            'https://openjdk.org/projects/jdk/25/jeps-since-jdk-21',
            'https://openjdk.java.net/projects/jdk/25/jeps-since-jdk-21'
        ];
        
        for (const url of urls) {
            try {
                await page.goto(url, { 
                    waitUntil: 'networkidle',
                    timeout: 30000 
                });
                success = true;
                console.log(`Successfully loaded: ${url}`);
                break;
            } catch (error) {
                console.log(`Failed to load ${url}: ${error.message}`);
            }
        }
        
        if (!success) {
            throw new Error('Could not load any of the JEP list URLs');
        }
        
        // Wait for the page to load
        await page.waitForTimeout(3000);
        
        // Extract JEP links from the page
        const jepLinks = await page.evaluate(() => {
            const links = [];
            const jepElements = document.querySelectorAll('a[href*="/jeps/"]');
            
            jepElements.forEach(link => {
                const href = link.href;
                const text = link.textContent.trim();
                if (text.match(/^\d+:/) || text.match(/^JEP \d+/)) {
                    links.push({
                        url: href,
                        title: text
                    });
                }
            });
            
            return links;
        });
        
        console.log(`Found ${jepLinks.length} JEP links`);
        
        const jepDocumentation = [];
        
        // Visit each JEP page and extract documentation
        for (const jep of jepLinks) {
            console.log(`Scraping JEP: ${jep.title}`);
            
            try {
                await page.goto(jep.url);
                await page.waitForTimeout(1000);
                
                // Extract JEP content
                const content = await page.evaluate(() => {
                    const title = document.querySelector('h1')?.textContent?.trim() || '';
                    const summary = document.querySelector('.summary')?.textContent?.trim() || '';
                    
                    // Get all main content
                    const contentDiv = document.querySelector('.content') || document.body;
                    const textContent = contentDiv.textContent || '';
                    
                    // Extract sections
                    const sections = {};
                    const headings = contentDiv.querySelectorAll('h2, h3, h4');
                    
                    headings.forEach(heading => {
                        const sectionName = heading.textContent.trim();
                        let nextElement = heading.nextElementSibling;
                        let sectionContent = '';
                        
                        while (nextElement && !['H1', 'H2', 'H3', 'H4'].includes(nextElement.tagName)) {
                            sectionContent += nextElement.textContent || '';
                            nextElement = nextElement.nextElementSibling;
                        }
                        
                        sections[sectionName] = sectionContent.trim();
                    });
                    
                    return {
                        title,
                        summary,
                        sections,
                        fullText: textContent
                    };
                });
                
                jepDocumentation.push({
                    ...jep,
                    content
                });
                
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
    } finally {
        await browser.close();
    }
}

// Run the scraper
scrapeJEPDocumentation().then(() => {
    console.log('Scraping completed');
}).catch(console.error);