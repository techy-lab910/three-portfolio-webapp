import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';
import path from 'path';

async function generateSitemap() {
    try {
        const smStream = new SitemapStream({
            hostname: 'https://aman-chauhan-portfolio910.vercel.app'
        });

        // Add routes
        const routes = [
            { url: '/', priority: 1.0, changefreq: 'daily' },
            { url: '/#about', priority: 0.6, changefreq: 'weekly' },
            { url: '/#work', priority: 0.7, changefreq: 'weekly' },
            { url: '/#projects', priority: 0.8, changefreq: 'weekly' },
            { url: '/#contact', priority: 0.5, changefreq: 'monthly' }
        ];

        // Write routes to sitemap
        routes.forEach(route => smStream.write(route));

        smStream.end();

        // Generate sitemap
        const sitemap = await streamToPromise(smStream);

        // Ensure public directory exists
        const publicDir = path.resolve('./public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        // Write sitemap to file
        const sitemapPath = path.resolve('./public/sitemap.xml');
        fs.writeFileSync(sitemapPath, sitemap.toString());

        console.log('Sitemap generated successfully at:', sitemapPath);
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
}

// Run the sitemap generation
generateSitemap();