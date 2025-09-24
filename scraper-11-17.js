const https = require('https');
const fs = require('fs');

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(data);
            });
        });
        request.on('error', (error) => {
            reject(error);
        });
    });
}

function extractJEPLinks(html) {
    // Regex to capture JEP links and titles from the specific HTML structure of the 11-17 page
    const jepRegex = /<td class="jep">(\d+):&#160;<\/td>[\s\S]*?<td><a href="([^"]*)"[^>]*>([^<]+)<\/a>&#160;<small class="release">\([^)]+\)<\/small><\/td>/gi;
    const jeps = [];
    let match;
    
    while ((match = jepRegex.exec(html)) !== null) {
        const number = match[1].trim();
        let url = match[2].trim();
        const title = match[3].trim().replace(/\s+/g, ' '); // Clean up whitespace
        
        // Fix URL domain if needed
        if (url.includes('openjdk.java.net')) {
            url = url.replace('openjdk.java.net', 'openjdk.org');
        }
        
        if (url && number && title) {
            jeps.push({
                number: `JEP ${number}`,
                title: title,
                url: url.startsWith('http') ? url : `https://openjdk.org${url}`
            });
        }
    }
    
    return jeps;
}

function extractJEPContent(html) {
    const content = {
        summary: '',
        goals: '',
        motivation: '',
        description: '',
        specification: ''
    };
    
    // Extract Summary
    const summaryMatch = html.match(/<h2[^>]*>Summary<\/h2>([\s\S]*?)(?=<h2|$)/i);
    if (summaryMatch) {
        content.summary = summaryMatch[1]
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    // Extract Goals
    const goalsMatch = html.match(/<h2[^>]*>Goals<\/h2>([\s\S]*?)(?=<h2|$)/i);
    if (goalsMatch) {
        content.goals = goalsMatch[1]
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    // Extract Motivation
    const motivationMatch = html.match(/<h2[^>]*>Motivation<\/h2>([\s\S]*?)(?=<h2|$)/i);
    if (motivationMatch) {
        content.motivation = motivationMatch[1]
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    // Extract Description
    const descriptionMatch = html.match(/<h2[^>]*>Description<\/h2>([\s\S]*?)(?=<h2|$)/i);
    if (descriptionMatch) {
        content.description = descriptionMatch[1]
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    // Extract Specification
    const specificationMatch = html.match(/<h2[^>]*>Specification<\/h2>([\s\S]*?)(?=<h2|$)/i);
    if (specificationMatch) {
        content.specification = specificationMatch[1]
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    return content;
}

async function scrapeJEPsSince11() {
    try {
        console.log('Fetching JEPs from Java 11 to Java 17...');
        const mainPageHtml = await makeRequest('https://openjdk.org/projects/jdk/17/jeps-since-jdk-11');
        
        console.log('Extracting JEP links...');
        const jeps = extractJEPLinks(mainPageHtml);
        console.log(`Found ${jeps.length} JEPs`);
        
        if (jeps.length === 0) {
            console.log('No JEPs found. HTML structure might have changed.');
            // Save the HTML for debugging
            fs.writeFileSync('debug-11-17.html', mainPageHtml);
            console.log('Saved HTML to debug-11-17.html for inspection');
            return;
        }
        
        const jepDocumentation = [];
        
        for (let i = 0; i < jeps.length; i++) {
            const jep = jeps[i];
            console.log(`Processing ${jep.number}: ${jep.title}...`);
            
            try {
                const jepHtml = await makeRequest(jep.url);
                const content = extractJEPContent(jepHtml);
                
                jepDocumentation.push({
                    number: jep.number,
                    title: jep.title,
                    url: jep.url,
                    ...content
                });
                
                // Small delay to be respectful to the server
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`Error processing ${jep.number}:`, error.message);
                jepDocumentation.push({
                    number: jep.number,
                    title: jep.title,
                    url: jep.url,
                    error: error.message
                });
            }
        }
        
        // Save the documentation
        fs.writeFileSync('jep-documentation-11-17.json', JSON.stringify(jepDocumentation, null, 2));
        console.log(`\nSaved documentation for ${jepDocumentation.length} JEPs to jep-documentation-11-17.json`);
        
        // Print summary
        console.log('\nJEPs processed:');
        jepDocumentation.forEach(jep => {
            console.log(`- ${jep.number}: ${jep.title}`);
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

scrapeJEPsSince11();