import path from 'path';
import fs from 'fs';

const SITE_BASE_URL = 'https://p.andre.ski';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${SITE_BASE_URL}</loc>
     </url>
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${SITE_BASE_URL}/projects/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Fetch projects data from filesystem:
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data.projects);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;